// Get the DOM elements
const startBtn = document.getElementById("startBtn")
const stopBtn = document.getElementById("stopBtn")
const resetBtn = document.getElementById("resetBtn")
const display = document.getElementById("display")

let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

function updateTimer() {
    let currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    // Calculating hrs, mins and seconds
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60)
    let milSeconds = Math.floor(elapsedTime % 1000 / 10);

    // Updating the timer display
    hours = String(hours).padStart(2, "0")
    minutes = String(minutes).padStart(2, "0")
    seconds = String(seconds).padStart(2, "0")
    milSeconds = String(milSeconds).padStart(2, "0")

    display.textContent = `${hours}:${minutes}:${seconds}:${milSeconds}`
}


startBtn.addEventListener("click", () => {
    // If is running is true then
    // 1. Put the start time to current time
    // 2. Start the main logic (updateTimer)
    // 3. Put the isRunning to true
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTimer, 10);
        isRunning = true
    }
})


stopBtn.addEventListener("click", () => {
    // first check if the timer is running
    // 1. clear the timer using setInterval
    // 2. Update the elapsedTime (current time - start time)
    if (isRunning) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
})

resetBtn.addEventListener("click", () => {
    clearInterval(timer)
    timer = null;
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    display.textContent = `00:00:00:00`
})












