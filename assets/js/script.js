/*jshint esversion: 6*/
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
let cyclesDisplay = document.getElementById('cycles')

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
})

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
    
    cyclesDisplay.classList.add("pulse-green");
    setTimeout(() => {
        cyclesDisplay.classList.remove("pulse-green");
    }, 1000);   
});

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


function timer() {
    activeTimerPulse();
    if (parseInt(minutes.innerText) !== 0 || parseInt(seconds.innerText) !== 0) {
        // Work timer
        if (parseInt(seconds.innerText) === 0) {
            seconds.innerText = "59";
            minutes.innerText = (parseInt(minutes.innerText) - 1).toString();
        } else {
            seconds.innerText = (parseInt(seconds.innerText) - 1).toString();
        }
    } else if (parseInt(bminutes.innerText) !== 0 || parseInt(bseconds.innerText) !== 0) {
        // Break timer
        if (parseInt(bseconds.innerText) === 0) {
            bseconds.innerText = "59";
            bminutes.innerText = (parseInt(bminutes.innerText) - 1).toString();
        } else {
            bseconds.innerText = (parseInt(bseconds.innerText) - 1).toString();
        }
    }
    

    


    // When both timers reach 0 (timer-section)
    if (minutes.innerText == 0 && seconds.innerText == 0 && bminutes.innerText == 0 && bseconds.innerText == 0) {
        if (cyclesCount > 0){
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
        if (minutes.innerText == "00" && seconds.innerText == "00" && bminutes.innerText == "00" && bseconds.innerText == "00") {
            cyclesDisplay.classList.add("pulse-green");
            setTimeout(() => {
                cyclesDisplay.classList.remove("pulse-green");
            }, 1000);

        }
    }
}

    // active timer pulse
    function activeTimerPulse() {
        if (parseInt(minutes.innerText) !== 0 || parseInt(seconds.innerText) !== 0) {
            if (!minutes.classList.contains("pulse-green")) {
                minutes.classList.add("pulse-green");
                seconds.classList.add("pulse-green");
            }
            bminutes.classList.remove("pulse-green");
            bseconds.classList.remove("pulse-green");
        } else {
            if (!bminutes.classList.contains("pulse-green")) {
                bminutes.classList.add("pulse-green");
                bseconds.classList.add("pulse-green");
            }
            minutes.classList.remove("pulse-green");
            seconds.classList.remove("pulse-green");
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


