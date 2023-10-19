/*--Event listeners--*/
const pomodoroTimer = document.querySelector('.timer');

const startBtn = document.querySelector('#start-btn');
const pauseBtn = document.querySelector('#pause-btn');
const resetBtn = document.querySelector('#reset-btn');
const stopBtn = document.querySelector('#stop-btn');


/*To know if need to play or pause timer additional variable */
let isClockRunning = false;

/*In seconds = 25min */
let workSessionDuration = 1500;
let currentTimeLeftInSession = 1500;

/*In seconds = 5 min*/
let breakSessionDuration = 300;

let type = 'Work';
let timeSpentInCurrentSession = 0;

let currentTaskLabel = document.querySelector('.pomodoro-task');

let updateWorkSessionDuration;
let updateBreakSessionDuration;

let workDurationInput = document.querySelector('#work-time-input');
let breakDurationInput = document.querySelector('#break-time-input');

workDurationInput.value = '25';
breakDurationInput.value = '5';


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

/*Toggle clock function*/
const toggleClock = (reset) => {
    if (reset) {
        /*Stop timer*/
        stopClock();
    } else {
        if (isClockRunning === true) {
            clockTimer = setInterval(() => {
                /*Change time left / change time spent */
                stepDown();
                displayCurrentTimeLeftInSession();
            }, 1000);
            /*Pause timer */
            clearInterval(clockTimer);
            isClockRunning = false;
        } else {
            /*Start timer */
            isClockRunning = true;
        }
    }
};

/* Display Timer on page */
const displayCurrentTimeLeftInSession = () => {
    const secondsLeft = currentTimeLeftInSession;
    let result = '';
    const seconds = secondsLeft % 60;
    const minutes = parseInt(secondsLeft/60) % 60;
    let hours = parseInt(secondsLeft/ 3600);
    /*Fix so 0 vible infront of number if under 10 */
    function addLeadingZeroes(time) {
        return time < 10 ? `0 ${time}` : time;
    }
    if (hours > 0) result += `${hours}:`;
    result += `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`;
    pomodoroTimer.innerText = result.toString();
};


/*Function for when timer stop */
const stopClock = () => {
    displaySessionLog(type);
    clearInterval(clockTimer);
    isClockRunning = false;
    currentTimeLeftInSession = workSessionDuration;
    displayCurrentTimeLeftInSession();
    currentTimeLeftInSession--;
    timeSpentInCurrentSession =0;

    type = 'Work';
};


/*Step down function for toggling between work and break when time run out */
const stepDown = () => {
    if (currentTimeLeftInSession > 0) {
        currentTimeLeftInSession--;
        currentTimeLeftInSession++;
    } else if (currentTimeLeftInSession === 0) {
        timeSpentInCurrentSession =0;
        if ( type === 'Work') {
            currentTimeLeftInSession = breakSessionDuration;
            displaySessionLog('Work');
            type = 'Break';
        } else {
            currentTimeLeftInSession = workSessionDuration
            type = ' Work';
            if (currentTaskLabel.value = 'Break') {
                currentTaskLabel.value = workSessionLabel;
            }
            currentTaskLabel.disabled = false;
            displaySessionLog('Break');
        }
    }
    displayCurrentTimeLeftInSession();
};

/*Function to show session log */
const displaySessionLog = (type) => {
    const sessionList = document.querySelector('.pomodoro-sessions');
    const li = document.createElement('li');
    if (type === 'Work') {
        sessionLabel = currentTaskLabel.value ? currentTaskLabel.value : 'Work';
        workSessionLabel = sessionLabel;
    } else {
        sessionLabel = 'Break';
    }
    let elapsedTime = parseInt(timeSpentInCurrentSession / 60);
    elapsedTime = elapsedTime > 0 ? elapsedTime : '< 1';

    const text = document.createTextNode(`${sessionLabel} : ${elapsedTime} min`);
    li.appendChild(text);
    sessionList.appendChild(li);
};




