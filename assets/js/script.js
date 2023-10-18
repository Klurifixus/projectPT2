//Elements
const trainingToggle = document.getElementById('training-toggle');
const exerciseInput = document.getElementById('exercise-input');
const repsInput = document.getElementById('reps-input');
const addExerciseBtn = document.getElementById('add-exercise-btn');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');
const muteBtn = document.getElementById('mute-btn');
const timer = document.querySelector('.timer');
const breakTimer = document.querySelector('.break-timer');
const exerciseList = document.getElementById('exercise-list');
const trainingSection = document.getElementById('training-section');
const timerSection = document.getElementById('timer-section');

//states
let workTimer = 25 * 60;
let breakTimer = 5 * 60;
let isTrainingmode = false;
let currentExerciseIndex = 0;
let remainingExerciseTime = 0;
let exercises = [];
let isSoundMuted = true;

//Audio
const sound = new Audio('assets/sounds/battle_horn_1-6931.mp3');

function toggleTrainingMode() {
    isTraningmode = !isTrainingmode;
    trainingSection.style.display = isTrainingMode ? "block" : "none";
    if (!isTrainingmode) exercise = [];
    


}
function addExercise(exercise, reps) {
    exercices.push({exercise, reps});
}

function startTimer(){

}
function stopTimer(){

}
function resetTimer(){

}
function toggleSound(){

}