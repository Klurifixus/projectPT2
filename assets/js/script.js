//Elements
const trainingToggle = document.getElementById('training-toggle');
const exerciseInput = document.getElementById('exercise-dropdown');
const repsInput = document.getElementById('exercise-reps');
const addExerciseBtn = document.getElementById('add-exercise-btn');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');
const muteBtn = document.getElementById('mute-btn');
const timer = document.querySelector('.timer');
const breakTimerElement = document.querySelector('.break-timer');
const exerciseList = document.getElementById('exercise-list');
const trainingSection = document.getElementById('training-section');
const timerSection = document.getElementById('timer-section');

//states
let workTimer = 25 * 60;
let breakTimer = 5 * 60;
let isTrainingMode = false;
let currentExerciseIndex = 0;
let remainingExerciseTime = 0;
let exercises = [];
let isSoundMuted = true;
let interval;

//Audio
const sound = new Audio('assets/sounds/battle_horn_1-6931.mp3');

function updateDOM() {
    //display current time
    const minutes = Math.floor(remainingExerciseTime / 60);
    const seconds = remainingExerciseTime % 60;
    timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    //clear previous exercise list 
    exerciseList.innerHTML = '';

    //display exercises
    exercises.forEach((exercise, index) => {
        const li = document.createElement('li');
        if (index === currentExerciseIndex) {
            li.classList.add('active');
        }
        li.textContent = `${exercise.exercise} - ${exercise.reps} min`;
        exerciseList.appendChild(li);
    });
     const breakMinutes = Math.floor(breakTimer / 60);
     const breakSeconds = breakTimer % 60;
     breakTimerElement.textContent = `${breakMinutes.toString().padStart(2, '0')}:${breakSeconds.toString().padStart(2, '0')}`;


}

function startTimer(){
    stopTimer();

    if (isTrainingmode && currentExerciseIndex < exercises.length) {
        remainingExerciseTime = exercises[currentExerciseIndex].reps * 60;
        // start timer for exercise

    } else{
        remainingExerciseTime = workTimer;
        //start work timer
    }
    updateDOM();

    interval = setInterval(function() {
        if (remainingExerciseTime <= 0) {
            sound.play();
            if (isTrainingMode){
                //transit next exercise or break
                currentExerciseIndex++;
                if (currentExerciseIndex < exercises.length){
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
function toggleTrainingMode(){
    isTrainingmode = !isTrainingMode;
    trainingSection.style.display = isTrainingMode ? "block" : "none";
    if (!isTrainingMode) exercises = [];
    updateDOM();
}

function addExercise(exercise, reps) {
    console.log("Function is being called");
    exercises.push({exercise, reps});
    updateDOM();
}


function stopTimer(){
    clearInterval(interval);

}
function resetTimer(){
    stopTimer();
    workTimer = 25 * 60;
    breakTimer = 5 * 60;
    currentExerciseIndex = 0;
    isTrainingMode = false;
    updateDOM()
}
function toggleSound(){
    isSoundMuted = !isSoundMuted;
    sound.muted = isSoundMuted;

}
//Eventlistners
trainingToggle.addEventListener('click', toggleTrainingMode);
addExerciseBtn.addEventListener('click', function() {
    console.log("Button clicked");
    const exerciseName = exerciseInput.value;
    const reps = repsInput.value;
    if(exerciseName && reps){
        addExercise(exerciseName, parseInt(reps));
    }

});
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
muteBtn.addEventListener('click', toggleSound);
