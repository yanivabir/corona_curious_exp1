// Javascript functions and routines for waiting task

// Parameters
var maxStimDuration = 10000,
  minResponseTime = 1500,
  tooSlowTime = 1000,
  postTooSlowTime = 800,
  fixationTime = 500,
  maxTaskTime = 2.5,
  waits = [4, 8, 12, 16],
  ITI_range = [500, 1200];

// Trial strucutre
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
    trial_duration: function(){
      return jsPsych.timelineVariable('wait_time', true) * 1000
    },
    data: {
      category: 'wait_wait'
    }
  },
  {
    // Answer
    type: 'html-button-response',
    stimulus: jsPsych.timelineVariable('answer'),
    choices: ["Continue"],
    margin_vertical: "80px",
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
    on_finish: function(data) {
      if (Date.now() > data.wait_start_time + maxTaskTime * 60 * 1000) {
        jsPsych.endCurrentTimeline();
      }
    }
  }
];

var wait_trial = [fullscreen_prompt, {
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
    type: 'html-button-response-min-time',
    stimulus: jsPsych.timelineVariable('question'),
    choices: function() {
      return [
        'SKIP',
        "WAIT " + jsPsych.timelineVariable('wait_time', true),
        "KNOW"
      ]
    },
    margin_horizontal: "40px",
    margin_vertical: "80px",
    trial_duration: maxStimDuration,
    min_response_time: minResponseTime,
    data: {
      category: 'wait_question',
      questionId: jsPsych.timelineVariable('questionId')
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
  },
  {
    timeline: [
      {
        type: "html-keyboard-response",
        stimulus: "",
        choices: jsPsych.NO_KEYS,
        trial_duration: jsPsych.timelineVariable('ITI_next'),
        data: {
          category: "wait_skip_ITI",
          ITI_next: jsPsych.timelineVariable('ITI_next')
        }
      }
    ],
    conditional_function: function() {
      // If skipped or know - add ITI here
      var resp = jsPsych.data.get().filter({
        category: "wait_question"
      }).last(1).select("button_pressed").values[0]

      return resp == "1" ? false : true
    }
  }
];

// Instructions
var wait_instructions1 = [{
  timeline: [{
      type: 'instructions',
      pages: ['<div id="instruct"><p>You will now do a computer task about curiosity. Press the <i>Next</i> button to read the instructions for this task.</p></div>',
        '<div id="instruct"><p>In this task, you will be shown a series of trivia questions. For each question, you must decide if you want to know the answer to the question.<br></p><p>If you want to find out the answer, you will have to wait a certain amount of time.</p><p>If you do not want to wait to see the answer, you can choose to skip the question.</p><p>If you are 100% certain that you already know the answer to the question, you may indicate that you already know it.</p><p>If you choose to skip or indicate that you know the answer, you will NOT see the answer to the question.</p></div>',
        '<div id="instruct"><p>When you are first shown the trivia question, the screen will look like this:<p>\
  <center><img width="50%" src="../static/images/wait_instructions.jpg" border="1"></center>\
  <p>You will use the mouse to indicate that you would like to wait for the answer, skip the question, or that you know its answer.</p></div>',
        '<div id="instruct"><p>If you choose to wait for a question, you will be asked to rate if the answer was worth waiting for on a scale of 1 = not worth it up to 5 = extremely worth it.</p></div>',
        '<div id="instruct"><p>The task will continue for ' + maxTaskTime + ' minutes. The task takes the same amount of time regardless of how many questions you choose to skip or wait for, so please base your decisions on how interested you are in learning the answers.</p></div>',
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
          prompt: 'The trivia task will take ' + maxTaskTime +
          ' minutes, regardless of whether I press SKIP, KNOW, or WAIT.',
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
    for (i = 0; i < 3; i++) {
      if (resps["Q" + i] == "False") {
        return true
      }
    }
    return false
  }
},
{
  type: "html-button-response",
  stimulus: "<div id='instruct'>Press <i>Continue</i> to start the short training block.</div>",
  choices: ["Continue"],
  margin_vertical: "80px",
  data: {
    category: 'wait_answer'
  },
  post_trial_gap: 200
}];

var wait_instructions_post_practice = {
  type: "instructions",
  pages: ['<div id="instruct"><p>You will now begin the full version of the \
  task. The task will continue for ' + maxTaskTime + ' minutes.</p>\
  <p><b>Please remain focused on this task for the next ' + maxTaskTime +
  ' minutes. We are able to note when participants click away from the task \
  and we will review all data before approving the HIT.</b></p></div>'],
  show_clickable_nav: true,
  allow_keys: false,
  data: {
    category: "wait_instructions_post_practice"
  }
}

var wait_instructions2 = {
  type: 'instructions',
  pages: ['<div id="instruct"><p>You will now continue to another round of the same task with different questions.</p></div>',
    '<div id="instruct"><p>This block is also ' + maxTaskTime +
    ' minuets long, regardless of how many questions you choose to skip or wait \
    for, so please base your decisions on how interested you are in learning \
    the answers.</p></div>',
    '<div id="instruct"><p>Press the <i>Next</i> button to begin the second round of the task.</p></div>'
  ],
  show_clickable_nav: true,
  allow_keys: false,
  data: {
    category: "wait_instructions1"
  }
};

// Trial plans - add timing variables to tables loaded from csv
function drawTimes(items) {
  var wait_times = jsPsych.randomization.repeat(waits,
    Math.ceil(items.length / waits.length), false);

  for (i = 0; i < items.length; i++) {
    items[i]["wait_time"] = wait_times[i];
    items[i]["ITI_next"] = Math.random() * (ITI_range[1] - ITI_range[0]) +
      ITI_range[0]
  }
  return items
}

// Trial plan - shuffle keeping types even throughout
function pseudoShuffle(items, types, bin_size = 6){

  // Separate by type of question
  var cond0 = items.filter(item => item["type"] == types[0]),
    cond1 = items.filter(item => item["type"] == types[1]);

  // Random order each type
  cond0 = jsPsych.randomization.shuffle(cond0);
  cond1 = jsPsych.randomization.shuffle(cond1);

  var shuf_items = [];

  for (i=0; i < Math.ceil(cond0.length / (bin_size / 2)); i++){
    var this_add = cond0.slice(i * (bin_size / 2), i * (bin_size / 2) + (bin_size / 2)).concat(
      cond1.slice(i * (bin_size / 2), i  * (bin_size / 2) + (bin_size / 2))
    );
    this_add = jsPsych.randomization.shuffle(this_add);

    shuf_items = shuf_items.concat(this_add);
  }
  return shuf_items
}
