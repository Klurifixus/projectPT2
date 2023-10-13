let startBtn = document.getElementById('start-btn');
let stopBtn = document.getElementById('stop-btn');
let resetBtn = document.getElementById('reset-btn');


let workMin = document.getElementById('work-length');
let breakMin = document.getElementById('break-length');

let minutes = document.getElementById('minutes');
let seconds = document.getElementById('seconds');
let bminutes = document.getElementById('bminutes');
let bseconds = document.getElementById('bseconds');

//timer variable reference
let startTimer;
let stopTimer;
let resetTimer;

startBtn.addEventListener('click', function(){
    if(startTimer === undefined){
        startTimer = setInterval(timer, 1000)
    } else{
      alert("Timer is already running");
    }


})



stopBtn.addEventListener('click', function(){
    if(stopTimer === undefined){
        stopInterval() 
        
    }
    startTimer = undefined;
})
resetBtn.addEventListener('click', function (){
    minutes.innerText = 25;
    seconds.innerText = "00";

    bminutes.innerText = 5;
    bseconds.innerText = "00";
    document.getElementById('cycles').innerText =0;{}
    startTimer = undefined;

})


function timer(){
    //work timer
    if(seconds.innerText != 0){
        seconds.innerText --;
    } else if(minutes.innerText != 0 && seconds.innerText ==0){
        seconds.innerText = 59;
        minutes.innerText--;
    }

    //break timer
    if(minutes.innerText == 0 && seconds.innerText == 0){
        if(bseconds.innerText != 0){
            bseconds.innerText --;
        } else if(bminutes.innerText != 0 && bseconds.innerText ==0){
            bseconds.innerText = 59;
            bminutes.innerText--;
        }
    }  
    
    //cycletimer
    if(minutes.innerText == 0 && seconds.innerText == bminutes.innerText == 0 && bseconds.innerText == 0){
        minutes.innerText == 25;
        seconds.innerText == "00";

        bminutes.innerText == 5;
        bseconds.innerText == "00";

        document.getElementById('cycles').innerText++;
    }
}
//stop timer
function stopInterval(){
    clearInterval(startTimer);

}



