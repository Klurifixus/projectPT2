document.addEventListener("DOMContentLoaded", function() {

    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const resetBtn = document.getElementById('reset-btn');
    const workMin = document.getElementById('work-length');
    const breakMin = document.getElementById('break-length');
    const minutes = document.getElementById('minutes');
    const seconds = document.getElementById('seconds');
    const bminutes = document.getElementById('bminutes');
    const bseconds = document.getElementById('bseconds');
    const challengeBtn = document.getElementById('challenge-btn');
    const exerciseLabel = document.getElementById('exerciseLabel');
    const exercises = ["Push-ups", "Squats", "Lunges", "Planks", "Jumping Jacks"];
    let startTimer = undefined;
    let currentCycle = 1;
    let challengeTimeout;

    // Create a new Audio object for the alarm sound
    let alarmSound1 = new Audio('assets/sounds/battle_horn_1-6931.mp3');
    let alarmSound2 = new Audio('assets/sounds/tadaa-47995.mp3');

    // -------FUNCTIONS---------

    // SET TIMEOUT LOGIC
    function setTimeoutLogic() {
        document.getElementById('cycles').innerText++;
        currentCycle++;
        if (currentCycle <= exercises.length) {
            startTrainingChallenge();
        } else {
            stopInterval();
            startTimer = undefined;
            currentCycle = 1;
            minutes.innerText = workMin.value;
            bminutes.innerText = breakMin.value;
            bseconds.innerText = "00";
            document.getElementById('banderoll-container').style.display = 'none';
            exerciseLabel.innerText = ":";
            exerciseLabel.classList.remove('active-challenge');
            document.body.classList.remove('active-challenge');
        }
    }

    // FUNCTION TIMER
    function timer() {
        if (minutes.innerText != 0 || seconds.innerText != 0) {
            document.querySelector('.timer').classList.add('active-timer');
            document.querySelector('.break-timer').classList.remove('active-timer');

            // Work timer
            if (seconds.innerText != 0) {
                seconds.innerText--;
            } else if (minutes.innerText != 0 && seconds.innerText == 0) {
                seconds.innerText = 59;
                minutes.innerText--;
            }

            // Play alarm sound when work time is over and break starts
            if (minutes.innerText == 0 && seconds.innerText == 0 && bminutes.innerText == "0" && bseconds.innerText == "30") {
                alarmSound2.play();
            }

        } else {
            document.querySelector('.break-timer').classList.add('active-timer');
            document.querySelector('.timer').classList.remove('active-timer');

            // Break timer
            if (bseconds.innerText != 0) {
                bseconds.innerText--;
            } else if (bminutes.innerText != 0 && bseconds.innerText == 0) {
                bseconds.innerText = 59;
                bminutes.innerText--;
            }

            // Play alarm sound when break time is over
            if (bminutes.innerText == 0 && bseconds.innerText == 0) {
                alarmSound1.play();
                minutes.innerText = workMin.value;
                seconds.innerText = "00";
                bminutes.innerText = breakMin.value;
                bseconds.innerText = "02";
                document.getElementById('cycles').innerText++;
            }
        }
    }

    // FUNCTION STOP INTERVAL        
    function stopInterval() {
        clearInterval(startTimer);
        startTimer = undefined;
    }

    // START TRAINING
    function startTrainingChallenge() {
        document.body.classList.add('active-challenge');
        document.getElementById('exerciseLabel').style.display = 'block';
        exerciseLabel.innerText = `${exercises[currentCycle - 1]}`;
        exerciseLabel.classList.add('active-challenge');
        challengeBtn.disabled = true;

        minutes.innerText = 3;
        seconds.innerText = "00";

        bminutes.innerText = 0;
        bseconds.innerText = "30";

        if (!startTimer) {
            startTimer = setInterval(timer, 1000);
        
            if (!challengeTimeout){
                challengeTimeout = (setTimeoutLogic, 180000);
            }
        }
        
    }

    // STOP TRAINING
    function stopTrainingChallenge() {
        clearInterval(startTimer);
        clearTimeout(challengeTimeout);
        document.getElementById('exerciseLabel').style.display = 'block';
        startTimer = undefined;
        document.body.classList.remove('active-challenge');
        exerciseLabel.innerText = ":";
        exerciseLabel.classList.remove('active-challenge');
        challengeBtn.disabled = false;
    }

    // EVENTLISTENERS

    // CHALLENGE-BUTTON FOR PLAY
    challengeBtn.addEventListener('click', function() {
        startTrainingChallenge();
    });

    // START-BUTTON FOR PLAY
    startBtn.addEventListener('click', function() {
        if (startTimer === undefined) {
            startTimer = setInterval(timer, 1000);
        }
    });

    // STOP-BUTTON FOR STOP 
    stopBtn.addEventListener('click', function() {
        stopTrainingChallenge();
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
        clearInterval(startTimer);
        startTimer = undefined;
    });

    // Event listeners for input 
    workMin.addEventListener('input', function() {
        minutes.innerText = workMin.value;
        seconds.innerText = "00";
    });

    breakMin.addEventListener('input', function() {
        bminutes.innerText = breakMin.value;
        bseconds.innerText = "02";
    });

    let isMuted = false;
    let muteBtn = document.getElementById('mute-btn');
    muteBtn.addEventListener('click', function() {
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

    // LOAD SOUND
    alarmSound1.load();
    alarmSound2.load();

});