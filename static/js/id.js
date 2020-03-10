// I/D epistemic curiosty

var id_items = [
  "I enjoy exploring new ideas.",
  "Difficult conceptual problems can keep me awake all night thinking about solutions.",
  "I enjoy learning about subjects that are unfamiliar to me.",
  "I can spend hours on a single problem because I just can't rest without knowing the answer.",
  "I find it fascinating to learn new information.",
  "I feel frustrated if I can't figure out the solution to a problem, so I work even harder to solve it.",
  "When I learn something new, I would like to find out more about it.",
  "I brood for a long time in an attempt to solve some fundamental problem.",
  "I enjoy discussing abstract concepts.",
  "I work like a fiend at problems that I feel must be solved."
];

var id_block = [];

for (i = 0; i < Math.ceil(id_items.length / 3); i++) {
  var these_q = []
  for (j = 0; j < 3; j++) {
    if (id_items[i * 3 + j]) {
      these_q.push({
        prompt: "<div id='instruct'>" + five_d_items[i * 3 + j] + "</div>",
        labels: ["Almost Never", "Sometimes",
          "Often", "Almost Always"
        ],
        name: "id_" + i * 3 + j + 1,
        required: true
      });
    }

  }

  id_block.push({
    type: "survey-likert",
    preamble: "<div id='instruct'>A number of statements that people use to describe themselves are given below. Read each statement and then select the appropriate response to indicate how you <u>generally</u> feel. There are no right or wrong answers. Do not spend too much time on any one statement but give the answer that seems to describe how you <u>generally</u> feel.</div>",
    questions: these_q,
    scale_width: 400,
    post_trial_gap: 200
  });
}
