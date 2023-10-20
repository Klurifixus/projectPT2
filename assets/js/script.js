let start = document.getElementById('start-btn');
let pause = document.getElementById('stop-btn');
let reset = document.getElementById('reset-btn');
let mute = document.getElementById('mute-btn');

let minutes = document.getElementById('minutes');
let seconds = document.getElementById('seconds');
let bminutes = document.getElementById('bminutes');
let bseconds = document.getElementById('bseconds');

let workMinutesInput = document.getElementById('work-minutes');
let workSecondsInput = document.getElementById('work-seconds');
let breakMinutesInput = document.getElementById('break-minutes');
let breakSecondsInput = document.getElementById('break-seconds');


// Reference to timer variable
let startTimer;
let isMuted = false;

//start button
start.addEventListener('click', function () {
    if (startTimer === undefined) {
        startTimer = setInterval(timer, 1000);
    } else {
        alert("Timer is already running.");
    }
});

//stop (pause)button
pause.addEventListener('click', function (){
    clearInterval(startTimer);
    startTimer = undefined;
})

//reset button
reset.addEventListener('click', function () {
    clearInterval(startTimer);
    startTimer = undefined;
    minutes.innerText = "25";
    seconds.innerText = "00";
    bminutes.innerText = "5";
    bseconds.innerText = "00";
    isMuted = false;
    cycleCount = parseInt(document.getElementById('cycles').value); // Reset cycle count
    document.getElementById('counter').innerText = "0"; // Reset completed cycles
});

// mute button
mute.addEventListener('click', function (){
    if (ismuted) {
        isMuted = false;
    } else {
        isMuted = true;
    }
})

let cyclesCount =1;

function timer() {
    // Work timer
    if (minutes.innerText != 0 || seconds.innerText != 0) {
        if (seconds.innerText == 0) {
            seconds.innerText = 59;
            minutes.innerText--;
        } else {
            seconds.innerText--;
        }
    } else if (bminutes.innerText != 0 || bseconds.innerText != 0) {
        // Break timer
        if (bseconds.innerText == 0) {
            bseconds.innerText = 59;
            bminutes.innerText--;
        } else {
            bseconds.innerText--;
        }
    }
    


    // When both timers reach 0
    if (minutes.innerText == 0 && seconds.innerText == 0 && bminutes.innerText == 0 && bseconds.innerText == 0) {
        document.getElementById('cycles').innerText++;
        if (document.getElementById('cycles').innerText >= cycleCount) {
            // Stop the timer when the  cycles is ending in number
            clearInterval(startTimer);
            startTimer = undefined;
        } else {
            updateDisplayedTime(minutes, seconds, workMinutesInput.value, workSecondsInput.value);
            updateDisplayedTime(bminutes, bseconds, breakMinutesInput.value, breakSecondsInput.value);
        }
    }
}
function updateDisplayedTime(minutesDisplay, secondsDisplay, newMinutes, newSeconds) {
    minutesDisplay.innerText = newMinutes;
    secondsDisplay.innerText = newSeconds;
}
workMinutesInput.addEventListener('input', function () {
    updateDisplayedTime(minutes, seconds, workMinutesInput.value, workSecondsInput.value);
});

workSecondsInput.addEventListener('input', function () {
    updateDisplayedTime(minutes, seconds, workMinutesInput.value, workSecondsInput.value);
});

breakMinutesInput.addEventListener('input', function () {
    updateDisplayedTime(bminutes, bseconds, breakMinutesInput.value, breakSecondsInput.value);
});

breakSecondsInput.addEventListener('input', function () {
    updateDisplayedTime(bminutes, bseconds, breakMinutesInput.value, breakSecondsInput.value);
});


