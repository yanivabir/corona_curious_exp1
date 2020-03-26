// Forced chioce between trivia and corona related facts
var minResponseTime = 1500;

var facts = [
  {
    "number": 1,
    "type": "corona",
    "fact": "Community transmission describes when people are infected in public places, like public transportation, movie theatres, etc. and there's no connection between the infected person and the person they infect."
  },
  {
    "number": 2,
    "type": "corona",
    "fact": "One of the reasons the SARS outbreak in 2002-2003 was contained was that people were most infectious about seven days after they started to be sick — when they were usually already in the hospital or in quarantine."
  },
  {
    "number": 3,
    "type": "corona",
    "fact": "Epidemiologists use R0 (basic reproductive number), which is the average number of people who will be infected with each new infection, as a way to describe how contagious a pathogen is."
  },
  {
    "number": 4,
    "type": "corona",
    "fact": "The Centers for Disease Control and Prevention (CDC) recommends using hand sanitizers that are at least 60% alcohol, if you're not in a place where you can wash your hands."
  },
  {
    "number": 5,
    "type": "corona",
    "fact": "This novel coronavirus outbreak is the sixth one caused by bat-borne viruses over the past 30 years, which include SARS in 2002, MERS in 2012, and Ebola in 2014."
  },
  {
    "number": 6,
    "type": "corona",
    "fact": "This novel coronavirus enters human lung cells using a receptor called angiotensin-converting enzyme 2 (ACE2)."
  },
  {
    "number": 7,
    "type": "corona",
    "fact": "The Centers for Disease Control and Prevention (CDC) currently reports that the incubation of period of the novel coronavirus is 2-14 days, with symptoms appearing approximately 5 days after infection in most cases."
  },
  {
    "number": 8,
    "type": "corona",
    "fact": "A small study in March found that while pieces of the novel coronavirus's genetic material could still be found in samples taken from patients after their symptoms had subsided, these were not \"live\" or infectious samples of the virus."
  },
  {
    "number": 9,
    "type": "corona",
    "fact": "One study found that some of the most serious symptoms of Covid-19 result from the immune system becoming overactive, a response called a cytokine storm, which compromises lung tissue."
  },
  {
    "number": 10,
    "type": "corona",
    "fact": "According to a study published in the New England Journal of Medicine, the virus lasts on plastic surfaces up to 72 hours and on steel and cardboard up to 48 hours, but a large portion of it disappears within the first 8 hours."
  },
  {
    "number": 1,
    "type": "trivia",
    "fact": "Aphids, the tiny bugs that feed off of plants, are essentially born pregnant and can give birth 10 days after being born themselves."
  },
  {
    "number": 2,
    "type": "trivia",
    "fact": "The average male spends almost 3,000 hours shaving over the course of his lifetime."
  },
  {
    "number": 3,
    "type": "trivia",
    "fact": "In Oregon, you can find the world's smallest park, measuring only two feet in diameter."
  },
  {
    "number": 4,
    "type": "trivia",
    "fact": "In the throat you can find the only bone in the human body that is not connected to other bones."
  },
  {
    "number": 5,
    "type": "trivia",
    "fact": "Peter Pan was the first English play to be written especially for children."
  },
  {
    "number": 6,
    "type": "trivia",
    "fact": "Thimpu, the capital of Bhutan, is the only world capital that doesn't have any traffic lights."
  },
  {
    "number": 7,
    "type": "trivia",
    "fact": "Ninety percent of the world's true cinnamon comes from Sri Lanka."
  },
  {
    "number": 8,
    "type": "trivia",
    "fact": "The first American novel to sell one million copies was Uncle Tom's Cabin."
  },
  {
    "number": 9,
    "type": "trivia",
    "fact": "Of the world's most populous islands, the only one not in Asia is Great Britain."
  },
  {
    "number": 10,
    "type": "trivia",
    "fact": "The plumber who helped popularize and improve the flush toilet was named Thomas Crapper."
  }
];

