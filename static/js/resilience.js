// Resilience questionnaire
var resilience_scale = ["1<br>Never", "2<br>Not often", "3<br>Sometimes",
  "4<br>Most of the time", "5<br>All the time"
];
var resilience_items = [{
    "name": "reslience_optim2",
    "prompt": "If I get upset, I know how to make myself feel better"
  },
  {
    "name": "reslience_optim3",
    "prompt": "I try to make the best out of situations"
  },
  {
    "name": "reslience_optim4",
    "prompt": "I feel hopeful about my life"
  },
  {
    "name": "reslience_optim8",
    "prompt": "I take it easy on myself when I am not feeling well"
  },
  {
    "name": "resilience_meaning2",
    "prompt": "I try to find meaning in the things that happen to me"
  },
  {
    "name": "resilience_meaning3",
    "prompt": "I think about what things might be like for other people"
  },
  {
    "name": "resilience_help1",
    "prompt": "I keep my problems to myself"
  },
  {
    "name": "resilience_help4",
    "prompt": "If I have a problem, I know there is someone I can talk to"
  }
];



var resilience_quest = []
for (i = 0; i < Math.ceil(resilience_items.length / 3); i++) {
  resilience_quest.push({
    type: "survey-likert",
    questions: resilience_items.slice(i * 3, i * 3 + 3).map(function(x) {
      x.labels = resilience_scale;
      x.required = true;
      return x;
    }),
    scale_width:500,
    post_trial_gap: 200,
    data: {
      category: "resilience"
    },
    preamble: "<div id='instruct'>A number of statements which people have used to \
   describe themselves are given below. Read each statement and choose the number \
   that indicates how well it describes you.</p><p>There \
   is no right or wrong answers. Do not spend too much time on any one statement \
   but give the answer which seems to describe yourself best.</div>",
  });
}
