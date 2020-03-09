// Parameters
var sess = 1,
  version = 1.0,
  n_for_covariates = 5, // How many items to save for covariate measurement
  n_for_practice; // How many itmes in practice block
var images = [];

// ------- Determine subject level variables ----- //
var PID = jsPsych.data.getURLVariable('workerId'),
  firstBlock = Math.random() > 0.5 ? "corona" : "general";

// Is this a debug run?
var debug = PID.includes("debug");

// Keep important variables in global scope for convenience
var corona_items,
  general_items,
  corona_items_curiosity,
  corona_items_covariate,
  general_items_curiosity,
  general_items_covariate;

// Load items from local csv file
Papa.parse("../static/corona_questions.csv", {
  download: true,
  header: true,
  dynamicTyping: true,
  complete: function(results) {
    corona_items = results.data;
    Papa.parse("../static/general_questions.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: function(results) {
        general_items = results.data;
        postLoad();
      }
    });
  }
});

// Execute all of this experiment prep and run after we load items from local
// csv file
function postLoad() {

  // Split items to curiosity and covariate ratings sets
  corona_items = jsPsych.randomization.shuffle(corona_items);
  general_items = jsPsych.randomization.shuffle(general_items);

  corona_items_curiosity = corona_items.slice(0,
    corona_items.length - n_for_covariates);
  corona_items_covariate = corona_items.slice(
    corona_items.length - n_for_covariates, corona_items.length);

  general_items_curiosity = general_items.slice(0,
    general_items.length - n_for_covariates);
  general_items_covariate = general_items.slice(
    general_items.length - n_for_covariates, general_items.length);

  // Separate for practice block
  if (firstBlock == "corona") {
    practice_items = corona_items_curiosity.splice(0, 2);
  } else {
    practice_items = general_items_curiosity.splice(0, 2);
  }

  // Set timing parameters for waiting task practice block
  practice_items[0]["wait_time"] = waits[1];
  practice_items[1]["wait_time"] = waits[0];
  practice_items[0]["ITI_next"] = Math.random() * (ITI_range[1] - ITI_range[0]) +
    ITI_range[0];
  practice_items[1]["ITI_next"] = Math.random() * (ITI_range[1] - ITI_range[0]) +
    ITI_range[0];

  // Draw timing parameters for waiting task
  corona_items_curiosity = drawTimes(corona_items_curiosity);
  general_items_curiosity = drawTimes(general_items_curiosity);

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
        firstBlock: firstBlock,
        sess: sess,
        version: version
      });
    }
  }

  // Build waiting task blocks
  wait_practice_block = {
    timeline: wait_trial,
    timeline_variables: practice_items
  }

  wait_block1 = {
    timeline: wait_trial,
    timeline_variables: firstBlock == "corona" ? corona_items_curiosity : general_items_curiosity
  }

  wait_block2 = {
    timeline: wait_trial,
    timeline_variables: firstBlock == "corona" ? general_items_curiosity : corona_items_curiosity
  }

  // Building covariate rating block
  var items_covariate = corona_items_covariate.concat(general_items_covariate);

  for (i = 0; i < items_covariate.length; i++) {
    items_covariate[i]["probes"] =
      jsPsych.randomization.shuffle(covariate_probes);
  }

  var covariate_block = {
    timeline: covariate_trial,
    timeline_variables: items_covariate,
    randomize_order: true
  }

  // Debriefing and data upload
  var debrief = [{
      type: "instructions",
      pages: ['<div id="instruct">Thank you for participating in this experiment!<p>\
      In this study we were interested in people\'s curiosity about different \
      types of questions.</p>\
      <p>All the coronavirus related information you viewed in the course of \
      this study were based on the current state of scientific knowledge, and \
      on recommendations made by the Center for Disease Control and Prevention \
      (CDC).</p>\
      <p>You will recieve an email invitiation for the next session early next week.</p>\
      <p>You\'ll  recieve $2 special bonus for participating in another session.</p></div>'],
      show_clickable_nav: true,
      allow_keys: false,
      data: {
        category: "debrief"
      }
    },
    {
      type: 'fullscreen',
      fullscreen_mode: false
    },
    {
      type: "instructions",
      pages: ["<div class ='instructions'><p>Once you press the <i>Next</i> \
    button, your results will be uploaded to the server, and the experiment will\
    complete. <b>This may take several minutes - do not \
    refresh or close your browser during this time.</b></p>\
    <p>After your results are uploaded to the server, you will be presented \
    with the completion code for MTurk.\
    <p>Press the <i>Next</i> button to upload your results.</p></div>"],
      show_clickable_nav: true,
      allow_keys: false,
      data: {
        category: "debrief"
      }
    },
    {
      type: "html-keyboard-response",
      stimulus: "<div class='instructions'><p>Data uploading. To ensure proper completion \
      of the experiment, please don't refresh, \
      close your browser or open another tab.\
      </p></div>",
      choices: jsPsych.NO_KEYS,
      on_load: function() {
        var d = new Date;
        saveData(PID, sess, '', jsPsych.data.get().csv(),
          function() {
            saveData(PID, sess, 'int', jsPsych.data.getInteractionData().csv(),
              function() {
                self.close();
              })
          });
      }
    },
    {
      type: "html-keyboard-response",
      stimulus: "<div class='instructions'><p>Your results have successfully uploaded.</p>\
    <p>Your completion code for this study is: <br> <b>EK64HN7</b></p>\
    <p>Use it to submit this HIT on MTurk.</p>\
    <p>You may now close this window.</p></div>",
      choices: jsPsych.NO_KEYS
    }
  ];


  // Put it all together
  var experiment = [];
  experiment.push(fullscreen);
  // experiment.push(wait_instructions1);
  // experiment.push(wait_practice_block);
  // experiment.push(wait_instructions_post_practice);
  // experiment.push(wait_block1);
  // experiment.push(wait_instructions2);
  // experiment.push(wait_block2);
  // experiment.push(covariate_instructions);
  // experiment.push(covariate_block);
  experiment = experiment.concat(debrief);

  // Prevent right click, refresh
  if (!debug) {
    document.addEventListener('contextmenu', event => event.preventDefault());

    window.addEventListener('beforeunload', function(e) {
      // Cancel the event
      e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
      // Chrome requires returnValue to be set
      e.returnValue = '';
    });

  }

  // Initiate experiment
  jsPsych.init({
    timeline: experiment,
    // preload_images: images
  });

}
