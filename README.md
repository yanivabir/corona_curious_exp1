# COVID-19 information-seeking
Online waiting task and other ratings for COVID-related and general questions.
This code was used to run the experiment reported in the main text of Abir, Y. Marvin, C. B. van Geen, C. Leshkowitz, M. Hassin, R. R. & Shohamy, D. (Under review). _Behavior During the COVID-19 Pandemic Reveals a Directing and an Energizing Role for Motivation in Information-Seeking_.

Implemented using the [jsPsych package](jspsych.org).

## Noteworthy files:
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
