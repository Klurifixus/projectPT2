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
// update dOM
}
function addExercise(exercise, reps) {
    exercices.push({exercise, reps});
    // add to the DOM of exercise
}

function startTimer(){
    stopTimer();

    if (isTrainingmode && currentExerciseIndex < exercise.lenght) {
        remainingExerciseTime = exercises[currentExerciseIndex].reps * 60;
        // start timer for exercise

    } else{
        remainingExerciseTime = workTimer;
        //start work timer
    } 
    interval = setInterval(function() {
        if (remainingExerciseTime <= 0) {
            sound.play();
            if (isTrainingMode){
                //transit next exercise or break
                currentExerciseIndex++;
                if (currentExerciseIndex < exercise.length){
                    startTimer();

                } else {
                    remainingExerciseTime = breakTimer;
                    isTrainingMode = false;
                }
            } else{
                //switch work or break
                isTrainingMode = !isTrainingMode;
                startTimer();

            }
        } else {
            remainingExerciseTime--;
        }
    }, 1000);   

}
function stopTimer(){

}
function resetTimer(){

}
function toggleSound(){

}