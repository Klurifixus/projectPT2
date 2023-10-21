/*jshint esversion: 6*/
//Project based on Youtube video (link in readme)
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
let cyclesInput = document.getElementById('input-cycles');
let cyclesDisplay = document.getElementById('cycles');

// Reference to timer variable
let startTimer;
let isMuted = false;
let cyclesCount = 1;

//audio
let soundEffect = new Audio('assets/sounds/battle_horn_1-6931.mp3');

//To show/Hide timer settings
let timerSetting = document.querySelector('.session-length-controls');
let btnTimerSetting = document.getElementById('timer-set');

//cycles 
cyclesInput.addEventListener('input', function (){
    cyclesCount = parseInt(cyclesInput.value); 
    cyclesDisplay.innerText = cyclesCount;
    cyclesDisplay.classList.add("pulse-green");
    setTimeout(() => {
        cyclesDisplay.classList.remove("pulse-green");
    }, 1000);
});
//start button
start.addEventListener('click', function () {
    if (!isMuted){
        soundEffect.play();
    }
    if (startTimer === undefined) {
        startTimer = setInterval(timer, 1000);
    } 
});

//stop (pause)button
pause.addEventListener('click', function (){
    clearInterval(startTimer);
    startTimer = undefined;
});

//reset button
reset.addEventListener('click', function () {
    clearInterval(startTimer);
    startTimer = undefined;

    //reset timer display
    updateDisplayedTime(minutes, seconds, "25", "00");
    updateDisplayedTime(bminutes, bseconds, "5", "00");

    //reset controls
    cyclesDisplay.innerText = "0";
    cyclesInput.value = "0";
    workMinutesInput.value = "25";
    workSecondsInput.value = "00";
    breakMinutesInput.value = "5";
    breakSecondsInput.value = "00";
    isMuted = false;

    minutes.classList.remove("pulse-green");
    seconds.classList.remove("pulse-green");
    bminutes.classList.remove("pulse-green");
    bseconds.classList.remove("pulse-green");
    
    cyclesDisplay.classList.add("pulse-green");
    setTimeout(() => {
        cyclesDisplay.classList.remove("pulse-green");
    }, 1000);   
});

//bugfix non value
function validateInput(inputValue, defaultValue) {
    if (isNaN(parseInt(inputValue)) || inputValue.trim() === "") {
        return defaultValue;
    } else {
        return inputValue;
    }
}

// mute button
mute.addEventListener('click', function (){
    if (isMuted) {
        isMuted = false;
        mute.classList.remove("pulse-red");
    } else {
        isMuted = true;
        mute.classList.add("pulse-red");
    }
});


//Hide/show timer settings
btnTimerSetting.onclick = function () {
    if (timerSetting.style.display == "none") {
        timerSetting.style.display = "block";
    } else {
        timerSetting.style.display = "none";
    }
};

let isBreak = false;

function timer() {
    activeTimerPulse();
    
    if (!isBreak && parseInt(minutes.innerText) === 0 && parseInt(seconds.innerText) === 0) {
        transitionToBreak();
        return;
    }

    if (isBreak && parseInt(bminutes.innerText) === 0 && parseInt(bseconds.innerText) === 0) {
        transitionFromBreak();
        return;
    }

    decreaseTime();
}

function transitionToBreak() {
    if (!isMuted) {
        soundEffect.currentTime = 0;
        soundEffect.play();
    }
    isBreak = true;
}

function transitionFromBreak() {
    if (!isMuted) {
        soundEffect.currentTime = 0;
        soundEffect.play();
    }
    isBreak = false;

    if (cyclesCount > 0) {
        cyclesCount--;
        cyclesDisplay.innerText = cyclesCount;
        
        if (cyclesCount <= 0) {
            clearInterval(startTimer);
            startTimer = undefined;
            alert("All cycles complete!");
        } else {
            updateDisplayedTime(minutes, seconds, workMinutesInput.value, workSecondsInput.value);
            updateDisplayedTime(bminutes, bseconds, breakMinutesInput.value, breakSecondsInput.value);
        }
    }
}

function decreaseTime() {
    if (!isBreak) {
        if (parseInt(seconds.innerText) === 0) {
            seconds.innerText = "59";
            minutes.innerText = (parseInt(minutes.innerText) - 1).toString();
        } else {
            seconds.innerText = (parseInt(seconds.innerText) - 1).toString();
        }
    } else {
        if (parseInt(bseconds.innerText) === 0) {
            bseconds.innerText = "59";
            bminutes.innerText = (parseInt(bminutes.innerText) - 1).toString();
        } else {
            bseconds.innerText = (parseInt(bseconds.innerText) - 1).toString();
        }
    }
}

function activeTimerPulse() {
    if (!isBreak) {
        minutes.classList.add("pulse-green");
        seconds.classList.add("pulse-green");
        bminutes.classList.remove("pulse-green");
        bseconds.classList.remove("pulse-green");
    } else {
        bminutes.classList.add("pulse-green");
        bseconds.classList.add("pulse-green");
        minutes.classList.remove("pulse-green");
        seconds.classList.remove("pulse-green");
    }
}

function updateDisplayedTime(minutesDisplay, secondsDisplay, newMinutes, newSeconds) {
    minutesDisplay.innerText = newMinutes;
    secondsDisplay.innerText = newSeconds;
}
workMinutesInput.addEventListener('input', function () {
    let validatedMinutes = validateInput(workMinutesInput.value, "25");
    let validatedSeconds = validateInput(workSecondsInput.value, "00");
    updateDisplayedTime(minutes, seconds, validatedMinutes, validatedSeconds);
});

workSecondsInput.addEventListener('input', function () {
    let validatedMinutes = validateInput(workMinutesInput.value, "25");
    let validatedSeconds = validateInput(workSecondsInput.value, "00");
    updateDisplayedTime(minutes, seconds, validatedMinutes, validatedSeconds);
});

breakMinutesInput.addEventListener('input', function () {
    let validatedMinutes = validateInput(breakMinutesInput.value, "5");
    let validatedSeconds = validateInput(breakSecondsInput.value, "00");
    updateDisplayedTime(bminutes, bseconds, validatedMinutes, validatedSeconds);
});

breakSecondsInput.addEventListener('input', function () {
    let validatedMinutes = validateInput(breakMinutesInput.value, "5");
    let validatedSeconds = validateInput(breakSecondsInput.value, "00");
    updateDisplayedTime(bminutes, bseconds, validatedMinutes, validatedSeconds);
});

cyclesInput.addEventListener('input', function () {
    let validatedCycles = validateInput(cyclesInput.value, "0");
    cyclesCount = parseInt(validatedCycles); 
    cyclesDisplay.innerText = validatedCycles;
    cyclesDisplay.classList.add("pulse-green");
    setTimeout(() => {
        cyclesDisplay.classList.remove("pulse-green");
    }, 1000);
});


