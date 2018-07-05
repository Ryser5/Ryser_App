(function() {
  var questions = [{
    question: "Citrus fruits are an excellent source of _______?",
    choices: [" Vitamin C", " Calcium", " Carbohydrates"],
    correctAnswer:" Vitmain C"
  }];

  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  // Display initial question
  var right;
  displayNext();

  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();

    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {
      return false;
    }
    right = choose();
    console.log("right =" + right);

    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext(right);
    }
  });

  // // Click handler for the 'prev' button
  // $('#prev').on('click', function (e) {
  //   e.preventDefault();

  //   if(quiz.is(':animated')) {
  //     return false;
  //   }
  //   choose();
  //   questionCounter--;
  //   displayNext();
  // });

  // // Click handler for the 'Start Over' button
  // $('#start').on('click', function (e) {
  //   e.preventDefault();

  //   if(quiz.is(':animated')) {
  //     return false;
  //   }
  //   questionCounter = 0;
  //   selections = [];
  //   displayNext();
  //   $('#start').hide();
  // });


  // Animates buttons on hover
  $('.btn btn-default btn-lg').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.btn btn-default btn-lg').on('mouseleave', function () {
    $(this).removeClass('active');
  });

  // Creates and returns the div that contains the questions and
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });

    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    //qElement.append(header);

    var question = $('<p>').append(questions[index].question);
    qElement.append(question);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
  }

  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li id="que" >');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
    console.log("Chosen");
    console.log(selections[questionCounter]);
    if(selections[questionCounter] == 2)
      return true;
    return false;
  }

  // Displays next requested element
  function displayNext(right) {
    quiz.fadeOut(function() {
      $('#question').remove();

      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }

        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){

          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        //$('#start').show();
      }
    });
  }

  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question', class:"quest"});
    console.log(right);
    var numCorrect = 0;
    for (var i = 0; i < 1; i++) {
      // if (selections[i] === questions[i].correctAnswer) {
       if (right) {
         console.log("yeas");
        score.append('CORRECT! Citrus fruits are an excellent source of vitamin C, a nutrient that strengthens the immune system and keeps your skin smooth and elastic. In fact, just one medium orange has all the vitamin C you need in a day!');
        return score;
      }
      if(!right){
        score.append('INCORRECT! Citrus fruits are an excellent source of vitamin C, a nutrient that strengthens the immune system and keeps your skin smooth and elastic. In fact, just one medium orange has all the vitamin C you need in a day!');
        return score;
      }
    }

  }
})();
