var currentQuote = 0;

var quotes = ["quote-1", "quote-2", "quote-3"];

$(".next-right").click(function() {
    fadeNextQuote();
})
 // aku break bentar wkwk, ari kalo mau bantu buat responsif
 // boleh banget
 // css ne yg mn?
 // ada di folderr
 // kalau cara buka jadi webnya bisa kah?
 // coba ss ke wa cik, tampilan ari gimana
 // ari udah install extension live server belom?
 // kalo belom, install dulu
 // udah
 // ohh iniiii, di shared servers, pilih live server
 // nah nampil webnya
 // okeee sok lanjutin
$(".next-left").click(function() {
    fadePrevQuote();
})

function fadeNextQuote(){
    $("#" + quotes[currentQuote]).fadeOut(500);
    setTimeout(() => {
        if(currentQuote === 2){
            currentQuote = 0;
        } else {
            currentQuote += 1;
        }
        $("#" + quotes[currentQuote]).fadeIn(500);
    }, 500)
    console.log(currentQuote);
}

function fadePrevQuote(){
    $("#" + quotes[currentQuote]).fadeOut(500);
    setTimeout(() => {
        if(currentQuote === 0){
            currentQuote = 2;
        } else {
            currentQuote -= 1;
        }
        $("#" + quotes[currentQuote]).fadeIn(500);
    }, 500);
    console.log(currentQuote);
}