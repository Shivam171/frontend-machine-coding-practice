const countElement = document.querySelector("#count")
const incrementBtn = document.getElementById("increment")
const decrementBtn = document.getElementById("decrement")
const resetBtn = document.getElementById("reset");

let count = 0, changeBy = 0;

incrementBtn.addEventListener("click", (e) => {
    if (changeBy) {
        count += changeBy

    } else {
        count++;
    }
    countElement.textContent = count
})

decrementBtn.addEventListener("click", (e) => {
    if (changeBy) {
        count -= changeBy

    } else {
        count--;
    }
    countElement.textContent = count
})

resetBtn.addEventListener("click", (e) => {
    countElement.textContent = 0;
    changeBy = 0
    count = 0
    document.getElementById("incrementBy").value = ""
})

document.getElementById("incrementBy").addEventListener("input", (e) => {
    changeBy = parseInt(e.target.value);
})