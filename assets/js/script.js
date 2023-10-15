let startBtn = document.getElementById('start-btn');
let stopBtn = document.getElementById('stop-btn');
let resetBtn = document.getElementById('reset-btn');

let workMin = document.getElementById('work-length');
let breakMin = document.getElementById('break-length');

let minutes = document.getElementById('minutes');
let seconds = document.getElementById('seconds');
let bminutes = document.getElementById('bminutes');
let bseconds = document.getElementById('bseconds');

//training challange
let challengeBtn = document.getElementById('challenge-btn');
let currentCycle = 1;
let breakSeconds =30;
let exerciseLabel= document.getElementById('exercise-label');
let exercises = ['PUSH-UPS', 'SIT-UPS', 'SQUATS', 'SIT-UPS', 'PUSH-UPS'];
function startTrainingChallenge(){
    //label mode
    document.getElementById('banderoll-container').style.display = 'block';
    exerciseLabel.innerText = `DO: ${exercises[currentCycle - 1]}`;
    //sets minutes
    minutes.innerText = 3;
    seconds.innerText = "00";
    //break timer
    bminutes.innerText = 0;
    bseconds.innerText = 30;
    if (startTimer === undefined) {
        startTimer = setInterval(timer, 1000);
    } 
    //loop sets 5times
    setTimeout(() => {
        document.getElementById('cycles').innerText++;
        currentCycle++;
        if (currentCycle <= 5){
            startTrainingChallenge();
        } else{
            stopInterval();
            startTimer = undefined;
            currentCycle = 1;
            minutes.innerText = workMin.value;
            bseconds.innertext = "00";
            bminutes.innerText = breakMin.value;
            bseconds.innerText = "00";
            document.getElementById('banderoll-container').style.display = 'none';

        }
    }, 180000);
}

challengeBtn.addEventListener('click', function(){
    startTrainingChallenge();
});

// Create a new Audio object for the alarm sound
let alarmSound1 = new Audio('assets/sounds/battle_horn_1-6931.mp3');
alarmSound1.load();
let alarmSound2 = new Audio('assets/sounds/tadaa-47995.mp3');
alarmSound2.load();
// Timer variable reference
let startTimer;

startBtn.addEventListener('click', function(){
    if(startTimer === undefined){
        startTimer = setInterval(timer, 1000);
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

function timer() {
    // Work timer
    if(seconds.innerText != 0) {
        seconds.innerText--;
    } else if(minutes.innerText != 0 && seconds.innerText == 0) {
        seconds.innerText = 59;
        minutes.innerText--;
    }

    // Play alarm sound when work time is over and break starts
        if(minutes.innerText == 0 && seconds.innerText == 0 && bminutes.innerText == "0" && bseconds.innerText == "30") {
            alarmSound2.play();
        }
    }

    // Break timer
    if(minutes.innerText == 0 && seconds.innerText == 0) {
        if(bseconds.innerText != 0) {
            bseconds.innerText--;
        } else if(bminutes.innerText != 0 && bseconds.innerText == 0) {
            bseconds.innerText = 59;
            bminutes.innerText--;
        }
    }


    // Play alarm sound when break time is over
    if(minutes.innerText == 0 && seconds.innerText == 0 && bminutes.innerText == 0 && bseconds.innerText == 0) {
        alarmSound1.play();
        minutes.innerText = workMin.value;
        seconds.innerText = "00";
        bminutes.innerText = breakMin.value;
        bseconds.innerText = "00";
        document.getElementById('cycles').innerText++;
    }


function stopInterval() {
    clearInterval(startTimer);
}

// Event listeners for input 
workMin.addEventListener('input', function() {
    minutes.innerText = workMin.value;
    seconds.innerText = "00";
});

breakMin.addEventListener('input', function() {
    bminutes.innerText = breakMin.value;
    bseconds.innerText = "00";
});

let isMuted = false; // 

let muteBtn = document.getElementById('mute-btn');
muteBtn.addEventListener('click', 

function() {
    isMuted = !isMuted; // toggle the mute state

    if (isMuted) {
        // Change the icon to muted
        muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';

        // Mute the sounds
        alarmSound1.muted = true;
        alarmSound2.muted = true;
    } else {
        // Change the icon to sound-on
        muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';

        // Unmute the sounds
        alarmSound1.muted = false;
        alarmSound2.muted = false;
    }
});