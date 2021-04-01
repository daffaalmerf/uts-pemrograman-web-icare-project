var level = 0; // deklarasi level awal

var colors = ["green", "red", "yellow", "blue"]; // deklarasi 4 warna dalam permainan

var userPattern = []; // deklarasi pola untuk menyimpan pilihan pemain

var gamePattern = []; // deklarasi pola yang dibuat melalui pengacakan

var started = false; // deklarasi permainan belum dimulai

$("body").keypress(function(event){ // shortcut
    console.log(event.key);
    if(event.key === "Enter"){
        if(started == false){
            $(".level-text").html("Level " + level);
            nextSequence();
            started = true;
        }
    } else if(event.key === "r" || event.key === "R"){
        level = 0;
        gamePattern = [];
        userPattern = [];
        $(".level-text").html("Press Enter to Start");
        started = false;
    } else if(event.key === " "){
        window.location.replace("profile.html");
    }
});

$(".simon-element").click(function() { // pemilihan pola 

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

function nextSequence(){ // pola berikutnya

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

function checkPattern(userPatternLength){ // pengecekan pola

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
        started = false;
    }

}

