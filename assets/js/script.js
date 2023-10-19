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
let isBreakTime = false;

// Audio
const sound = new Audio('assets/sounds/battle_horn_1-6931.mp3');

function updateDOM() {
    if (!isTrainingMode) {
        const minutes = Math.floor(remainingExerciseTime / 60);
        const seconds = remainingExerciseTime % 60;
        minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        secondsDisplay.textContent = seconds.toString().padStart(2, '0');
        exerciseList.innerHTML = '';
    }

    exercises.forEach((exercise, index) => {
        const li = document.createElement('li');
        if (index === currentExerciseIndex) {
            li.classList.add('active');
        }
        li.textContent = `${exercise.exercise} - ${exercise.duration / 60} min`;
        exerciseList.appendChild(li);
        cyclesDisplay.textContent = exercises.length;
        if (index === currentExerciseIndex) {
            li.classList.add('active', 'active-exercise');
        }
    });

    const breakMinutes = Math.floor(breakTimer / 60);
    const breakSeconds = breakTimer % 60;
    bminutesDisplay.textContent = breakMinutes.toString().padStart(2, '0');
    bsecondsDisplay.textContent = breakSeconds.toString().padStart(2, '0');
}

function startTimer() {
    stopTimer();
    minutesDisplay.parentElement.classList.add('active-timer');

    if (isTrainingMode && currentExerciseIndex < exercises.length) {
        remainingExerciseTime = exercises[currentExerciseIndex].duration;
    } else {
        if (isTrainingMode) {
            currentExerciseIndex = 0;
            exercises.splice(0, currentExerciseIndex);
            remainingExerciseTime = breakTimer;
        } else {
            remainingExerciseTime = workTimer;
        }
    }

    if (isTrainingMode) {
        bminutesDisplay.textContent = Math.floor(remainingExerciseTime / 60).toString().padStart(2, '0');
        bsecondsDisplay.textContent = (remainingExerciseTime % 60).toString().padStart(2, '0');
    } else {
        bminutesDisplay.textContent = Math.floor(breakTimer / 60).toString().padStart(2, '0');
        bsecondsDisplay.textContent = (breakTimer % 60).toString().padStart(2, '0');
    }

    updateDOM();

    interval = setInterval(function () {
        if (remainingExerciseTime <= 0) {
            if (!isSoundMuted) sound.play();

            if (isTrainingMode) {
                currentExerciseIndex++;

                if (currentExerciseIndex < exercises.length) {
                    remainingExerciseTime = exercises[currentExerciseIndex].duration;
                } else {
                    isTrainingMode = false;
                    currentExerciseIndex = 0;
                    exercises = [];
                    remainingExerciseTime = breakTimer;
                }

            } else {
                isTrainingMode = true;
                currentExerciseIndex = 0;
                breakTimer = parseInt(breakLengthInput.value) * 60;
                if (exercises.length > 0) {
                    remainingExerciseTime = exercises[currentExerciseIndex].duration;
                } else {
                    remainingExerciseTime = workTimer;
                }
            }

            if (isTrainingMode) {
                bminutesDisplay.textContent = Math.floor(remainingExerciseTime / 60).toString().padStart(2, '0');
                bsecondsDisplay.textContent = (remainingExerciseTime % 60).toString().padStart(2, '0');
            } else {
                bminutesDisplay.textContent = Math.floor(breakTimer / 60).toString().padStart(2, '0');
                bsecondsDisplay.textContent = (breakTimer % 60).toString().padStart(2, '0');
            }

            updateDOM();

        } else {
            remainingExerciseTime--;
            if (isTrainingMode) {
                bminutesDisplay.textContent = Math.floor(remainingExerciseTime / 60).toString().padStart(2, '0');
                bsecondsDisplay.textContent = (remainingExerciseTime % 60).toString().padStart(2, '0');
            }
            updateDOM();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(interval);
    minutesDisplay.parentElement.classList.remove('active-timer');
}

function resetTimer() {
    stopTimer();
    workTimer = 25 * 60;
    breakTimer = 5 * 60;
    currentExerciseIndex = 0;
    isTrainingMode = false;
    exercises = [];
    remainingExerciseTime = workTimer;
    trainingSection.style.display = "none";
    cyclesDisplay.textContent = "0";
    updateDOM();
}

function toggleSound() {
    isSoundMuted = !isSoundMuted;
    muteBtn.querySelector('i').classList.toggle('fas', isSoundMuted);
    muteBtn.querySelector('i').classList.toggle('fa-volume-mute', isSoundMuted);
    muteBtn.querySelector('i').classList.toggle('fa-volume-up', !isSoundMuted);
}

// Event Listeners

document.getElementById('training-toggle').addEventListener('click', function() {
    const exerciseSection = document.querySelector('.exercise-selection');
    if (exerciseSection.style.display === 'none' || exerciseSection.style.display === '') {
        exerciseSection.style.display = 'flex';
    }})