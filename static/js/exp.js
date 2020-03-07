// Parameters
var images = [];

// ------- Get subject id ----- //
PID = jsPsych.data.getURLVariable('workerId');

// Fullscreen experiment, save P ID
var fullscreen = {
  type: 'fullscreen',
  fullscreen_mode: true,
  message: '<p>This study runs in fullscreen. To switch to full screen mode \
    and start the experiment, press the button below.</p>',
  on_finish: function() {
    // Hide mouse
    var stylesheet = document.styleSheets[0];
    // stylesheet.insertRule("* {cursor: none;}", stylesheet.cssRules.length);
    jsPsych.data.addProperties({
      n_warnings: 0,
      PID: PID
    });
  }
}


// Put it all together
var experiment = [];
experiment.push(fullscreen);
experiment = experiment.concat(wait_trial);

// Prevent right click
// document.addEventListener('contextmenu', event => event.preventDefault());

// Initiate experiment
jsPsych.init({
  timeline: experiment,
  // preload_images: images
});
