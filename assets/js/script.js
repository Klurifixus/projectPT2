// Elements
const workLengthInput = document.getElementById('work-length');
const breakLengthInput = document.getElementById('break-length');
const trainingToggle = document.getElementById('training-toggle');
const exerciseInput = document.getElementById('exercise-dropdown');
const repsInput = document.getElementById('exercise-reps');
const addExerciseBtn = document.getElementById('add-exercise-btn');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');
const muteBtn = document.getElementById('mute-btn');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const bminutesDisplay = document.getElementById('bminutes');
const bsecondsDisplay = document.getElementById('bseconds');
const exerciseList = document.getElementById('exercise-list');
const cyclesDisplay = document.getElementById('cycles');
const trainingSection = document.getElementById('training-section');

// States
let workTimer = 25 * 60;
let breakTimer = 5 * 60;
let isTrainingMode = false;
let currentExerciseIndex = 0;
let remainingExerciseTime = 0;
let exercises = [];
let isSoundMuted = true;
let interval;

// Audio
const sound = new Audio('assets/sounds/battle_horn_1-6931.mp3');

function updateDOM() {
    const minutes = Math.floor(remainingExerciseTime / 60);
    const seconds = remainingExerciseTime % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');

    exerciseList.innerHTML = '';

    exercises.forEach((exercise, index) => {
        const li = document.createElement('li');
        if (index === currentExerciseIndex) {
            li.classList.add('active');
        }
        li.textContent = `${exercise.exercise} - ${exercise.duration / 60} min`;
        exerciseList.appendChild(li);
    });

    const breakMinutes = Math.floor(breakTimer / 60);
    const breakSeconds = breakTimer % 60;
    bminutesDisplay.textContent = breakMinutes.toString().padStart(2, '0');
    bsecondsDisplay.textContent = breakSeconds.toString().padStart(2, '0');

    cyclesDisplay.textContent = exercises.length;
}

function startTimer() {
    stopTimer();

    if (isTrainingMode && currentExerciseIndex < exercises.length) {
        remainingExerciseTime = exercises[currentExerciseIndex].duration;
    } else {
        remainingExerciseTime = workTimer;
    }

    updateDOM();

    interval = setInterval(function () {
        if (remainingExerciseTime <= 0) {
            if (!isSoundMuted) sound.play();
            if (currentExerciseIndex >= exercises.length){
                exercises = [];
                currentExerciseIndex = 0;
            }
            if (isTrainingMode) {
                currentExerciseIndex++;
                if (currentExerciseIndex < exercises.length) {
                    startTimer();
                } else {
                    remainingExerciseTime = breakTimer;
                    isTrainingMode = false;
                    updateDOM();
                }
            } else {
                isTrainingMode = !isTrainingMode;
                startTimer();
            }
        } else {
            isTrainingMode = false;
            remainingExerciseTime = breakTimer;
            remainingExerciseTime--;
            updateDOM();
        } 
        

    }, 1000);
}

function toggleTrainingMode() {
    isTrainingMode = !isTrainingMode;
    trainingSection.style.display = isTrainingMode ? "block" : "none";
    if (!isTrainingMode) exercises = [];
    updateDOM();
}

function addExercise(exercise, reps) {
    for (let i = 0; i < reps; i++) {
        exercises.push({ exercise, duration: workTimer });
    }
    updateDOM();
}

function stopTimer() {
    clearInterval(interval);
}

function resetTimer() {
    stopTimer();
    workTimer = 25 * 60;
    breakTimer = 5 * 60;
    currentExerciseIndex = 0;
    isTrainingMode = false;
    exercises = [];

    //Update worktime
    const minutes = Math.floor(workTimer / 60);
    const seconds = workTimer % 60;
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
    
    const breakMinutes = Math.floor(breakTimer / 60);
    const breakSeconds = breakTimer % 60;
    document.getElementById("bminutes").textContent = breakMinutes.toString().padStart(2, '0');
    document.getElementById("bseconds").textContent = breakSeconds.toString().padStart(2, '0');
    updateDOM();
}

function toggleSound() {
    isSoundMuted = !isSoundMuted;
    muteBtn.querySelector('i').classList.toggle('fas', isSoundMuted);
    muteBtn.querySelector('i').classList.toggle('fa-volume-mute', isSoundMuted);
    muteBtn.querySelector('i').classList.toggle('fa-volume-up', !isSoundMuted);
}

// Event Listeners
trainingToggle.addEventListener('click', toggleTrainingMode);

addExerciseBtn.addEventListener('click', function () {
    const exerciseName = exerciseInput.value;
    const reps = repsInput.value;
    if (exerciseName && reps) {
        addExercise(exerciseName, parseInt(reps));
    }
});

workLengthInput.addEventListener('input', function () {
    workTimer = parseInt(workLengthInput.value) * 60;
    updateDOM();
});

breakLengthInput.addEventListener('input', function () {
    breakTimer = parseInt(breakLengthInput.value) * 60;
    updateDOM();
});

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
muteBtn.addEventListener('click', toggleSound);
