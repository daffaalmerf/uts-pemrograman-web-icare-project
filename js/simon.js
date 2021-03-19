var level = 0; // declare starting level

var colors = ["green", "red", "yellow", "blue"]; // declare 4 colors in simon game

var userPattern = []; // declare the pattern to store user's choice

var gamePattern = []; // declare the pattern made through randomization

$("body").keypress(function(event){
    console.log(event.key);
    if(event.key === "Enter"){
    $(".level-text").html("Level " + level); // increments level
    nextSequence();
    } else if(event.key === "r" || event.key === "R"){
        level = 0;
        gamePattern = [];
        userPattern = [];
        $(".level-text").html("Press Enter to Start");
    }
});

$(".simon-element").click(function() {

    var id = $(this).attr("id");
    var audioButton = new Audio("audio/" + id + ".mp3");
    audioButton.play();

    if(level !== 0){
        userPattern.push(id);
        console.log(userPattern);

        $(this).addClass("pressed");
        setTimeout(() => {
        $(this).removeClass("pressed");
        }, 150);

        checkPattern(userPattern.length);
    }

})

function nextSequence(){

    userPattern = [];

    level++;
    $(".level-text").html("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomColor = colors[randomNumber];
    setTimeout(() => {
        var audioChoose = new Audio("audio/" + randomColor + ".mp3");
        audioChoose.play();
        $("." + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    }, 500);
    gamePattern.push(randomColor);

    console.log(gamePattern);

}

function checkPattern(userPatternLength){

    if(gamePattern[userPatternLength - 1] === userPattern[userPatternLength - 1]){
        if(gamePattern.length === userPattern.length){
            nextSequence();
        }
    } else {
        var audioError = new Audio("audio/wrong.mp3");
        audioError.play();
        $(".level-text").html("Score: " + level);
        $("body").addClass("red");
        setTimeout(() => {
            $("body").removeClass("red");
        }, 500);
        level = 0;
        gamePattern = [];
        userPattern = [];
    }

}


