// Parameters
var images = [];

// Put it all together
var experiment = [];
experiment = experiment.concat(wait_trial);

// Prevent right click
// document.addEventListener('contextmenu', event => event.preventDefault());

// Initiate experiment
jsPsych.init({
  timeline: experiment,
  // preload_images: images
});
