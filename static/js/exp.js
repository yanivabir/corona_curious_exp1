// Parameters
var images = [];

// ------- Determine subject level variables ----- //
var PID = jsPsych.data.getURLVariable('workerId'),
  firstBlock = Math.random() > 0.5 ? "corona" : "general";

// Execute all of this experiment prep and run after we load items from local
// csv file
function postLoad() {

  // Fullscreen experiment, save PID, counterbalancing
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
        PID: PID,
        firstBlock: firstBlock
      });
    }
  }

  // Build waiting task blocks
  wait_block1 = {
    timeline: wait_trial,
    timeline_variables: firstBlock == "corona" ? corona_items : general_items
  }

  wait_block2 = {
    timeline: wait_trial,
    timeline_variables: firstBlock == "corona" ? general_items : corona_items
  }


  // Put it all together
  var experiment = [];
  experiment.push(fullscreen);
  // experiment.push(wait_instructions1);
  experiment.push(wait_block1);
  experiment.push(wait_instructions2);
  experiment.push(wait_block2);

  // Prevent right click
  // document.addEventListener('contextmenu', event => event.preventDefault());

  // Initiate experiment
  jsPsych.init({
    timeline: experiment,
    // preload_images: images
  });

}
