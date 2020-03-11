// anxiety

var anxiety = [{
    type: "survey-likert",
    preamble: "<div id='instruct'>A number of statements which people have used to \
   describe themselves are given below. Read each statement and chose the number \
   that indicates how you feel <b>right now‚ at this moment</b>.</p><p>There \
   is no right or wrong answers. Do not spend too much time on any one statement \
   but give the answer which seems to describe your present feelings best.</div>",
    scale_width: 400,
    questions: [{
        prompt: "I feel calm",
        labels: ["1<br>Not at all", "2<br>Somewhat", "3<br>Moderately", "4<br>Very much"],
        name: "anxiety_calm"
      },
      {
        prompt: "I am tense",
        labels: ["1<br>Not at all", "2<br>Somewhat", "3<br>Moderately", "4<br>Very much"],
        name: "anxiety_tense"
      },
      {
        prompt: "I feel upset",
        labels: ["1<br>Not at all", "2<br>Somewhat", "3<br>Moderately", "4<br>Very much"],
        name: "anxiety_upset"
      }
    ],
    post_trial_gap: 200,
    data: {
      category: "anxiety"
    }
  },
  {
    type: "survey-likert",
    preamble: "<div id='instruct'>A number of statements which people have used to \
     describe themselves are given below. Read each statement and chose the number \
     that indicates how you feel <b>right now‚ at this moment</b>.</p><p>There \
     is no right or wrong answers. Do not spend too much time on any one statement \
     but give the answer which seems to describe your present feelings best.</div>",
    scale_width: 400,
    questions: [{
        prompt: "I am relaxed",
        labels: ["1<br>Not at all", "2<br>Somewhat", "3<br>Moderately", "4<br>Very much"],
        name: "anxiety_relax"
      },
      {
        prompt: "I feel content",
        labels: ["1<br>Not at all", "2<br>Somewhat", "3<br>Moderately", "4<br>Very much"],
        name: "anxiety_content"
      },
      {
        prompt: "I am worreid",
        labels: ["1<br>Not at all", "2<br>Some What", "3<br>Moderately so", "4<br>Very much so"],
        name: "anxiety_worry"
      }
    ],
    post_trial_gap: 200,
    data: {
      category: "anxiety"
    }
  },
  {
    type: "survey-likert",
    questions: [{
        prompt: "How anxious do you feel in general?",
        labels: ["1<br>Not at all", "2", "3", "4", "5<br>Extremely anxious"],
        name: "anxious_general"
      },
      {
        prompt: "How anxious are you right now?",
        labels: ["1<br>Not at all", "2", "3", "4", "5<br>Extremely anxious"],
        name: "anxious now"
      }
    ],
    post_trial_gap: 200,
    data: {
      category: "anxiety"
    }
  }
]
