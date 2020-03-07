// Javascript functions and routines for waiting task

// Parameters
var maxStimDuration = 10000,
  tooSlowTime = 1000,
  postTooSlowTime = 800,
  fixationTime = 500;

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

var wait_trial_answer = [
  {
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
  }
},{
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
  conditional_function: function(){
    // Got to answer only if wait selected
    var resp = jsPsych.data.get().filter({
      category: "wait_question"
    }).last(1).select("button_pressed").values[0]

    return resp==null ? true : false
  }
},
{
  timeline: wait_trial_answer,
  conditional_function: function(){
    // Got to answer only if wait selected
    var resp = jsPsych.data.get().filter({
      category: "wait_question"
    }).last(1).select("button_pressed").values[0]

    return resp=="1" ? true : false
  }
}
]
