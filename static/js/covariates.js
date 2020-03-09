// Javascript functions and routines for waiting task for measuring
// reducibility and usefullness covariates
var covariate_probes = [{
    prompt: "...something that has an element of randomness",
    labels: ["1<br>Not at all", "2", "3", "4", "5", "6", "7<br>Very much"],
    required: true
  },
  {
    prompt: "...knowable in principle, given enough information",
    labels: ["1<br>Not at all", "2", "3", "4", "5", "6", "7<br>Very much"],
    required: true
  },
  {
    prompt: "...determined by chance factors",
    labels: ["1<br>Not at all", "2", "3", "4", "5", "6", "7<br>Very much"],
    required: true
  },
  {
    prompt: "…something that well-informed people would agree on",
    labels: ["1<br>Not at all", "2", "3", "4", "5", "6", "7<br>Very much"],
    required: true
  },
  {
    prompt: "...something that would be useful for me to know",
    labels: ["1<br>Not at all", "2", "3", "4", "5", "6", "7<br>Very much"],
    required: true
  },
  {
    prompt: "...something that would be useful for others to know",
    labels: ["1<br>Not at all", "2", "3", "4", "5", "6", "7<br>Very much"],
    required: true
  }
]

var covariate_trial = [fullscreen_prompt,
  // Introduce questions
  {
    type: "html-button-response",
    stimulus: function() {
      return "<div id='instruct'><p>We are interested in your judgment about this question:</p>\
      <p><i>" + jsPsych.timelineVariable('question', true) + "</i></p></div>"
    },
    choices: ["Continue"]
  },
  // First page of probes
  {
    type: "survey-likert",
    preamble: function() {
      return "<p><i>" + jsPsych.timelineVariable('question', true) + "</i></p>\
      <p>The information in the question above is…</p>"
    },
    questions: function() {
      return jsPsych.timelineVariable('probes', true).slice(0, 3)
    },
    scale_width: 400,
    post_trial_gap: 100
  },
  // Second page of probes
  {
    type: "survey-likert",
    preamble: function() {
      return "<p><i>" + jsPsych.timelineVariable('question', true) + "</i></p>\
      <p>The information in the question above is…</p>"
    },
    questions: function() {
      return jsPsych.timelineVariable('probes', true).slice(3, 6)
    },
    scale_width: 400,
    post_trial_gap: 300
  }
]
