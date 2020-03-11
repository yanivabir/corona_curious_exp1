# Corona Curious Version 1.0
Online waiting task and other ratings for Cornoa and non Corona related items.

Implemented using the [jsPsych package](jspsych.org).

##Noteworthy files:
```
.
|---_templates
|   |--- index.html: landing page w/ general info. Leads to consent.html.
|   |--- consent.html: informed consent. Leads to exp.html.
|   |--- exp.html: this is where the task runs.
|
|---_static
|   |---_js
|   |   |---exp.js: main javascript fle for task.
|   |   |--- waiting_task.js: functions and variables for waiting task.
|   |   |--- covariates.js: functions and variables for covariate ratings.
|   |   |--- utils.js: functions common to all stages of task.
|   |   |---_jspsych: jsPsych scripts
|   |
|   |---_images: All images needed in the experiment
|   |---_css
|   |   |---jspscyh.css: all css rules for experiment, from jsPsych and otherwise.
```

## To Do
1. link to cdc faq at the end

5. Consider using database for data rather than saving locally on server with csv
6. Initial data processing script
11. Consider waiting time distribution
13. Second session.
14. prevent retakes
