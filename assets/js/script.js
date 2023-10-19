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

/*To know if need to play or pause timer additional variable */
let isClockRunning = false;

/*In seconds = 25min */
let workSessionDuration = 1500;
let currentTimeLeftInSession = 1500;

/*In seconds = 5 min*/
let breakSessionDuration = 300;

/*Toggle clock function*/
const toggleClock = (reset) => {
    if (reset) {
        /*Stop timer*/
    } else {
        if (isClockRunning === true) {
            clockTimer = setInterval(() => {
                /*Change time left / change time spent */
                currentTimeLeftInSession --;
            }, 1000)
            /*Pause timer */
            isClockRunning = false
        } else {
            /*Start timer */
            isClockRunning = true
        }
    }
};


