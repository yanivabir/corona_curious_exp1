// Corona perception questions
recall_corona_block = [
  {
    type: "survey-multi-choice",
    preamble: "<div id = 'instruct', class = 'recall'>What was your answer to these questions <font color='tomato'>one week ago</font>?</div>'",
    data: {
      category: "recall_corona_percept"
    },
    questions: [{
        prompt: "Do you personally know anyone infected with the new coronavirus?",
        options: ["Yes", "No"],
        required: true,
        name: "recall_corona_prsn_know",
        horizontal: true
      },
      {
        prompt: "Do you know of anyone in your town or community who is infected with the new coronavirus?",
        options: ["Yes", "No"],
        required: true,
        name: "recall_corona_cmmnty_know",
        horizontal: true
      },
      {
        prompt: "How long do you think the coronvirus outbreak is likely to impact life in your community?",
        options: ["1-2 weeks", "1-2 months", "3-4 months", "more than 6 months"],
        required: true,
        name: "recall_corona_duration",
        horizontal: true
      }
    ]
  },
  {
    type: "survey-likert",
    preamble: "<div id = 'instruct', class = 'recall'>What was your answer to these questions <font color='tomato'>one week ago</font>?</div>'",
    data: {
      category: "recall_corona_percept"
    },
    questions: [{
        prompt: "<div id='instruct'>How upset would you be if you find out that a close family member is infected with the new coronavirus?</div>",
        labels: ["1<br>Not at all", "2", "3", "4", "5<br>Extremely upset"],
        required: true,
        name: "recall_corona_upst_fmly"
      },
      {
        prompt: "<div id='instruct'>How upset would you be if you find out that you are infected with the new coronavirus?</div>",
        labels: ["1<br>Not at all", "2", "3", "4", "5<br>Extremely upset"],
        required: true,
        name: "recall_corona_upst_me"
      },
      {
        prompt: "<div id='instruct'>How much has your personal life changed relative to a month ago as a result of the new coronavirus epidemic?</div>",
        labels: ["1<br>No change", "2", "3", "4", "5<br>Extreme change"],
        required: true,
        name: "recall_corona_already_changed"
      }
    ],
    scale_width: 400
  },
  {
    type: "survey-likert",
    preamble: "<div id = 'instruct', class = 'recall'>What was your answer to these questions <font color='tomato'>one week ago</font>?</div>'",
    data: {
      category: "recall_corona_percept"
    },
    questions: [{
        prompt: "<div id='instruct'>In the next few weeks, how much will your personal life change as a result of the new coronavirus epidemic?</div>",
        labels: ["1<br>No change", "2", "3", "4", "5<br>Extreme change"],
        required: true,
        name: "recall_corona_prsnl_change"
      },
      {
        prompt: "<div id='instruct'>In the next few weeks, how much will the lives of people around you will change as a result of the new coronavirus epidemic?</div>",
        labels: ["1<br>No change", "2", "3", "4", "5<br>Extreme change"],
        required: true,
        name: "recall_corona_close_change"
      },
      {
        prompt: "<div id='instruct'>In the next few weeks, how much will society change as a result of the new coronavirus epidemic?</div>",
        labels: ["1<br>No change", "2", "3", "4", "5<br>Extreme change"],
        required: true,
        name: "recall_corona_scty_change"
      }
    ],
    scale_width: 400,
  },
  {
    type: "survey-likert",
    preamble: "<div id = 'instruct', class = 'recall'>What was your answer to these questions <font color='tomato'>one week ago</font>?</div>'",
    data: {
      category: "recall_corona_percept"
    },
    questions: [{
        prompt: "<div id='instruct'>How worried are you about being infected with the coronavirus?</div>",
        labels: ["1<br>Not at all", "2", "3", "4", "5<br>Very worried"],
        required: true,
        name: "recall_corona_worried"
      },
      {
        prompt: "<div id='instruct'>How anxious do you feel about the possibility of losing your \
        life to the new coronavirus?</div>",
        labels: ["1<br>Not at all", "2", "3", "4", "5<br>Very anxious"],
        required: true,
        name: "recall_corona_death"
      },
      {
        prompt: "<div id='instruct'>To what extent do you agree with the following: \"If I wash my \
        hands and am careful about my exposure, I will avoid being infected with the coronavirus.\"</div>",
        labels: ["1<br>Not at all", "2", "3", "4", "5<br>Completely agree"],
        required: true,
        name: "recall_corona_wash"
      }
    ],
    scale_width: 400
  },
  {
    type: "survey-likert",
    preamble: "<div id = 'instruct', class = 'recall'>What was your answer to these questions <font color='tomato'>one week ago</font>?</div>'",
    data: {
      category: "recall_corona_percept"
    },
    questions: [
      {
        prompt: "<div id='instruct'>Relative to one month ago, before the new coronavirus epidemic, how much time do you spend reading and watching the news?</div>",
        labels: ["1<br>Much less", "2", "3<br>Same as before", "4", "5<br>Much more"],
        required: true,
        name: "recall_corona_rel_media"
      },
      {
      prompt: "<div id='instruct'>What is your reaction to the volume of information about the new coronavirus?</div>",
      labels: ["1<br>I cant stand<br>it anymore", "2", "3<br>Neutral", "4", "5<br>I want more<br>information"],
      required: true,
      name: "recall_corona_info_seek"
    }],
    scale_width: 400
  },
  {
    type: "html-slider-response",
    stimulus: "<div id = 'instruct', class = 'recall'>What was your answer to these questions <font color='tomato'>one week ago</font>?</div>\
    <div id='instruct'><p>What do you think the chances are that you will personally be infected with the new coronavirus?</p></div>",
    slider_width: 400,
    labels: ["0%", "50%", "100%"],
    require_movement: true,
    data: {
      category: "recall_corona_chances_infct"
    }
  },
  {
    type: "html-slider-response",
    stimulus: "<div id = 'instruct', class = 'recall'>What was your answer to these questions <font color='tomato'>one week ago</font>?</div>\
    <div id='instruct'><p>What do you think the chances are that you will lose a loved one to the new coronavirus?</p></div>",
    slider_width: 400,
    labels: ["0%", "50%", "100%"],
    require_movement: true,
    data: {
      category: "recall_corona_chances_loved"
    }
  }
];
