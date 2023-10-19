let start = document.getElementById('start-btn');
let pause = document.getElementById('stop-btn');
let reset = document.getElementById('reset-btn');
let mute = document.getElementById('mute-btn');

let minutes = document.getElementById('minutes');
let seconds = document.getElementById('seconds');
let bminutes = document.getElementById('bminutes');
let bseconds = document.getElementById('bseconds');

// Reference to timer variable
let startTimer;

start.addEventListener('click', function () {
    if (startTimer === undefined) {
        startTimer = setInterval(timer, 1000);
    } else {
        alert("Timer is already running.");
    }
});

function timer() {
    // Work timer
    if (minutes.innerText != 0 || seconds.innerText != 0) {
        if (seconds.innerText == 0) {
            seconds.innerText = 59;
            minutes.innerText--;
        } else {
            seconds.innerText--;
        }
    } else if (bminutes.innerText != 0 || bseconds.innerText != 0) {
        // Break timer
        if (bseconds.innerText == 0) {
            bseconds.innerText = 59;
            bminutes.innerText--;
        } else {
            bseconds.innerText--;
        }
    }

    // When both timers reach 0
    if (minutes.innerText == 0 && seconds.innerText == 0 && bminutes.innerText == 0 && bseconds.innerText == 0) {
        minutes.innerText = "25";
        seconds.innerText = "00";
        bminutes.innerText = "5";
        bseconds.innerText = "00";

        document.getElementById('counter').innerText++;
    }
}
