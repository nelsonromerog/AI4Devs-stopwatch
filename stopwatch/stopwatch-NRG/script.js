let startTime, updatedTime, difference, tInterval;
let running = false;
let paused = false;

const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const continueButton = document.getElementById('continue');
const clearButton = document.getElementById('clear');
const timeDisplay = document.getElementById('time-display');

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
continueButton.addEventListener('click', continueTimer);
clearButton.addEventListener('click', clearTimer);

function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 1); 
        running = true;
        startButton.style.display = 'none';
        pauseButton.style.display = 'inline-block';
    }
}

function pauseTimer() {
    if (!paused) {
        clearInterval(tInterval);
        paused = true;
        pauseButton.style.display = 'none';
        continueButton.style.display = 'inline-block';
    }
}

function continueTimer() {
    if (paused) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(updateTime, 1);
        paused = false;
        continueButton.style.display = 'none';
        pauseButton.style.display = 'inline-block';
    }
}

function clearTimer() {
    clearInterval(tInterval);
    running = false;
    paused = false;
    startButton.style.display = 'inline-block';
    pauseButton.style.display = 'none';
    continueButton.style.display = 'none';
    difference = 0;
    timeDisplay.textContent = '00:00:00:000';
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000));

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 100) ? "0" + milliseconds : milliseconds;
    
    timeDisplay.textContent = hours + ':' + minutes + ':' + seconds + ':' + milliseconds;
}
