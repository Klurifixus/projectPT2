let startBtn = document.getElementById('start-btn');
let stopBtn = document.getElementById('stop-btn');
let resetBtn = document.getElementById('reset-btn');

let workMin = document.getElementById('work-length');
let breakMin = document.getElementById('break-length');

let minutes = document.getElementById('minutes');
let seconds = document.getElementById('seconds');
let bminutes = document.getElementById('bminutes');
let bseconds = document.getElementById('bseconds');

//timer variable reference
let startTimer;

startBtn.addEventListener('click', function(){
    if(startTimer === undefined){
        startTimer = setInterval(timer, 1000);
    } else {
        alert("Timer is already running");
    }
});

stopBtn.addEventListener('click', function(){
    stopInterval();
    startTimer = undefined;
});

resetBtn.addEventListener('click', function() {
    minutes.innerText = workMin.value;
    seconds.innerText = "00";

    bminutes.innerText = breakMin.value;
    bseconds.innerText = "00";
    document.getElementById('cycles').innerText = 0;
    stopInterval();
    startTimer = undefined;
});

function timer(){
    //work timer
    if(seconds.innerText != 0){
        seconds.innerText--;
    } else if(minutes.innerText != 0 && seconds.innerText == 0){
        seconds.innerText = 59;
        minutes.innerText--;
    }

    //break timer
    if(minutes.innerText == 0 && seconds.innerText == 0){
        if(bseconds.innerText != 0){
            bseconds.innerText--;
        } else if(bminutes.innerText != 0 && bseconds.innerText == 0){
            bseconds.innerText = 59;
            bminutes.innerText--;
        }
    }  
    
    //cycle timer
    if(minutes.innerText == 0 && seconds.innerText == 0 && bminutes.innerText == 0 && bseconds.innerText == 0){
        minutes.innerText = workMin.value;
        seconds.innerText = "00";
        bminutes.innerText = breakMin.value;
        bseconds.innerText = "00";
        document.getElementById('cycles').innerText++;
    }
}

//stop timer
function stopInterval(){
    clearInterval(startTimer);
}

// event listeners input 
workMin.addEventListener('input', function() {
    minutes.innerText = workMin.value;
    seconds.innerText = "00";
});

breakMin.addEventListener('input', function() {
    bminutes.innerText = breakMin.value;
    bseconds.innerText = "00";
});
