// Javascript functions and routines for waiting task

// Parameters
var maxStimDuration = 10000,
  tooSlowTime = 1000,
  postTooSlowTime = 800,
  fixationTime = 500,
  maxTaskTime = 10 * 60 * 1000;

// Code
var too_slow = [kick_out, {
  type: 'html-keyboard-response',
  stimulus: '<div style="font-size: 150%">Please choose more quickly</div>',
  choices: jsPsych.NO_KEYS,
  trial_duration: tooSlowTime,
  on_finish: function() {
    var up_to_now = parseInt(jsPsych.data.get().last(1).select('n_warnings').values);
    jsPsych.data.addProperties({
      n_warnings: up_to_now + 1
    });
  },
  data: {
    category: 'too-slow'
  },
  post_trial_gap: postTooSlowTime
}];

var wait_trial_answer = [{
    // Wait time
    type: 'html-keyboard-response',
    stimulus: '<div id="fixation">...</div>',
    choices: jsPsych.NO_KEYS,
    trial_duration: jsPsych.timelineVariable('wait_time'),
    data: {
      category: 'wait_wait'
    }
  },
  {
    // Answer
    type: 'html-keyboard-response',
    stimulus: jsPsych.timelineVariable('answer'),
    choices: jsPsych.NO_KEYS,
    trial_duration: 2000,
    data: {
      category: 'wait_answer'
    },
    post_trial_gap: 200
  },
  {
    // Satisfaction rating
    type: "survey-likert",
    preamble: "Was the answer worth the wait?",
    scale_width: 400,
    questions: [{
      prompt: "",
      labels: ["1<br>Not at all", "2", "3", "4", "5<br>Extremely worth it"],
      required: true,
      name: "satisfaction"
    }],
    post_trial_gap: jsPsych.timelineVariable('ITI_next'),
    data: {
      category: "wait_satisfaction",
      ITI_next: jsPsych.timelineVariable('ITI_next')
    },
    on_finish: function() {
      if (Date.now() > data.wait_start_time + maxTaskTime) {
        jsPsych.endCurrentTimeline();
      }
    }
  }
];

var wait_trial = [{
    // Fixation
    type: 'html-keyboard-response',
    stimulus: '<div id="fixation">+</div>',
    choices: jsPsych.NO_KEYS,
    trial_duration: fixationTime,
    data: {
      category: 'wait_fixation'
    },
    on_start: function() {
      var start = jsPsych.data.get().last(1).select("wait_start_time").values[0]
      if (!(start > 0)) {
        jsPsych.data.addProperties({
          wait_start_time: Date.now()
        });
      }
    }
  }, {
    // Question
    type: 'html-button-response',
    stimulus: jsPsych.timelineVariable('question'),
    choices: ['SKIP', "WAIT 4", "KNOW"],
    margin_horizontal: "40px",
    margin_vertical: "80px",
    trial_duration: maxStimDuration,
    data: {
      category: 'wait_question'
    }
  },
  {
    timeline: too_slow,
    conditional_function: function() {
      // Got to answer only if wait selected
      var resp = jsPsych.data.get().filter({
        category: "wait_question"
      }).last(1).select("button_pressed").values[0]

      return resp == null ? true : false
    }
  },
  {
    timeline: wait_trial_answer,
    conditional_function: function() {
      // Got to answer only if wait selected
      var resp = jsPsych.data.get().filter({
        category: "wait_question"
      }).last(1).select("button_pressed").values[0]

      return resp == "1" ? true : false
    }
  }
];

// Instructions
var wait_instructions1 = {
  timeline: [{
      type: 'instructions',
      pages: ['<div id="instruct"><p>You will now do a computer task about curiosity. Press the <i>Next</i> button to read the instructions for this task.</p></div>',
        '<div id="instruct"><p>In this task, you will be shown a series of trivia questions. For each question, you must decide if you want to know the answer to the question.<br></p><p>If you want to find out the answer, you will have to wait a certain amount of time.</p><p>If you do not want to wait to see the answer, you can choose to skip the question.</p><p>If you are 100% certain that you already know the answer to the question, you may indicate that you already know it.</p><p>If you choose to skip or indicate that you know the answer, you will NOT see the answer to the question.</p></div>',
        '<div id="instruct"><p>When you are first shown the trivia question, the screen will look like this:<p>\
  <center><img width="50%" src="../static/images/wait_instructions.jpg"></center>\
  <p>You will use the mouse to indicate that you would like to wait for the answer, skip the question, or that you know its answer.</p></div>',
        '<div id="instruct"><p>If you choose to wait for a question, you will be asked to rate if the answer was worth waiting for on a scale of 1 = not worth it up to 5 = extremely worth it.</p></div>',
        '<div id="instruct"><p>The task will continue for 10 minutes. The task takes the same amount of time regardless of how many questions you choose to skip or wait for, so please base your decisions on how interested you are in learning the answers.</p></div>',
        '<div id="instruct"><p>You will soon do a short practice version to get comfortable with the task. Please use this time to get used to pressing the different buttons and to the amount of time you have to respond to the different prompts.<p></div>',
        '<div id="instruct"><p>You will first be asked to answer some questions to ensure that you understood the instructions.</p>\
  <p>Please answer to the best of your ability.</p>\
  <p>If you miss a question, you will be sent back to review the instructions and re-take the test. You must get all questions correct before you can move on to the practice round of the task.</p></div>'
      ],
      show_clickable_nav: true,
      allow_keys: false,
      data: {
        category: "wait_instructions1"
      }
    },
    {
      type: 'survey-multi-choice',
      questions: [{
          prompt: 'If I choose "SKIP" or "KNOW," I will not see the answer to the trivia question.',
          options: ['True', 'False'],
          required: true,
          horizontal: true
        },
        {
          prompt: 'The trivia task will take 10 minutes, regardless of whether I press SKIP, KNOW, or WAIT.',
          options: ['True', 'False'],
          required: true,
          horizontal: true
        },
        {
          prompt: 'I should press KNOW only if I\'m 100% sure I know the answer to the question.',
          options: ['True', 'False'],
          required: true,
          horizontal: true
        }
      ],
      randomize_question_order: true,
      preamble: 'Please answer these questions:'
    }
  ],
  loop_function: function() {
    var resps = JSON.parse(jsPsych.data.get().last(1).select("responses").values[0]);
    for (i=0; i<3; i++){
      if (resps["Q" + i] == "False"){
        return true
      }
    }
    return false
  }
};

var wait_instructions2 = {
  type: 'instructions',
  pages: ['<div id="instruct"><p>You will now continue to another round of the same task with different questions.</p></div>',
    '<div id="instruct"><p>This block is also 10 minuets long, regardless of how many questions you choose to skip or wait for, so please base your decisions on how interested you are in learning the answers.</p></div>',
    '<div id="instruct"><p>Press the <i>Next</i> button to begin the second round of the task.</p></div>'
  ],
  show_clickable_nav: true,
  allow_keys: false,
  data: {
    category: "wait_instructions1"
  }
};

// Load items from local csv file
var corona_items;
var general_items;
Papa.parse("../static/corona_questions.csv", {
  download: true,
  header: true,
  dynamicTyping: true,
  complete: function(results) {
    corona_items = results.data;
    Papa.parse("../static/general_questions.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: function(results) {
        general_items = results.data;
        postLoad();
      }
    });
  }
});
