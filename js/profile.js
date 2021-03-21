var moods = ["awesome", "good", "meh", "bad", "awful"]; // deklarasi 5 mood
var moodId = null; // deklarasi mood yang dipilih

$(".add-mood").show(0);

$("#mood-toggle").click(function(){ // toggle penambahan mood
    
    if($(this).attr("class") == "hide-toggle"){
        $(this).addClass("show-toggle");
        $(this).removeClass("hide-toggle");
        $(this).html("Show Options");
        $(".add-mood").slideUp(1000);
    } else if($(this).attr("class") == "show-toggle"){
        $(this).addClass("hide-toggle");
        $(this).removeClass("show-toggle");
        $(this).html("Hide Options");
        $(".add-mood").slideDown(1000);
    }

})

$(".mood-icon").click(function(){ // pemilihan mood

    console.log("pressed");

    var id = $(this).attr("id");

    switch(id){
        case "awesome":
            moodId = moods[0];
            break;
        case "good":
            moodId = moods[1];
            break;
        case "meh":
            moodId = moods[2];
            break;
        case "bad":
            moodId = moods[3];
            break;
        case "awful":
            moodId = moods[4];
    }

    var unpickedMoods = [...moods];

    for(let i = 0; i < unpickedMoods.length; i++){
        if(unpickedMoods[i] === id){
            unpickedMoods.splice(i, 1);
        }
    }

    $("#" + id).css("content", `url('image/mood/${id}-picked.png')`);
    $("#" + id + "-text").addClass("text-clicked");

    for(let i = 0; i < unpickedMoods.length; i++){
        $("#" + unpickedMoods[i]).css("content", `url('image/mood/${unpickedMoods[i]}.png')`)
        $("#" + unpickedMoods[i] + "-text").removeClass("text-clicked");
    }

    console.log(moodId);

});

$("#addMoodButton").click(function(){ // validasi penambahan mood

    if(moodId == null){
        $("#invalidMood").html("Please Select Your Mood");
    } else {
        $("#invalidMood").html("");
    }

    let moodDesc = $("#mood-desc").val();

    if(moodDesc == ""){
        $("#invalidDesc").html("Please Describe Your Situation");
    } else {
        $("#invalidDesc").html("");
    }

    if(moodId != null && moodDesc != ""){

        if($("#mood-toggle").attr("class") == "hide-toggle"){
            $("#mood-toggle").addClass("show-toggle");
            $("#mood-toggle").html("Show Options");
            $("#mood-toggle").removeClass("hide-toggle");
            $(".add-mood").slideUp(1000);
}
        addMood(moodId, moodDesc);
        $(".add-mood").slideUp(1000);
    }

});

function addMood(idMood, descMood) { // menambahkan mood

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    const divFlexStart = document.createElement("div");
    divFlexStart.className = "container-flex-start";

    const divImage = document.createElement("div");
    divImage.className = "mood-icon";
    divImage.style.content = `url('image/mood/${idMood}-picked.png')`;
    divImage.style.marginRight = "8px";

    const divText = document.createElement("div");
    const textDate = document.createElement("p");
    textDate.innerHTML = today;
    const textMood = document.createElement("p");
    textMood.innerHTML = idMood.toUpperCase();
    const textDescription = document.createElement("p");
    textDescription.innerHTML = descMood;
    divText.appendChild(textDate);
    divText.appendChild(textMood);
    divText.appendChild(textDescription);
  
    divFlexStart.appendChild(divImage);
    divFlexStart.appendChild(divText);
  
    const currentDiv = document.getElementById("mood-list");
    document.body.insertBefore(divFlexStart, currentDiv);

}