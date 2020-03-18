// Javascript functions and routines for waiting task

// Parameters

// Trial strucutre
var recall_trial = {
  type: "survey-test",
  preamble: "<div id'instruct'>What answer did you read for the question:</div>",
  questions: [
    {
      prompt: jsPsych.timelineVariable('question'),
      required: true,
      rows: 2,
      columns: 60,
      name: "recall"
    }
  ],
  data: {
    category: "answer_recall",
    question: jsPsych.timelineVariable('question'),
    answer: jsPsych.timelineVariable('answer'),
    questionId: jsPsych.timelineVariable('questionId')
  }
}


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
        data: {
          category: "wait_instructions_quiz"
        },
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
      category: 'wait_instructions1'
    },
    post_trial_gap: 200,
    on_finish: function() {
      jsPsych.data.addProperties({
        wait_start_time: Date.now()
      });
    }
  },
];

var wait_instructions_post_practice = {
  type: "instructions",
  pages: ['<div id="instruct"><p>You will now begin the full version of the \
  task. The task will continue for ' + maxTaskTime + ' minutes.</p>\
  <p><b>Please remain focused on this task for the next ' + maxTaskTime +
    ' minutes. We are able to note when participants click away from the task \
  and we will review all data before approving the HIT.</b></p></div>'
  ],
  show_clickable_nav: true,
  allow_keys: false,
  data: {
    category: "wait_instructions_post_practice"
  },
  on_finish: function() {
    jsPsych.data.addProperties({
      wait_start_time: Date.now()
    });
  }
}

var wait_instructions2 = {
  type: 'instructions',
  pages: ['<div id="instruct"><p>You will now continue to another round of the same task with different questions.</p></div>',
    '<div id="instruct"><p>This block is also ' + maxTaskTime +
    ' minutes long, regardless of how many questions you choose to skip or wait \
    for, so please base your decisions on how interested you are in learning \
    the answers.</p></div>',
    '<div id="instruct"><p>Press the <i>Next</i> button to begin the next round of the task.</p></div>'
  ],
  show_clickable_nav: true,
  allow_keys: false,
  data: {
    category: "wait_instructions1"
  },
  on_finish: function() {
    jsPsych.data.addProperties({
      wait_start_time: Date.now()
    });
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
function pseudoShuffle(items, types, bin_size = 6) {

  // Separate by type of question
  var cond0 = items.filter(item => item["type"] == types[0]),
    cond1 = items.filter(item => item["type"] == types[1]);

  // Random order each type
  cond0 = jsPsych.randomization.shuffle(cond0);
  cond1 = jsPsych.randomization.shuffle(cond1);

  var shuf_items = [];

  for (i = 0; i < Math.ceil(cond0.length / (bin_size / 2)); i++) {
    var this_add = cond0.slice(i * (bin_size / 2), i * (bin_size / 2) + (bin_size / 2)).concat(
      cond1.slice(i * (bin_size / 2), i * (bin_size / 2) + (bin_size / 2))
    );
    this_add = jsPsych.randomization.shuffle(this_add);

    shuf_items = shuf_items.concat(this_add);
  }
  return shuf_items
}
