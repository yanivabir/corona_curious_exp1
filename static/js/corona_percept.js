// Corona perception questions
corona_perception_block = [
  {
    type: "survey-multi-choice",
    questions: [
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
    timeline:[
      {
        type: "survey-multi-choice",
        questions: [
          {
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
        questions: [{
            prompt: "<div id='instruct'>How long ago were you infected?</div>",
            columns: 60,
            rows: 1,
            value: ''
          },
        ]
      }
    ],
    conditional_function: function(){
      resp = JSON.parse(jsPsych.data.get().last(1).select('responses').values[0])["corona_infctd"]
      return resp == "Yes" ? true : false
    }
  },
  {
    type: "survey-multi-choice",
    questions: [
      {
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
    questions: [
      {
        prompt: "How worried are you about being infected with the coronavirus?",
        labels: ["1<br>Not at all", "2", "3", "4", "5<br>Very worried"],
        required: true,
        name: "corona_worried"
      },
      {
        prompt: "How anxious do you feel about the possibility of losing your \
        life to the new coronavirus?",
        labels: ["1<br>Not at all", "2", "3", "4", "5<br>Very anxious"],
        required: true,
        name: "corona_death"
      },
      {
        prompt: "To what extent do you agree with the following: \"If I wash my \
        hands and am careful about my exposure, I will avoid being infected with the coronavirus.\"",
        labels: ["1<br>Not at all", "2", "3", "4", "5<br>Completely agree"],
        required: true,
        name: "corona_wash"
      }
    ],
    scale_width: 400
  },
  {
    type: "html-slider-response",
    stimulus: "What do you think the chances are that you will personally be infected with the new coronavirus?",
    slider_width: 400,
    require_movement: true,
    data: {
      category: "corona_chances_infct"
    }
  },
  {
    type: "html-slider-response",
    stimulus: "What do you think the chances are that you will lose a loved one to the new coronavirus??",
    slider_width: 300,
    require_movement: true,
    data: {
      category: "corona_chances_loved"
    }
  }
];
