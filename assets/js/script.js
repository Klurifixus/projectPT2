document.addEventListener("DOMContentLoaded", function(){
    let startBtn = document.getElementById('start-btn');
    let stopBtn = document.getElementById('stop-btn');
    let resetBtn = document.getElementById('reset-btn');

    let workMin = document.getElementById('work-length');
    let breakMin = document.getElementById('break-length');

    let minutes = document.getElementById('minutes');
    let seconds = document.getElementById('seconds');
    let bminutes = document.getElementById('bminutes');
    let bseconds = document.getElementById('bseconds');

    //training challenge
    let challengeBtn = document.getElementById('challenge-btn');
    let exerciseLabel= document.getElementById('exerciseLabel');
    let exercises = ["Push-ups", "Squats", "Lunges", "Planks", "Jumping Jacks"];
    let currentCycle = 1;
    let breakSeconds = 30;
    let challengeTimeout;
    
    

    function startTrainingChallenge() {
        // Activate red screen and pulsing label
        document.body.classList.add('active-challenge');
        document.getElementById('exerciseLabel').style.display = 'block';
        exerciseLabel.innerText = `${exercises[currentCycle - 1]}`;
        exerciseLabel.classList.add('active-challenge');
        challengeBtn.disabled = true;
        // Start the work timer
        minutes.innerText = 3;
        seconds.innerText = "00";

        // Reset the break timer
        bminutes.innerText = 0;
        bseconds.innerText = "30";

        if (!startTimer) {
            startTimer = setInterval(timer, 1000);
        }

        setTimeout(() => {
            document.getElementById('cycles').innerText++;
            currentCycle++;
            if (currentCycle <= exercises.length) {
                startTrainingChallenge();
            } else {
                stopInterval();
                startTimer = undefined;
                currentCycle = 1;
                minutes.innerText = workMin.value;
                bseconds.innerText = "00";
                bminutes.innerText = breakMin.value;
                bseconds.innerText = "00";
                document.getElementById('banderoll-container').style.display = 'none';
                exerciseLabel.innerText = ":";
                exerciseLabel.classList.remove('active-challenge');
                document.body.classList.remove('active-challenge');
            }
        }, 180000);
    }



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
    
    //   stop button for training mode
    stopBtn.addEventListener('click', function(){
        stopTrainingChallenge();
    });
    
    


    challengeBtn.addEventListener('click', function() {
        startTrainingChallenge();
    });

    // Create a new Audio object for the alarm sound
    let alarmSound1 = new Audio('assets/sounds/battle_horn_1-6931.mp3');
    alarmSound1.load();
    let alarmSound2 = new Audio('assets/sounds/tadaa-47995.mp3');
    alarmSound2.load();

    // Timer variable reference
    let startTimer = undefined;

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
        clearInterval(startTimer);
        startTimer = undefined;
    });

    function timer() {
        if(minutes.innerText != 0 || seconds.innerText != 0) {
            document.querySelector('.timer').classList.add('active-timer');
            document.querySelector('.break-timer').classList.remove('active-timer');
        } else {
            document.querySelector('.break-timer').classList.add('active-timer');
            document.querySelector('.timer').classList.remove('active-timer');
        }
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
            bseconds.innerText = "02";
            document.getElementById('cycles').innerText++;
        }
    }

    function stopInterval() {
        clearInterval(startTimer);
        startTimer = undefined;
    }

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
});
