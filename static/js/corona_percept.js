// Corona perception questions
corona_perception_block = [{
    type: "survey-multi-choice",
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
  {
    type: "survey-multi-choice",
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
  {
    type: "survey-likert",
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
        prompt: "<div id='instruct'>How much has your personal life changed relative to the time before the new coronavirus epidemic?</div>",
        labels: ["1<br>No change", "2", "3", "4", "5<br>Extreme change"],
        required: true,
        name: "corona_already_changed"
      }
    ],
    scale_width: 400
  },
  {
    type: "survey-likert",
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
  {
    type: "survey-likert",
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
  {
    type: "survey-likert",
    data: {
      category: "corona_percept"
    },
    questions: [
      {
        prompt: "<div id='instruct'>Relative to before the new coronavirus epidemic how much time do you spend reading and watching the news?</div>",
        labels: ["1<br>Much less", "2", "3<br>Same as before", "4", "5<br>Much more"],
        required: true,
        name: "corona_rel_media"
      },
      {
      prompt: "<div id='instruct'>What is your reaction to the volume of information about the new coronavirus?</div>",
      labels: ["1<br>I cant stand<br>it anymore", "2", "3<br>Neutral", "4", "5<br>I want more<br>information"],
      required: true,
      name: "corona_info_seek"
    }],
    scale_width: 400
  },
  {
    type: "survey-likert",
    data: {
      category: "corona_percept"
    },
    preamble: "<div id='instruct'>How anxious do you feel about the following \
    statements regarding the epidemic:</div>",
    questions: [
      {
        prompt: "<div id='instruct'>The number of infected cases in the US keeps rising</div>",
        labels: ["1<br>Not at all", "2", "3<br>", "4", "5<br>Very anxious"],
        required: true,
        name: "corona_anx_number"
      },
      {
        prompt: "<div id='instruct'>Severe constraints have been placed on everyday life due to the epidemic</div>",
        labels: ["1<br>Not at all", "2", "3<br>", "4", "5<br>Very anxious"],
        required: true,
        name: "corona_anx_contraint"
      }
      ],
    scale_width: 400
  },
  {
    type: "survey-likert",
    data: {
      category: "corona_percept"
    },
    preamble: "<div id='instruct'>How anxious do you feel about the following \
    statements regarding the epidemic:</div>",
    questions: [
      {
        prompt: "<div id='instruct'>It is unclear when the state of emergency will be over</div>",
        labels: ["1<br>Not at all", "2", "3<br>", "4", "5<br>Very anxious"],
        required: true,
        name: "corona_anx_emergency"
      },
      {
        prompt: "<div id='instruct'>Social distancing increasing feelings of loneliness</div>",
        labels: ["1<br>Not at all", "2", "3<br>", "4", "5<br>Very anxious"],
        required: true,
        name: "corona_anx_lonely"
      },
      {
        prompt: "<div id='instruct'>Economic prospects have become worse due to the epidemic</div>",
        labels: ["1<br>Not at all", "2", "3<br>", "4", "5<br>Very anxious"],
        required: true,
        name: "corona_anx_economic"
      }
      ],
    scale_width: 400
  },
  {
    type: "survey-likert",
    data: {
      category: "corona_percept"
    },
    questions: [
      {
        prompt: "<div id='instruct'>To what extent do you trust the quality of medical treatment available to you if you were to require it due to being infected with the new coronavirus?</div>",
        labels: ["1<br>Not at all", "2", "3<br>", "4", "5<br>Very trusting"],
        required: true,
        name: "corona_trust_medicine"
      },
      {
        prompt: "<div id='instruct'>To what extent do you agree with the following: \"I have an optimistic outlook regarding the way events will unfold in the coming weeks\"</div>",
        labels: ["1<br>Not at all", "2", "3<br>", "4", "5<br>Very much"],
        required: true,
        name: "corona_optimist"
      },
      {
        prompt: "<div id='instruct'>Do you find yourself able to enjoy a good book, a TV program, online browsing or social media?</div>",
        labels: ["1<br>Not at all", "2", "3<br>", "4", "5<br>Very much"],
        required: true,
        name: "corona_enjoy"
      }
      ],
    scale_width: 400
  },
  {
    type: "survey-likert",
    data: {
      category: "corona_percept"
    },
    questions: [
      {
        prompt: "<div id='instruct'>On a scale of 1-5, how well do you think you're coping with the new coronavirus crisis?</div>",
        labels: ["1<br>Very badly", "2", "3<br>", "4", "5<br>Very well"],
        required: true,
        name: "corona_cope"
      },
      {
        prompt: "<div id='instruct'>How much support do you get from people close to you during this epidemic (including friends, online friends, parents, partner or other family members)?</div>",
        labels: ["1<br>None at all", "2", "3<br>", "4", "5<br>A lot of support"],
        required: true,
        name: "corona_support"
      },
      {
        prompt: "<div id='instruct'>To what extent do you agree with the following: \"The new coronviurs crisis has helped me better appreciate what I already have in life\"</div>",
        labels: ["1<br>Not at all", "2", "3<br>", "4", "5<br>Very much"],
        required: true,
        name: "corona_appreciate"
      }
      ],
    scale_width: 400
  },
  {
    type: "html-slider-response",
    stimulus: "<div id='instruct'>What do you think the chances are that you will personally be infected with the new coronavirus?</div>",
    slider_width: 400,
    labels: ["0%", "50%", "100%"],
    require_movement: true,
    data: {
      category: "corona_chances_infct"
    }
  },
  {
    type: "html-slider-response",
    stimulus: "<div id='instruct'>What do you think the chances are that you will lose a loved one to the new coronavirus?</div>",
    slider_width: 400,
    labels: ["0%", "50%", "100%"],
    require_movement: true,
    data: {
      category: "corona_chances_loved"
    }
  }
];
