/*--Event listeners--*/
const pomodoroTimer = document.querySelector('.timer');

const startBtn = document.querySelector('start-btn');
const pauseBtn = document.querySelector('pause-btn');
const resetBtn = document.querySelector('reset-btn');
const stopBtn = document.querySelector('stop-btn');

/*Start btn */
startBtn.addEventListener('click', () => {
    toggleClock();
});

/*Pause btn */
pauseBtn.addEventListener('click', () => {
    toggleClock();
});

/*Reset Btn */
resetBtn.addEventListener('click', () => {
    toggleClock();
});

/*Stop btn */
stopBtn.addEventListener('click', () => {
    toggleClock(true);
});
