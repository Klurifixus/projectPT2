document.addEventListener("DOMContentLoaded", function() {
    // DOM elements
    let startBtn = document.getElementById('start-btn');
    let stopBtn = document.getElementById('stop-btn');
    let resetBtn = document.getElementById('reset-btn');
    let workMin = document.getElementById('work-length');
    let breakMin = document.getElementById('break-length');
    let minutes = document.getElementById('minutes');
    let seconds = document.getElementById('seconds');
    let bminutes = document.getElementById('bminutes');
    let bseconds = document.getElementById('bseconds');
    let challengeBtn = document.getElementById('challenge-btn');
    let exerciseLabel = document.getElementById('exercise-label');
    
    // Audio elements
    let alarmSound1 = new Audio('assets/sounds/battle_horn_1-6931.mp3');
    let alarmSound2 = new Audio('assets/sounds/tadaa-47995.mp3');
    
    // Variables
    let startTimer;
    let currentCycle = 1;
    let exercises = ['PUSH-UPS', 'SIT-UPS', 'SQUATS', 'SIT-UPS', 'PUSH-UPS'];
    let isMuted = false;

    // Initialize state
    exerciseLabel.style.display = 'none';
    alarmSound1.load();
    alarmSound2.load();

    // Start training challenge
    function startTrainingChallenge() {
        document.getElementById('banderoll-container').style.display = 'block';
        exerciseLabel.style.display = 'block';
        exerciseLabel.innerText = `DO: ${exercises[currentCycle - 1]}`;
        minutes.innerText = 3;
        seconds.innerText = "00";
        bminutes.innerText = 0;
        bseconds.innerText = 30;
        
        if (!startTimer) {
            startTimer = setInterval(timer, 1000);
        }

        setTimeout(() => {
            document.getElementById('cycles').innerText++;
            currentCycle++;
            if (currentCycle <= 5) {
                startTrainingChallenge();
            } else {
                resetTimer();
            }
        }, 180000);
    }

    // Main timer function
    function timer() {
        // Handle work timer countdown
        if (seconds.innerText !== 0) {
            seconds.innerText--;
        } else if (minutes.innerText !== 0 && seconds.innerText == 0) {
            seconds.innerText = 59;
            minutes.innerText--;
        }

        // Play sound at work-end
        if (minutes.innerText == 0 && seconds.innerText == 0 && bminutes.innerText == "0" && bseconds.innerText == "30") {
            alarmSound2.play();
        }

        // Handle break timer countdown
        if (minutes.innerText == 0 && seconds.innerText == 0) {
            if (bseconds.innerText !== 0) {
                bseconds.innerText--;
            } else if (bminutes.innerText !== 0 && bseconds.innerText == 0) {
                bseconds.innerText = 59;
                bminutes.innerText--;
            }
        }

        // Play sound at break-end and reset timers
        if (minutes.innerText == 0 && seconds.innerText == 0 && bminutes.innerText == 0 && bseconds.innerText == 0) {
            alarmSound1.play();
            resetTimers();
        }
    }

    // Stop and clear timer
    function stopInterval() {
        clearInterval(startTimer);
        startTimer = undefined;
    }

    // Reset timers and state
    function resetTimer() {
        stopInterval();
        currentCycle = 1;
        minutes.innerText = workMin.value;
        seconds.innerText = "00";
        bminutes.innerText = breakMin.value;
        bseconds.innerText = "00";
        document.getElementById('banderoll-container').style.display = 'none';
        exerciseLabel.style.display = 'none';
    }

    // Event listeners
    challengeBtn.addEventListener('click', startTrainingChallenge);
    startBtn.addEventListener('click', () => { if (!startTimer) startTimer = setInterval(timer, 1000); });
    stopBtn.addEventListener('click', stopInterval);
    resetBtn.addEventListener('click', resetTimer);

    workMin.addEventListener('input', () => {
        minutes.innerText = workMin.value;
        seconds.innerText = "00";
    });

    breakMin.addEventListener('input', () => {
        bminutes.innerText = breakMin.value;
        bseconds.innerText = "00";
    });

    document.getElementById('mute-btn').addEventListener('click', function() {
        isMuted = !isMuted;
        if (isMuted) {
            this.innerHTML = '<i class="fas fa-volume-mute"></i>';
            alarmSound1.muted = true;
            alarmSound2.muted = true;
        } else {
            this.innerHTML = '<i class="fas fa-volume-up"></i>';
            alarmSound1.muted = false;
            alarmSound2.muted = false;
        }
    });
});
