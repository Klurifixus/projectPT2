let start = getElementById('start-btn');
let pause = getElementById('pause-btn');
let reset = getElementById('reset-btn');
let stop = getElementById('stop-btn');
let mute = getElementById('mute-btn');

let minutes = getElementById('minutes');
let seconds = getElementById('seconds');
let bminutes = getElementById('bminutes');
let bseconds = getElementById('bseconds');

// refernce to timer variabel
let startTimer;
start.addEventListner('click', function(){
    if (startTimer === undefined){
    startTimer = setInterval(timer, 1000)
}

})

function timer(){
    //worktimer
    if (seconds.innerText != 0){
        seconds.innerText--;
    } else if(minutes.innerText != 0 && seconds.innerText ==0){
        seconds.innerText = 59;
        minutes.innerText--;
    } //breaktimer
    if (bseconds.innerText != 0){
        bseconds.innerText--;
    } else if(bminutes.innerText != 0 && bseconds.innerText ==0){
        bseconds.innerText = 59;
        bminutes.innerText--;
    }
    if (minutes.innerText == 0 && seconds.innerText == 0 && bminutes.innerText == 0 && bseconds == 0){
        minutes.innerText == 25;
        seconds.innerText == "00";
        bminutes.innerText == 5;
        bseconds.innerText == "00";

        document.getElementById('counter').innerText++;


    }
}