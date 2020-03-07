// Parameters
var images = [];

// ------- Get subject id ----- //
PID = jsPsych.data.getURLVariable('workerId');

// Execute all of this experiment prep and run after we load items from local
// csv file
function postLoad() {

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
  experiment.push(wait_instructions1);
  experiment.push({
    timeline: wait_trial,
    timeline_variables: [
      {
        question: "abc",
        answer: "bcd",
        wait_time: 1000,
        ITI_next: 1000
      },
      {
        question: "def",
        answer: "gef",
        wait_time: 3000,
        ITI_next: 1000
      }
    ]
  });

  // Prevent right click
  // document.addEventListener('contextmenu', event => event.preventDefault());

  // Initiate experiment
  jsPsych.init({
    timeline: experiment,
    // preload_images: images
  });

}
