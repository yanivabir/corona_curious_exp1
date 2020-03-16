# Corona Curious
Online waiting task and other ratings for Cornoa and non Corona related items.

Implemented using the [jsPsych package](jspsych.org).

# Version 1.0
First five subjects ran on this version on 03/11/2020

## Bugs
1. Wait duration not recorded
2. questionId recorded only for question display in waiting task (nuiance)
3. category:corona_upst_fmly typo corona_upst,fmly (corrupts downsream csv)
4. category for winning forecast should be politics_win, not politics
5. No please respond to answer prompt (waiting task).
6. Question type and block not saved in separate variable.



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
6. Initial data processing script
7. ran additions
8. UK version
9. Order 5d

11. Consider waiting time distribution
13. Second session.
14. prevent retakes
