const userInput = document.getElementById('userInput');

const lowerCaseEl = document.getElementById('lowercase');
const upperCaseEl = document.getElementById('uppercase');
const camelCaseEl = document.getElementById('camelcase');
const pascalCaseEl = document.getElementById('pascalcase');
const snakeCaseEl = document.getElementById('snakecase');
const kebabCaseEl = document.getElementById('kebabcase');
const trimCaseEl = document.getElementById('trimcase');


function transform({ text = userInput.value.trim() }) {
    // Lower Case
    lowerCaseEl.textContent = text.toLowerCase();

    // Upper Case
    upperCaseEl.textContent = text.toUpperCase();

    // Camel Case
    const camelCase = text
        .toLowerCase()
        .split(' ')
        .reduce((a, b, index) =>
            index === 0 ? b.toLowerCase() : a + b.charAt(0).toUpperCase() + b.slice(1)
            , '')
    camelCaseEl.textContent = camelCase

    // Pascal Case
    const pascalCase = text.toLowerCase().split(' ').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    pascalCaseEl.textContent = pascalCase;

    // Snake Case
    const snakeCase = text.toLowerCase().split(' ').join('_');
    snakeCaseEl.textContent = snakeCase;

    // Kebab Case
    const kebabCase = text.toLowerCase().split(' ').join('-');
    kebabCaseEl.textContent = kebabCase;

    // Trim Case
    const trimCase = text.toLowerCase().split(' ').join('');
    trimCaseEl.textContent = trimCase;
}

userInput.addEventListener('input', transform);
transform({});