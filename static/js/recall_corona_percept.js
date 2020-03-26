// Corona perception questions
recall_corona_block = [fullscreen_prompt,
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
  fullscreen_prompt,
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
  fullscreen_prompt,
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
  fullscreen_prompt,
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
  fullscreen_prompt,
  {
    type: "survey-likert",
    preamble: "<div id = 'instruct', class = 'recall'>What was your answer to these questions <font color='tomato'>one week ago</font>?</div>",
    data: {
      category: "recall_corona_percept"
    },
    questions: [{
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
      }
    ],
    scale_width: 400
  },
  {
    type: "html-slider-response",
    stimulus: "<div id = 'instruct', class = 'recall'>What was your answer to this question <font color='tomato'>one week ago</font>?</div>\
    <div id='instruct'><p>What do you think the chances are that you will personally be infected with the new coronavirus?</p></div>",
    slider_width: 400,
    labels: ["0%", "50%", "100%"],
    require_movement: true,
    data: {
      category: "recall_corona_chances_infct"
    }
  },
  fullscreen_prompt,
  {
    type: "html-slider-response",
    stimulus: "<div id = 'instruct', class = 'recall'>What was your answer to this question <font color='tomato'>one week ago</font>?</div>\
    <div id='instruct'><p>What do you think the chances are that you will lose a loved one to the new coronavirus?</p></div>",
    slider_width: 400,
    labels: ["0%", "50%", "100%"],
    require_movement: true,
    data: {
      category: "recall_corona_chances_loved"
    }
  },
  fullscreen_prompt,
  {
    type: "survey-multi-choice",
    preamble: "<div id = 'instruct', class = 'recall'>What was your answer to this question <font color='tomato'>one week ago</font>?</div>",
    questions: [{
      prompt: "<div id='instruct'>Who will you vote for in the upcoming presidential elections?</div>",
      options: ["President Trump", "The Democratic candidate", "Don't know",
        "I won't vote"
      ],
      horizontal: true,
      name: "recall_vote_for"
    }],
    data: {
      category: 'recall_politics'
    }
  },
  fullscreen_prompt,
  {
    type: "html-slider-response",
    stimulus: "<div id = 'instruct', class = 'recall'>What was your answer to this question <font color='tomato'>one week ago</font>?</div>\
    <div id='instruct'>Who do you think is likely to win the next \
      presidential elections?</div>",
    labels: ["100% certain Trump", "Coin toss", "100% certain Democrat"],
    require_movement: true,
    data: {
      category: 'recall_politics_win'
    }
  },
  fullscreen_prompt,
  {
    type: 'survey-text',
    questions: [{
      prompt: "<div id = 'instruct', class = 'recall'>What was your answer to this question <font color='tomato'>one week ago</font>?</div>\
      <div id='instruct'><p>The S&P 500 is an index that tracks much \
          of the American stock market.</p><p>Think of the current level of the S&P 500 \
          as 100. Please write your best guess for the relative level of the S&P 500 \
          in one month from now.</p></div>",
      columns: 20,
      rows: 1,
      value: '',
      name: "recall_sp500"
    }],
    data: {
      category: 'recall_stock'
    }
  }
];

