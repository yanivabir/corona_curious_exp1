// Functions and routines needed throughout the experiment
// Parameters
var maxWarining = 10;

// Code
var kick_out = {
  type: 'html-keyboard-response',
  conditional_function: function() {
    if (jsPsych.data.get().last(1).select('n_warnings').values[0] > maxWarining) {
      return true;
    } else {
      return false;
    }
  },
  timeline: [{
    stimulus: "<div class = 'instructions'>\
    <p>It seems that you are not performing the task as instructed.</p>\
    <p>Please return this HIT.</p>\
    <p>If you feel that this is a mistake, please email \
    ya2402+mturk@columbia.edu</p>\
    <p>Press the space bar to continue.</p></div>"
  }],
  choices: [32],
  on_finish: function() {
    var subject = jsPsych.data.get().last(1).select('PID').values[0];
    var sess = jsPsych.data.get().last(1).select('sess').values[0];
    var d = new Date;
    saveData('S' + PID + '_sess' + sess + '_' + d.toISOString().slice(0,10),
    jsPsych.data.get().ignore('stimulus').csv(),
    function() {
      saveData(timeStamp() + '_S' + subject + '_sess' + sess+ '_plan', trialPlan(),
      function() {
        saveData(timeStamp() + '_S' + subject + '_sess' + sess + '_int',
        jsPsych.data.getInteractionData().csv(),
        function() {
          self.close();
        })
      });
    });
  },
  data: {
    category: 'kick-out'
  }
}
