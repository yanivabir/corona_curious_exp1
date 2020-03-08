// Functions and routines needed throughout the experiment
// Parameters
var maxWarining = 10;

// Code

// Kick out trial
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
    var d = new Date;
    saveData('S' + PID + '_' + d.toISOString().slice(0, 10),
      jsPsych.data.get().csv(),
      function() {
        saveData('S' + PID + '_' + d.toISOString().slice(0, 10) + '_int',
          jsPsych.data.getInteractionData().csv(),
          function() {
            self.close();
          })
      });
  },
  data: {
    category: 'kick-out'
  }
}

// Save data to file functions
function saveData(name, data, onComplete = function() {}, type = 'csv') {
  name = name + '.' + type;
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", onComplete);
  xhr.open('POST', 'write_data.php'); 
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    filename: name,
    filedata: data
  }));
}
