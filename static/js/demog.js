// Demographics etc
demographic_block = [{
    type: "survey-text",
    questions: [{
        prompt: "How old are you?",
        columns: 20,
        rows: 1,
        value: ''
      },
      {
        prompt: "What is your zip code?",
        columns: 40,
        rows: 1,
        value: ''
      },
      {
        prompt: "What state do you live in?",
        columns: 20,
        rows: 1,
        value: ''
      }
    ],
    data: {
      category: 'debrief'
    }
  }, {
    type: "survey-multi-choice",
    questions: [{
        prompt: "What is your gender?",
        options: ["Male", "Female", "Other"],
        required: true,
        horizontal: true
      },
      {
        prompt: "What is your race/ethnicity?",
        options: ["American Indian or Alaska Native", "Asian",
          "Black or African American", "Hispanic or Latino/a", "Pacific Islander",
          "White", "Multi-racial", "Prefer not to answer"
        ],
        horizontal: true,
        required: true
      },
      {
        prompt: "What is the highest degree or level of school that you have completed? (If you are currently enrolled in school, please indicate the highest degree you have received)?",
        options: ["Did not complete high school", "High school degree or equivalent (e.g. GED)",
          "Some college", "Associate Degree", "Bachelor's Degree",
          "Master's Degree", "Professional Degree (e.g. MD, JD, DDS)", "Doctorate"
        ],
        horizontal: true,
        required: true
      },
      {
        prompt: "Is English your native language?",
        options: ["Yes", "No"],
        horizontal: true,
        required: true
      }
    ],
    data: {
      category: 'debrief'
    }
  },
  {
    type: 'survey-likert',
    questions: [{
      prompt: "How fluent are you in reading and understanding English?",
      labels: ["1<br>Not at all", "2", "3", "4", "5<br>Very fluent"],
      required: true
    }],
    data: {
      category: 'debrief'
    }
  }
]