// Corona perception questions
corona_perception_block = [fullscreen_prompt,
  {
    type: "survey-multi-choice",
    preamble: "<div id = 'instruct', class = 'recall'>What is your answer to these questions <font color='Chartreuse'>right now</font>?</div>'",
    data: {
      category: "corona_percept"
    },
    questions: [{
        prompt: "Are you or have you been in self-isolation or quarantine during the outbreak of the new coronavirus?",
        options: ["Yes", "No"],
        required: true,
        name: "corona_isolate",
        horizontal: true
      },
      {
        prompt: "Did you lose your job due to the outbreak of the new coronavirus?",
        options: ["Yes", "No"],
        required: true,
        name: "corona_jobloss",
        horizontal: true
      },
      {
        prompt: "How did your household income change due to the outbreak of the new coronavirus?",
        options: ["Income decreased", "Income didn't change", "Income increased"],
        required: true,
        name: "corona_income",
        horizontal: true
      },
      {
        prompt: "Have you been infected with the new coronavirus?",
        options: ["Yes", "No"],
        required: true,
        name: "corona_infctd",
        horizontal: true
      }
    ],
  },
  {
    timeline: [{
        type: "survey-multi-choice",
        data: {
          category: "corona_percept"
        },
        questions: [{
            prompt: "Have you been diagnosed by a COVID-19 test?",
            options: ["Yes", "No"],
            required: true,
            name: "corona_dgnz"
          },
          {
            prompt: "Have you been hospitalized due to the infection?",
            options: ["Yes", "No"],
            required: true,
            name: "corona_hsptl"
          }
        ]
      },
      {
        type: "survey-text",
        data: {
          category: "corona_percept"
        },
        questions: [{
          prompt: "<div id='instruct'>On what date were you infected?</div>",
          columns: 60,
          rows: 1,
          value: '',
          name: "corona_duration_infctd"
        }, ]
      }
    ],
    conditional_function: function() {
      resp = JSON.parse(jsPsych.data.get().last(1).select('responses').values[0])["corona_infctd"]
      return resp == "Yes" ? true : false
    }
  },
  fullscreen_prompt,
  {
    type: "survey-multi-choice",
    preamble: "<div id = 'instruct', class = 'recall'>What is your answer to these questions <font color='Chartreuse'>right now</font>?</div>'",
    data: {
      category: "corona_percept"
    },
    questions: [{
        prompt: "Do you personally know anyone infected with the new coronavirus?",
        options: ["Yes", "No"],
        required: true,
        name: "corona_prsn_know",
        horizontal: true
      },
      {
        prompt: "Do you know of anyone in your town or community who is infected with the new coronavirus?",
        options: ["Yes", "No"],
        required: true,
        name: "corona_cmmnty_know",
        horizontal: true
      },
      {
        prompt: "How long do you think the coronvirus outbreak is likely to impact life in your community?",
        options: ["1-2 weeks", "1-2 months", "3-4 months", "more than 6 months"],
        required: true,
        name: "corona_duration",
        horizontal: true
      }
    ]
  },
  fullscreen_prompt,
  {
    type: "survey-likert",
    preamble: "<div id = 'instruct', class = 'recall'>What is your answer to these questions <font color='Chartreuse'>right now</font>?</div>'",
    data: {
      category: "corona_percept"
    },
    questions: [{
        prompt: "<div id='instruct'>How upset would you be if you find out that a close family member is infected with the new coronavirus?</div>",
        labels: ["1<br>Not at all", "2", "3", "4", "5<br>Extremely upset"],
        required: true,
        name: "corona_upst_fmly"
      },
      {
        prompt: "<div id='instruct'>How upset would you be if you find out that you are infected with the new coronavirus?</div>",
        labels: ["1<br>Not at all", "2", "3", "4", "5<br>Extremely upset"],
        required: true,
        name: "corona_upst_me"
      },
      {
        prompt: "<div id='instruct'>How much has your personal life changed relative to a month ago as a result of the new coronavirus epidemic?</div>",
        labels: ["1<br>No change", "2", "3", "4", "5<br>Extreme change"],
        required: true,
        name: "corona_already_changed"
      }
    ],
    scale_width: 400
  },
  fullscreen_prompt,
  {
    type: "survey-likert",
    preamble: "<div id = 'instruct', class = 'recall'>What is your answer to these questions <font color='Chartreuse'>right now</font>?</div>'",
    data: {
      category: "corona_percept"
    },
    questions: [{
        prompt: "<div id='instruct'>In the next few weeks, how much will your personal life change as a result of the new coronavirus epidemic?</div>",
        labels: ["1<br>No change", "2", "3", "4", "5<br>Extreme change"],
        required: true,
        name: "corona_prsnl_change"
      },
      {
        prompt: "<div id='instruct'>In the next few weeks, how much will the lives of people around you will change as a result of the new coronavirus epidemic?</div>",
        labels: ["1<br>No change", "2", "3", "4", "5<br>Extreme change"],
        required: true,
        name: "corona_close_change"
      },
      {
        prompt: "<div id='instruct'>In the next few weeks, how much will society change as a result of the new coronavirus epidemic?</div>",
        labels: ["1<br>No change", "2", "3", "4", "5<br>Extreme change"],
        required: true,
        name: "corona_scty_change"
      }
    ],
    scale_width: 400,
  },
  fullscreen_prompt,
  {
    type: "survey-likert",
    preamble: "<div id = 'instruct', class = 'recall'>What is your answer to these questions <font color='Chartreuse'>right now</font>?</div>'",
    data: {
      category: "corona_percept"
    },
    questions: [{
        prompt: "<div id='instruct'>How worried are you about being infected with the coronavirus?</div>",
        labels: ["1<br>Not at all", "2", "3", "4", "5<br>Very worried"],
        required: true,
        name: "corona_worried"
      },
      {
        prompt: "<div id='instruct'>How anxious do you feel about the possibility of losing your \
        life to the new coronavirus?</div>",
        labels: ["1<br>Not at all", "2", "3", "4", "5<br>Very anxious"],
        required: true,
        name: "corona_death"
      },
      {
        prompt: "<div id='instruct'>To what extent do you agree with the following: \"If I wash my \
        hands and am careful about my exposure, I will avoid being infected with the coronavirus.\"</div>",
        labels: ["1<br>Not at all", "2", "3", "4", "5<br>Completely agree"],
        required: true,
        name: "corona_wash"
      }
    ],
    scale_width: 400
  },
  fullscreen_prompt,
  {
    type: "survey-likert",
    preamble: "<div id = 'instruct', class = 'recall'>What is your answer to these questions <font color='Chartreuse'>right now</font>?</div>'",
    data: {
      category: "corona_percept"
    },
    questions: [{
        prompt: "<div id='instruct'>Relative to one month ago, before the new coronavirus epidemic, how much time do you spend reading and watching the news?</div>",
        labels: ["1<br>Much less", "2", "3<br>Same as before", "4", "5<br>Much more"],
        required: true,
        name: "corona_rel_media"
      },
      {
        prompt: "<div id='instruct'>What is your reaction to the volume of information about the new coronavirus?</div>",
        labels: ["1<br>I cant stand<br>it anymore", "2", "3<br>Neutral", "4", "5<br>I want more<br>information"],
        required: true,
        name: "corona_info_seek"
      }
    ],
    scale_width: 400
  },
  {
    type: "html-slider-response",
    stimulus: "<div id = 'instruct', class = 'recall'>What is your answer to this question <font color='Chartreuse'>right now</font>?</div>'" +
      "<div id='instruct'>What do you think the chances are that you will personally be infected with the new coronavirus?</div>",
    slider_width: 400,
    labels: ["0%", "50%", "100%"],
    require_movement: true,
    data: {
      category: "corona_chances_infct"
    }
  },
  {
    type: "html-slider-response",
    stimulus: "<div id = 'instruct', class = 'recall'>What is your answer to this questiont <font color='Chartreuse'>right now</font>?</div>'" +
      "<div id='instruct'>What do you think the chances are that you will lose a loved one to the new coronavirus?</div>",
    slider_width: 400,
    labels: ["0%", "50%", "100%"],
    require_movement: true,
    data: {
      category: "corona_chances_loved"
    }
  }
];
