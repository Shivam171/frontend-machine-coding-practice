class ProgressBar {
    constructor(parentElement, initialState) {
        this.valueEle = parentElement.querySelector('.progress-bar-value')
        this.fillEle = parentElement.querySelector('.progress-bar-fill')
        this.setValue(initialState)
    }

    setValue(newValue) {
        if (newValue < 0) {
            newValue = 0
        }
        if (newValue > 100) {
            newValue = 100
        }
        this.value = newValue
        this.update()
    }

    update() {
        const percentage = this.value + `%`;
        this.fillEle.style.width = percentage;
        this.valueEle.textContent = percentage;
    }
}

document.getElementById('uploadBtn').addEventListener('click', (e) => {
    e.preventDefault();
    const fieldValue = document.querySelector('#field').value
    new ProgressBar(document.querySelector(".progress-bar"), fieldValue)
})