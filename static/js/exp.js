// Parameters

var images = [];

// Put it all together
var experiment = [];
experiment.push(fullscreen);

// Prevent right click
document.addEventListener('contextmenu', event => event.preventDefault());

// Save trial plan
var trial_plan = trialPlan();

// Initiate experiment
jsPsych.init({
  timeline: experiment,
  preload_images: images
});
