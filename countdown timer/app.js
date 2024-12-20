(function () {
    // Dom elements
    var inputHour = document.querySelector('.hrs-input');
    var inputMins = document.querySelector('.mins-input');
    var inputSecs = document.querySelector('.secs-input');

    var startBtn = document.getElementById('start');
    var stopBtn = document.getElementById('stop');
    var resetBtn = document.getElementById('reset');

    // Timer will hold the setInterval
    var timer = null;

    // Start Button
    startBtn.addEventListener('click', () => {
        // if hrs, mins and sec are 0 then nothing happens
        if (Number(inputHour.value) === 0 && Number(inputMins.value) === 0 && Number(inputSecs.value) === 0) return;
        // Else, we start start the interval
        // Once the start btn is clicked
        // 1. we will hide the hide the start button and show the stop button
        // 2. then we start the timer or our main logic "countDownTimer" runs every 500 sec
        function startTimer() {
            startBtn.style.display = "none"
            stopBtn.style.display = "initial"
            timer = setInterval(countDownTimer, 400)
        }
        startTimer()
    })

    // Stop Button
    stopBtn.addEventListener('click', stopTimer);

    // Reset Button
    resetBtn.addEventListener('click', resetTimer);

    // Main function
    function countDownTimer() {
        let hours = Number(inputHour.value);
        let minutes = Number(inputMins.value);
        let seconds = Number(inputSecs.value);

        if (seconds > 0) {
            seconds--;
        } else {
            if (minutes > 0) {
                minutes--;
                seconds = 59;
            } else if (hours > 0) {
                hours--;
                minutes = 59;
                seconds = 59;
            }
        }

        // Update the input fields
        // Note: you can use "padStart" or do
        // inputHours.value = `${this.inputSecs.value <= 10 ? "0": "" }${this.inputSecs.value - 1}`
        inputHour.value = String(hours).padStart(2, "0")
        inputMins.value = String(minutes).padStart(2, "0")
        inputSecs.value = String(seconds).padStart(2, "0")

        // Stop timer if all values are zero
        if (hours === 0 && minutes === 0 && seconds === 0) {
            stopTimer();
        }
    }

    // Function to stop the interval
    // 1. Clear timer using "clearInterval"
    // 2. Set timer to null
    // 3. show start btn and hide stop btn
    function stopTimer() {
        clearInterval(timer);
        timer = null;
        startBtn.style.display = "initial";
        stopBtn.style.display = "none";
    }

    // Function to reset the timer
    // 1. stop timer
    // 2. clear the input fields
    function resetTimer() {
        stopTimer();
        inputHour.value = "";
        inputMins.value = "";
        inputSecs.value = "";
    }
})()