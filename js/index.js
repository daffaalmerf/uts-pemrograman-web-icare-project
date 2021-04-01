var hamburgerClicked = false;
var currentQuote = 0;
var quotes = ["quote-1", "quote-2", "quote-3"];

const clickHamburger = document.querySelector('.hamburger input');
const navList = document.querySelector('nav ul');

clickHamburger.addEventListener('click', function() { // toggle hamburger
    navList.classList.toggle('slide');
});

$(".next-right").click(function() { // quote selanjutnya
    fadeNextQuote();
})

$(".next-left").click(function() { // quote sebelumnya
    fadePrevQuote();
});

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