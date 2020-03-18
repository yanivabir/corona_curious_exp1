// Javascript functions and routines for waiting task

// Parameters

// Trial strucutre
var recall_trial = {
  type: "survey-text",
  preamble: "<div id'instruct'>What answer did you read last week for the question:</div>",
  questions: [{
    prompt: jsPsych.timelineVariable('question'),
    required: true,
    rows: 3,
    columns: 60,
    name: "recall"
  }],
  post_trial_gap: 200,
  data: {
    category: "answer_recall",
    question: jsPsych.timelineVariable('question'),
    answer: jsPsych.timelineVariable('answer'),
    questionId: jsPsych.timelineVariable('questionId'),
    block: jsPsych.timelineVariable('block'),
    type: jsPsych.timelineVariable('type')
  }
}


// Instructions
var recall_instructions1 = {
  type: 'instructions',
  pages: function() {
    return [
      '<div id="instruct"><p>You will now start with recalling the answers to the questions you viewed last week.</p>\
        <p>Last week you were presented with a question and had to decided whether you were interested in waiting to view its answer.</p>\
        <p>You will now be presented with the questions you chose to wait for, one question at a time.</p>\
        <p>For each question, we ask you to write down your best recollection of the answer that was displayed last week.</p></div>',
      '<div id="instruct"><p>Please note: It is important that you try to recall the answer <b>as it was displayed to you last week</b>.</div>',
      '<div id="instruct"><p>You will be presented with ' + viewed_answers.length + ' questions.</p><p>Press the <i>Next</i> button to start recalling the answers.</p></div>'
    ]
  },
  show_clickable_nav: true,
  allow_keys: false,
  data: {
    category: "recall_instructions1"
  }
};

function shuffle_viewed_answers(questions) {
  corona_qs = jsPsych.randomization.shuffle(questions.filter(x => x["block"] == "corona"))
  general_qs = jsPsych.randomization.shuffle(questions.filter(x => x["block"] == "general"))
  third_qs = jsPsych.randomization.shuffle(questions.filter(x => x["block"] == "third"))

  var shuf_questions = [];

  if (firstBlock == "corona") {
    shuf_questions = shuf_questions.concat(corona_qs);
    shuf_questions = shuf_questions.concat(general_qs);
  } else {
    shuf_questions = shuf_questions.concat(general_qs);
    shuf_questions = shuf_questions.concat(corona_qs);
  }

  shuf_questions = shuf_questions.concat(third_qs);

  return shuf_questions
}