var forced_choice_trial = {
  timeline: [{
      type: 'survey-likert',
      questions: [{
          prompt: "How many facts related to the new coronavirus would you like to \
      read?",
          labels: [...Array(11).keys()].map(x => x + ""), // 0-11
          required: true,
          name: "forced_choice_corona"
        },
        {
          prompt: "How many  trivia facts would you like to \
      read?",
          labels: [...Array(11).keys()].map(x => x + ""), // 0-11
          required: true,
          name: "forced_choice_trivia"
        }
      ],
      preamble: "<div id='instruct'><p>Choose how many trivia facts and facts related \
  to the new coronavirus you would like to read. You can choose between 2 and 20 \
  facts in total.</p></div>",
      randomize_question_order: true,
      scale_width: 400,
      data: {
        category: "forced_choice"
      }
    },
    {
      timeline: [{
        type: 'html-button-response',
        stimulus: '<div id="instruct"><p>You chose to view less than 2 facts.</p>\
      <p>You must choose between 2 and 20 facts in total.</p></div>',
        choices: ["Choose again"],
        margin_horizontal: "30px",
        margin_vertical: "80px",
        data: {
          category: "forced_choice_too_few"
        }
      }],
      conditional_function: function() {
        var choices = JSON.parse(jsPsych.data.get().filter({
          category: "forced_choice"
        }).last(1).values()[0]["responses"]);
        if (choices["forced_choice_corona"] + choices["forced_choice_trivia"] < 2) {
          return true
        }
        return false
      }
    }
  ],
  loop_function: function() {
    var choices = JSON.parse(jsPsych.data.get().filter({
        category: "forced_choice"
      }).last(1).values()[0]["responses"]),
      choice_sum = choices["forced_choice_corona"] + choices["forced_choice_trivia"];
    if (choice_sum < 2) {
      return true
    }
    jsPsych.data.addProperties({
      forced_choice_corona: choices["forced_choice_corona"],
      forced_choice_trivia: choices["forced_choice_trivia"]
    });
    return false
  }
};

var read_fact_block = {
  timeline: [{
    timeline: [{
      type: 'html-button-response-min-time',
      stimulus: function() {
        return '<div id="instruct"><p>' + jsPsych.timelineVariable('fact', true) +
          '</p></div>'
      },
      choices: ["Continue"],
      margin_horizontal: "40px",
      margin_vertical: "80px",
      min_response_time: minResponseTime,
      post_trial_gap: 300,
      data: {
        category: 'forced_choice_fact',
        type: jsPsych.timelineVariable('type'),
        fact: jsPsych.timelineVariable('fact')
      }
    }],
    conditional_function: function() {
      // Get choices
      var choices = JSON.parse(jsPsych.data.get().filter({
          category: "forced_choice"
        }).last(1).values()[0]["responses"]);

      // Get relevant choice
      if (jsPsych.timelineVariable('type', true) == "corona"){
        var n_chosen = choices["forced_choice_corona"];
      }else{
        var n_chosen = choices["forced_choice_trivia"];
      }

      // Check if number is smaller than number chosen
      if (jsPsych.timelineVariable('number', true) <= n_chosen){
        return true
      }
      return false
    }
  }],
  timeline_variables: facts,
  randomize_order: true
};

var forced_choice_instructions1 = {
  type: "html-button-response",
  stimulus: "<div id='instruct'><p> You now have the opportunity to read \
  more information.</p><p>On the next page, you will choose to find out at least\
   two pieces of information, but you can choose to find out as many as you want (up to 20). \
   You can choose to find out more about the new coronavirus or to find out more \
   general trivia facts - or some combination of the two.</p>\
   <p>After making your choice, you will be presented with the facts you chose to read, \
   one after the other.</p></div>",
   choices: ["Continue"],
   margin_horizontal: "40px",
   margin_vertical: "80px",
   post_trial_gap: 200,
   data: {
     category: 'forced_choice_instruct1',
   }
}

var forced_choice_instructions2 = {
  type: "html-button-response",
  stimulus: function() {
    return "<div id='instruct'><p>Press <i>Continue</i> to read the " +
    + (jsPsych.data.get().last(1).values()[0]["forced_choice_corona"] +
    jsPsych.data.get().last(1).values()[0]["forced_choice_trivia"]) +
    " facts you \
      have chosen, one after the other.</p></div>"
  },
   choices: ["Continue"],
   margin_horizontal: "40px",
   margin_vertical: "80px",
   post_trial_gap: 200,
   data: {
     category: 'forced_choice_instruct1',
   }
}
