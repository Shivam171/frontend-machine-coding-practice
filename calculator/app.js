const display = document.getElementById('display');

function appendToDisplay(input) {
    display.value += input;
}

function clearDisplay() {
    display.value = '';
}

function calculate() {
    let expression = display.value;

    if (expression.includes('^2')) {
        const parts = expression.split('^2');
        const base = Number(parts[0]);
        display.value = Math.pow(base, 2);
        return;
    }

    if (expression.includes('sqrt')) {
        const parts = expression.split('sqrt');
        const base = Number(parts[0]);
        display.value = Math.sqrt(base);
        return;
    }

    try {
        display.value = eval(expression);
    } catch (error) {
        display.value = 'Error';
    }
}