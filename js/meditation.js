var timeArr = [900, 1800, 2700]; // deklarasi panjang 3 durasi
var themes = ["forest", "rain", "ocean"]; // deklarasi tema
var duration = ["15-minutes", "30-minutes", "45-minutes"]; // deklarasi 3 durasi
var timePicked = null; // deklarasi waktu yang dipilih
var themeId = null; // deklarasi tema yang dipilih
var isPaused = false; // deklarasi bahwa meditasi akan berjalan

$("#timer").hide(0);
$("#instructions").hide(0);
$("#meditation-status").hide(0);

$("body").keypress(function(event) { // shortcut
    if(event.key == "P" || event.key == "p"){
        isPaused = true;
        $("#meditation-status").html("Paused");
        $("#meditation-status").fadeIn(500);
    } else if (event.key == "Enter"){
        isPaused = false;
        $("#meditation-status").fadeOut(500);
    } else if (event.key == "R" || event.key == "r"){
        location.reload();
    } else if(event.key === " "){
        window.location.replace("profile.html");
    }
});

$(".option").click(function(){ // pemilihan tema dan durasi

    var optionId = $(this).attr("id");

    if(themes.includes(optionId)){
        optionPick(optionId, "theme-option-clicked", themes);
        optionPick(`${optionId}-text`, "text-clicked", themes);
        switch(optionId){
            case "forest":
                themeId = themes[0];
                break;
            case "rain":
                themeId = themes[1];
                break;
            case "ocean":
                themeId = themes[2];
                break;
        }
    } else if(duration.includes(optionId)){
        optionPick(optionId, "text-option-clicked", duration);
        switch(optionId){
            case "15-minutes":
                timePicked = timeArr[0];
                break;
            case "30-minutes":
                timePicked = timeArr[1];
                break;
            case "45-minutes":
                timePicked = timeArr[2];
                break;
        }
    }

});

function optionPick(idOption, classNameItem, optionsArray){ // memastikan hanya 1 pilihan dari tema dan opsi

    var unpickedOptions = [...optionsArray];

    for(let i = 0; i < unpickedOptions.length; i++){
        if(unpickedOptions[i] === idOption){
            unpickedOptions.splice(i, 1);
        }
    }

    console.log(unpickedOptions);

    $("#" + idOption).addClass(classNameItem);

    for(let i = 0; i < unpickedOptions.length; i++){
        $("#" + unpickedOptions[i]).removeClass(classNameItem);
    }

}

$("#start-button").click(() => { // validasi sebelum memulai meditasi

    if(themeId == null){
        $("#invalidTheme").html("Please Select a Theme");
    } else {
        $("#invalidDuration").html("");
    }

    if(timePicked == null){
        $("#invalidDuration").html("Please Select a Duration");
    } else {
        $("#invalidDuration").html("");
    }

    if(themeId != null && timePicked != null){

        $("#meditation-body").css("backgroundImage", `url("image/meditation/${themeId}.png")`);
        console.log($("#meditation-body").css("backgroundImage"));
        $("#timer").fadeIn(1000);
        $("#instructions").fadeIn(1000);
        $("#options").fadeOut(500);
        setTimeout(countDown, 1000);
    }

})

function countDown(){ // perhitungan durasi waktu tersisa dan yang telah dilewati

    var timePassed = 0;
    var timeLeft = timePicked;

    var audioChoose = new Audio("audio/" + themeId + ".mp3");
    audioChoose.volume = 0;
    audioChoose.play();
    let audioVolume = 0;

    for(var i = 0; i < 10; i++){
        audioVolume += 0.1;
        audioChoose.volume = audioVolume;
    }

    setInterval(function() {

        if(isPaused == false){

            if(audioChoose.paused){
                audioChoose.play();
            }

            timePassed += 1;

            const minutes = Math.floor(timeLeft/60);
            var seconds = timeLeft % 60;
            seconds = seconds < 10 ? `0${seconds}` : seconds;

            $("#time").html(minutes + ':' + seconds);

            if(timeLeft <= 10 && timeLeft > 0){
                audioVolume -= 0.1;
                audioChoose.volume = audioVolume;
            }

            if(timeLeft <= 10 && timeLeft > 5){
                $("#timer-path").css("stroke", "orange");
            } else if (timeLeft <= 5 && timeLeft > -1){
                $("#timer-path").css("stroke", "red");
            }

            dashArray();

            if(timeLeft == 0){
                isPaused = true;
                timeLeft = 0;
                audioChoose.pause();
                audioChoose.currentTime = 0;
                $("#meditation-status").html("Meditation Completed");
                $("#meditation-status").fadeIn(500);
            }

            timeLeft = timePicked - timePassed;    

        } else {
            audioChoose.pause();
        }
    }, 1000);

    function timeFraction(){ // menghitung pecahan dari total durasi
        return timeLeft / timePicked;
    }

    function dashArray(){ // menghitung panjang busur
        console.log(timeFraction());
        var circleDashArray = `${(timeFraction() * 283).toFixed(0)} 283`;
        $("#timer-path").attr("stroke-dasharray", circleDashArray);
    }
    
}