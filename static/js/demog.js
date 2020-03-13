// Demographics etc
demographic_block = [{
    type: "survey-multi-choice",
    questions:[{
      prompt: "<div id='instruct'>Who will you vote for in the upcoming presidential elections?</div>",
      options: ["President Trump", "The Democratic candidate", "Don't know",
      "I won't vote"],
      horizontal: true,
      name: "vote_for"
    }],
    data: {
      category: 'politics'
    }
  },
  {
    type: "html-slider-response",
    stimulus: "<div id='instruct'>Who do you think is likely to win the next \
    presidential elections?</div>",
    labels: ["100% certain Trump", "Coin toss", "100% certain Democrat"],
    require_movement: true,
    data: {
      category: 'politics_win'
    }
  },
  {
    type: 'survey-text',
    questions: [{
        prompt: "<div id='instruct'><p>The S&P 500 is an index that tracks much \
        of the American stock market.</p><p>Think of the current level of the S&P 500 \
        as 100. Please write your best guess for the relative level of the S&P 500 \
        in one month from now.</p></div>",
        columns: 20,
        rows: 1,
        value: '',
        name: "sp500"
      }],
      data: {
        category: 'stock'
      }
  },
  {
    type: "survey-text",
    questions: [{
        prompt: "<div id='instruct'>How old are you?</div>",
        columns: 20,
        rows: 1,
        value: '',
        name: "age"
      },
      {
        prompt: "<div id='instruct'>What city do you live in?</div>",
        columns: 20,
        rows: 1,
        value: '',
        name: "city"
      },
      {
        prompt: "<div id='instruct'>What is your zip code?</div>",
        columns: 20,
        rows: 1,
        value: '',
        name: "zip"
      },
      {
        prompt: "<div id='instruct'>What state do you live in?</div>",
        columns: 20,
        rows: 1,
        value: '',
        name: "state"
      }
    ],
    data: {
      category: 'demographics'
    }
  }, {
    type: "survey-multi-choice",
    questions: [{
        prompt: "What is your gender?",
        options: ["Male", "Female", "Other"],
        required: true,
        horizontal: true,
        name: "gender"
      },
      {
        prompt: "What is your race/ethnicity?",
        options: ["American Indian or Alaska Native", "Asian",
          "Black or African American", "Hispanic or Latino/a", "Pacific Islander",
          "White", "Multi-racial", "Prefer not to answer"
        ],
        horizontal: true,
        required: true,
        name: "race"
      },
      {
        prompt: "What is the highest degree or level of school that you have completed? (If you are currently enrolled in school, please indicate the highest degree you have received)?",
        options: ["Did not complete high school", "High school degree or equivalent (e.g. GED)",
          "Some college", "Associate Degree", "Bachelor's Degree",
          "Master's Degree", "Professional Degree (e.g. MD, JD, DDS)", "Doctorate"
        ],
        horizontal: true,
        required: true,
        name: "education"
      },
      {
        prompt: "Is English your native language?",
        options: ["Yes", "No"],
        horizontal: true,
        required: true,
        name: "native_english"
      }
    ],
    data: {
      category: 'demographics'
    }
  },
  {
    type: 'survey-likert',
    questions: [{
      prompt: "How fluent are you in reading and understanding English?",
      labels: ["1<br>Not at all", "2", "3", "4", "5<br>Very fluent"],
      required: true,
      name: "fluent"
    }],
    scale_width: 400,
    data: {
      category: 'demographics'
    }
  }
]
