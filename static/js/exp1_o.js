// Parameters
var sess = 1,
  version = 1.011,
  n_for_covariates = 5, // How many items to save for covariate measurement
  n_for_practice; // How many itmes in practice block
var images = ["../static/images/wait_instructions.jpg"];

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
        Papa.parse("../static/third_block.csv", {
          download: true,
          header: true,
          dynamicTyping: true,
          complete: function(results) {
            third_block_items = results.data;
            postLoad();
          }
        });
      }
    });
  }
});

var experiment = [];


// Execute all of this experiment prep and run after we load items from local
// csv file
function postLoad() {

  // Separate 2 items for practice block - one from each type
  if (firstBlock == "corona") {
    // Pick 1 from each type at random
    practice_items = jsPsych.randomization.shuffle(
      corona_items).filter(x => x['type'] == "Useful").splice(0,1).concat(
        jsPsych.randomization.shuffle(corona_items).filter(x =>
        x['type'] == "Not useful").splice(0,1));
    // Remove them from corona list
    corona_items = corona_items.filter(x => !practice_items.includes(x));
  } else {
    // Pick 1 from each type at random
    practice_items = jsPsych.randomization.shuffle(
      general_items).filter(x => x['type'] ==
      "Useful").splice(0,1).concat(jsPsych.randomization.shuffle(general_items).filter(x =>
        x['type'] == "Not useful").splice(0,1));
    // Remove them from general list
    general_items = general_items.filter(x => !practice_items.includes(x));
  }

  // Split items to curiosity and covariate ratings sets
  corona_items = pseudoShuffle(corona_items, ["Useful", "Not useful"], 6);
  general_items = pseudoShuffle(general_items, ["Useful", "Not useful"], 6);
  third_block_items = pseudoShuffle(third_block_items, ["Trivia", "MTurk"], 6);

  corona_items_curiosity = corona_items.slice(0,
    corona_items.length - n_for_covariates);
  corona_items_covariate = corona_items.slice(
    corona_items.length - n_for_covariates, corona_items.length);

  general_items_curiosity = general_items.slice(0,
    general_items.length - n_for_covariates);
  general_items_covariate = general_items.slice(
    general_items.length - n_for_covariates, general_items.length);

  third_block_items_curiosity = third_block_items.slice(0,
    third_block_items.length - n_for_covariates);
  third_block_items_covariate = third_block_items.slice(
    third_block_items.length - n_for_covariates, third_block_items.length);

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
  third_block_items_curiosity = drawTimes(third_block_items_curiosity);

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

  var welcome = {
    type: "html-button-response",
    stimulus: "<div id='instruct'><p>In this study, you will be asked to complete \
      several tasks and answer multiple questions. Throughout the study, we are \
      interested in your own personal judgments, views and knowledge.</p>\
      <p>It is important that you stay engaged throughout this study. We will\
      monitor the data for use of other apps or lack of attention, and give \
      an extra $2 bonus for full engagement with the task.</p><p>Thank you for\
      participating!</p></div>",
      choices: ["Continue"],
      margin_vertical: "80px",
      data: {
        category: 'welcome'
      },
      post_trial_gap: 200
  }

  // Build waiting task blocks
  wait_practice_block = {
    timeline: wait_timeline,
    timeline_variables: practice_items
  }

  wait_block1 = {
    timeline: wait_timeline,
    timeline_variables: firstBlock == "corona" ? corona_items_curiosity : general_items_curiosity
  }

  wait_block2 = {
    timeline: wait_timeline,
    timeline_variables: firstBlock == "corona" ? general_items_curiosity : corona_items_curiosity
  }

  wait_block3 = {
    timeline: wait_timeline,
    timeline_variables: third_block_items_curiosity
  }

  // Building covariate rating block
  var items_covariate = corona_items_covariate.concat(general_items_covariate).concat(third_block_items_covariate);

  for (i = 0; i < items_covariate.length; i++) {
    items_covariate[i]["probes"] =
      jsPsych.randomization.shuffle(covariate_probes);
  }

  var covariate_block = {
    timeline: covariate_trial,
    timeline_variables: items_covariate,
    randomize_order: true
  }

  var pre_questionnaires_message = {
    type: "html-button-response",
    stimulus: '<div id="instruct"><p>For the last part of the experiment, we ask \
      you to answer a few questions about your opinions and beliefs, and about \
      yourself.</p><p>Please answer these questions as truthfully and accurately \
      as possible</p></div>',
      choices: ["Continue"],
      margin_vertical: "80px",
      data: {
        category: 'pre_questionnaires_message'
      },
      post_trial_gap: 200
  }

  // Debriefing and data upload
  var debrief = [{
      type: "instructions",
      pages: ['<div id="instruct">Thank you for participating in this experiment!<p>\
      In this study we were interested in people\'s curiosity about different \
      types of questions.</p>\
      <p>Any health information presented in this experiment was based on the \
      researchers’ reading of current publicly available information from the \
      Center for Disease Control and other reputable health and news media \
      websites but should not be taken as medical advice. If you have any \
      questions about your health, you should seek the judgment of a medical \
      professional.</p>\
      <p>We will process your data within 48h and grant you an extra $2 to any \
      participant that stayed engaged throughout the task.</p>\
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
      pages: ["<div id ='instruct'><p>Once you press the <i>Next</i> \
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
      data: {
        category: "save_data"
      },
      stimulus: "<div id='instruct'><p>Data uploading. To ensure proper completion \
      of the experiment, please don't refresh, \
      close your browser or open another tab.\
      </p></div>",
      choices: jsPsych.NO_KEYS,
      on_load: function() {
        var d = new Date;
        saveData(PID, sess, '', jsPsych.data.get().csv(),
          function() {
            saveData(PID, sess, '_int', jsPsych.data.getInteractionData().csv(),
          jsPsych.finishTrial);
          });
      }
    },
    {
      type: "html-keyboard-response",
      data: {
        category: "data_saved"
      },
      stimulus: "<div class='instructions'><p>Your results have successfully uploaded.</p>\
    <p>Your completion code for this study is: <br> <b>EK64HN7</b></p>\
    <p>Use it to submit this HIT on MTurk.</p>\
    <p>You may now close this window.</p></div>",
      choices: jsPsych.NO_KEYS
    }
  ];


  // Put it all together
  experiment.push(fullscreen);
  experiment.push(welcome);
  experiment = experiment.concat(wait_instructions1);
  experiment.push(wait_practice_block);
  experiment.push(wait_instructions_post_practice);
  experiment.push(wait_block1);
  experiment.push(wait_instructions2);
  experiment.push(wait_block2);
  experiment.push(wait_instructions2);
  experiment.push(wait_block3);
  experiment.push(covariate_instructions);
  experiment.push(covariate_block);
  experiment.push(forced_choice_instructions1);
  experiment = experiment.concat(forced_choice_trial);
  experiment.push(forced_choice_instructions2);
  experiment.push(read_fact_block);
  experiment.push(pre_questionnaires_message);
  experiment = experiment.concat(five_d);
  experiment = experiment.concat(gallup_block);
  experiment = experiment.concat(resilience_quest);
  experiment = experiment.concat(anxiety);
  experiment = experiment.concat(corona_perception_block);
  experiment = experiment.concat(demographic_block);
  experiment = experiment.concat(debrief);

  // Prevent right click, refresh
  if (!debug) {
    // Prevent right-click
    document.addEventListener('contextmenu', event => event.preventDefault());

    // Prompt before refresh
    window.addEventListener('beforeunload', function(e) {
      // Cancel the event
      e.preventDefault();
      e.returnValue = '';
    });

  }

  // Initiate experiment
  jsPsych.init({
    timeline: experiment,
    preload_images: images
  });

}
