
var card = $("#quiz-area");
var countStartNumber = 30;

var questions = [{
  question: "What is Albus Dumbledore's full name?",
  answers: ["Albus Percival Tristan Brian Dumbledore", "Albus Percival Wulfric Brian Dumbledore", "Albus Emmeric Wulfric Brian Dumbledore", "Albus Percival Wulfric Byron Dumbledore"],
  correctAnswer: "Albus Percival Wulfric Brian Dumbledore",
  image: "assets/images/dumbledore.jpg"
}, {
  question: "What's Lord Voldemort's real name?",
  answers: ["Thomas Sorvolo Riddle", "Tom Sorvolo Riddle", "Tom Marvolo Riddle", "Thomas Marvolo Riddle"],
  correctAnswer: "Tom Marvolo Riddle",
  image: "assets/images/voldemort.png"
}, {
  question: "What did the Marauders call Severus Snape?",
  answers: ["Snivellus", "Sevy", "The Half-Blood Prince", "Snivelly"],
  correctAnswer: "Snivellus",
  image: "assets/images/snape.jpg"
}, {
  question: "What is Harry's full name?",
  answers: ["Harry Sirius Potter", "Harry Remus Potter", "Harry Severus Potter", "Harry James Potter"],
  correctAnswer: "Harry James Potter",
  image: "assets/images/harry.jpg"
}];


var timer;

var game = {

  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    game.counter--;
    $("#counter-number").text(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.timeUp();
    }
  },

  loadQuestion: function() {

    timer = setInterval(game.countdown, 1000);

    card.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      card.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
      + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
    }
  },

  nextQuestion: function() {
    game.counter = countStartNumber;
    $("#counter-number").text(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },

  timeUp: function() {

    clearInterval(timer);

    $("#counter-number").html(game.counter);

    card.html("<h2>No more Time!</h2>");
    card.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
    card.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  results: function() {

    clearInterval(timer);

    card.html("<h2>Results:</h2>");

    $("#counter-number").text(game.counter);

    card.append("<h3>Correct Answers: " + game.correct + "</h3>");
    card.append("<h3>Wrong Answers: " + game.incorrect + "</h3>");
    card.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
    card.append("<br><button id='start-over'>Again?</button>");
  },

  clicked: function(e) {
    clearInterval(timer);
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {

    game.incorrect++;

    clearInterval(timer);

    card.html("<h2>Wrong!</h2>");
    card.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
    card.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  answeredCorrectly: function() {
    clearInterval(timer);
    game.correct++;
    card.html("<h2>Correct!</h2>");
    card.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

$(document).on("click", "#start-over", function() {
  game.reset();
});

$(document).on("click", ".answer-button", function(e) {
  game.clicked(e);
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
  game.loadQuestion();
});
