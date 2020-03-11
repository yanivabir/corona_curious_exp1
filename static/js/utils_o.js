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
    saveData(PID, sess, '', jsPsych.data.get().csv(),
      function() {
        saveData(PID, sess, '_int', jsPsych.data.getInteractionData().csv(),
          function() {
            self.close();
          })
      });
  },
  data: {
    category: 'kick-out'
  }
}

// Police full screen
var fullscreen_prompt = {
  type: 'fullscreen',
  fullscreen_mode: true,
  timeline: [
    {
      message: '<div class="instructions"><p>This study has to run in fullscreen mode.</p><p>To switch to full screen mode \
        and restart the experiment, press the button below.</p></div>'
    }
  ],
  conditional_function: check_fullscreen,
  on_finish: function() {
    // Update warning count
    var up_to_now = parseInt(jsPsych.data.get().last(1).select('n_warnings').values);
    jsPsych.data.addProperties({
      n_warnings: up_to_now + 1
    });
  },
  data: {
    category: 'fullscreen-prompt'
  }
}

function check_fullscreen(){
  if (PID.includes("debug")){
    return false
  }

  var int = jsPsych.data.getInteractionData(),
  exit = int.values().filter(function(e){
    return e.event == "fullscreenexit"
  }),
  enter = int.values().filter(function(e){
    return e.event == "fullscreenenter"
  });

  if (exit.length > 0){
    return exit[exit.length - 1].time > enter[enter.length - 1].time
  }else{
    return false
  }
}

// Save data to file functions
function saveData(PID, sess, part, data, onComplete = function() {}, type = 'csv') {
  console.log(onComplete)
  var d = new Date;
  name = 'S' + PID + '_sess' + sess + '_' + d.toISOString().slice(0, 10) +
    part + '.' + type;
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", onComplete);
  xhr.open('POST', 'write_data.php');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    filename: name,
    filedata: data
  }));
}


// Focus policing
// var focusblur = [kick_out,
//   {
//     type: 'html-keyboard-response',
//     stimulus: "<div class='instructions'><p>Please focus on the task and don't\
//     use other windows.\
//     </p><p>Press the space bar to continue.</div>",
//     choices: [32],
//     on_finish: function() {
//       var up_to_now = parseInt(jsPsych.data.get().last(1).select('n_warnings').values);
//       jsPsych.data.addProperties({
//         n_warnings: up_to_now + 1
//       });
//     },
//     data: {
//       category: 'focus-blur'
//     },
//     post_trial_gap: 800
//   }
// ];
//
// function check_focusblur(n){
//   // n is number of trial back to check for focus loss
//   if (PID.includes("debug")){
//     return false
//   }
//
//   var last_trial = jsPsych.data.get().last(1).select('category').values;
//   if (last_trial == 'too-slow' | last_trial == 'focus-blur') {
//     return false
//   }
//
//   var blurs = jsPsych.data.getInteractionData().filter({
//     event: "blur"
//   }).select('trial').values, // Find blur events
//   // Get trial indx for trials of interest
//   inx = jsPsych.data.get().last(n).select('trial_index').values,
//   intersect = blurs.filter(value => inx.includes(value)); // Find intersection of trials
//   if (intersect.length > 0){
//     return true
//   }
//   return false
// }
