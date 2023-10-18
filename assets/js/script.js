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
    const exerciseDropdown = document.getElementById('exercise-dropdown');
    const exerciseReps = document.getElementById('exercise-reps');
    const addExerciseBtn = document.getElementById('add-exercise-btn');
    const exerciseList = document.getElementById('exercise-list');
    let exercises = [];
    let startTimer;
    let workTimeOver = false;
    let currentExerciseIndex = 0;
    //let currentCycle = 1;
    //let breakSeconds =30;
    //let challengeTimeout;

    //Audio for the alarm sound
    let alarmSound1 = new Audio('assets/sounds/battle_horn_1-6931.mp3');
    let alarmSound2 = new Audio('assets/sounds/tadaa-47995.mp3');

    //added excersise to list
    addExerciseBtn.addEventListener('click', function() {
        const exercise = exerciseDropdown.value;
        const reps = exerciseReps.value;

        if (reps && exercise){
            exercises.push(`${exercise} - ${reps} reps`);
            displayExercise();
            exerciseReps.value = '';
        }
    })

    function displayExercise(){
        exerciseList.innerHTML = '';
        exercises.forEach((exercise, index) => {
            const exerciseItem = document.createElement('div');
            exerciseItem.textContent = exercise;
            exerciseList.appendChild(exerciseItem);
        });
    }

    // -------FUNCTIONS---------

    // SET TIMEOUT LOGIC
    function setTimeoutLogic() {
        document.getElementById('cycles').innerText++;
        stopTrainingChallenge();
        currentCycle++;
        if (currentCycle <= exercises.length) {
            startTrainingChallenge();
        } else {
            endTraining();
        }
    } 

    function endTraining() {
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
        challengeBtn.disabled = false;
    }
            
    

    // FUNCTION TIMER
    function timer() {
        
        if (minutes.innerText != 0 || seconds.innerText != 0) {
            document.querySelector('.timer').classList.add('active-timer');
            document.querySelector('.break-timer').classList.remove('active-timer');
        if (bminutes.innerText == 0 && bseconds.innerText == 0) {
            alarmSound1.play();
            setTimeout(setTimeoutLogic, 1000);
        }    
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
                bseconds.innerText = "00";
                document.getElementById('cycles').innerText++;
            }
        }
        currentExerciseIndex++;
        if (currentExerciseIndex < exercises.length) {
            const nextExercise = exercises[currentExerciseIndex];
            console.log('Next Exercise: ${nextExercise}');
            
        } else {
            console.log('All Exercises Completed.');
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
        muteBtn.disabel = false;

        minutes.innerText = 3;
        seconds.innerText = "00";

        bminutes.innerText = 0;
        bseconds.innerText = "30";
        
        if (!startTimer) {
            startTimer = setInterval(timer, 1000);
        }
        
    }

    // STOP TRAINING
    function stopInterval() {
        clearInterval(startTimer);
        startTimer = undefined;
    }

    function stopTrainingChallenge() {
        clearInterval(startTimer);
        clearTimeout(challengeTimeout);
        document.getElementById('exerciseLabel').style.display = 'block';
        startTimer = undefined;
        muteBtn.disabel = false;
    }

    // EVENTLISTNERS
    challengeBtn.addEventListener('click', function() {
        challengeBtn.disabled = true; // Disable the challenge button when clicked
        startTrainingChallenge();
    });

    startBtn.addEventListener('click', function(){
        console.log("Start button clicked");
        if(startTimer === undefined){
            startTimer = setInterval(timer, 1000);
        } 
    });

    stopBtn.addEventListener('click', function(){
        console.log("Stop button clicked");
        stopTrainingChallenge();
        stopInterval();
        startTimer = undefined;
    });

    resetBtn.addEventListener('click', function() {
        console.log("Reset button clicked");
        minutes.innerText = workMin.value;
        seconds.innerText = "00";
        bminutes.innerText = breakMin.value;
        bseconds.innerText = "00";
        document.getElementById('cycles').innerText = 0;
        stopInterval();
        clearInterval(startTimer);
        startTimer = undefined;
    });

    workMin.addEventListener('input', function() {
        minutes.innerText = workMin.value;
        seconds.innerText = "00";
    });

    breakMin.addEventListener('input', function() {
        bminutes.innerText = breakMin.value;
        bseconds.innerText = "00";
    });

    //Mute options
    let isMuted = false;
    let muteBtn = document.getElementById('mute-btn');
    muteBtn.addEventListener('click', function() {
        isMuted = !isMuted; 
        if (isMuted) {
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            alarmSound1.muted = true;
            alarmSound2.muted = true;
        } else {
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            alarmSound1.muted = false;
            alarmSound2.muted = false;
        }
        if (document.body.classList.contains('active-challenge')) {
            muteBtn.disabled = true;
        }
    });

    // LOAD SOUND
    alarmSound1.load();
    alarmSound2.load();

});