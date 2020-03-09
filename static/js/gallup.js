// Gallup world poll
var gallup_questions = [
  {
    prompt: "<div id='instruct'>All things considered, how satisfied are you with your life as a whole these days? Use a 0 to 10 scale, where 0 is dissatisfied and 10 is satisfied.</div>",
    options: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    horizontal: true,
    name: "gallup01"
  },
  {
    prompt: "<div id='instruct'>Did you experience anger during a lot of the day yesterday?</div>",
    options: ["Yes", "No"],
    horizontal: true,
    name: "gallup02"
  },
  {
    prompt: "<div id='instruct'>Did you experience depression during a lot of the day yesterday?</div>",
    options: ["Yes", "No"],
    horizontal: true,
    name: "gallup03"
  },
  {
    prompt: "<div id='instruct'>Did you experience enjoyment during a lot of the day yesterday?</div>",
    options: ["Yes", "No"],
    horizontal: true,
    name: "gallup04"
  },
  {
    prompt: "<div id='instruct'>Did you experience happiness during a lot of the day yesterday?</div>",
    options: ["Yes", "No"],
    horizontal: true,
    name: "gallup05"
  },
  {
    prompt: "<div id='instruct'>Did you experience sadness during a lot of the day yesterday?</div>",
    options: ["Yes", "No"],
    horizontal: true,
    name: "gallup06"
  },
  {
    prompt: "<div id='instruct'>Did you experience stress during a lot of the day yesterday?</div>",
    options: ["Yes", "No"],
    horizontal: true,
    name: "gallup07"
  },
  {
    prompt: "<div id='instruct'>Did you experience worry during a lot of the day yesterday?</div>",
    options: ["Yes", "No"],
    horizontal: true,
    name: "gallup08"
  },
  {
    prompt: "<div id='instruct'>Now, please think about yesterday, from the morning until the end of the day. Think about where you were, what you were doing, who you were with, and how you felt. Did you learn or do something interesting yesterday?</div>",
    options: ["Yes", "No"],
    horizontal: true,
    name: "gallup09"
  },
  {
    prompt: "<div id='instruct'>Now, please think about yesterday, from the morning until the end of the day. Think about where you were, what you were doing, who you were with, and how you felt. Did you smile or laugh a lot yesterday?</div>",
    options: ["Yes", "No"],
    horizontal: true,
    name: "gallup10"
  },
  {
    prompt: "<div id='instruct'>Now, please think about yesterday, from the morning until the end of the day. Think about where you were, what you were doing, who you were with, and how you felt. Were you treated with respect all day yesterday?</div>",
    options: ["Yes", "No"],
    horizontal: true,
    name: "gallup11"
  },
  {
    prompt: "<div id='instruct'>Now, please think about yesterday, from the morning until the end of the day. Think about where you were, what you were doing, who you were with, and how you felt. Would you like to have more days just like yesterday?</div>",
    options: ["Yes", "No"],
    horizontal: true,
    name: "gallup12"
  },
  {
    prompt: "<div id='instruct'>Please imagine a ladder with steps numbered from 0 at the bottom to 10 at the top. Suppose we say that the top of the ladder represents the best possible life for you and the bottom of the ladder represents the worst possible life for you. On which step of the ladder would you say you personally feel you stand at this time, assuming that the higher the step the better you feel about your life, and the lower the step the worse you feel about it? Which step comes closest to the way you feel?</div>",
    options: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    horizontal: true,
    name: "gallup13"
  },
  {
    prompt: "<div id='instruct'>Please imagine a ladder with steps numbered from 0 at the bottom to 10 at the top. Suppose we say that the top of the ladder represents the best possible life for you and the bottom of the ladder represents the worst possible life for you. On which step of the ladder would you say you stood 5 years ago?</div>",
    options: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    horizontal: true,
    name: "gallup14"
  },
  {
    prompt: "<div id='instruct'>Please imagine a ladder with steps numbered from 0 at the bottom to 10 at the top. Suppose we say that the top of the ladder represents the best possible life for you and the bottom of the ladder represents the worst possible life for you. On which step of the ladder would you say you will stand on in the future, say about 5 years from now?</div>",
    options: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    horizontal: true,
    name: "gallup15"
  },
];

var gallup_block = []
for (i=0; i<Math.ceil(gallup_questions.length / 3); i++){
  gallup_block.push({
    type: 'survey-multi-choice',
    questions: gallup_questions.slice(i * 3, i * 3 + 3)
  })
}
