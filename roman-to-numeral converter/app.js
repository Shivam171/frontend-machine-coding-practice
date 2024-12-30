const form = document.getElementById('form');
const userInput = document.getElementById('userInput');
const response = document.getElementById('response');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let input = userInput.value.toUpperCase().trim();
    // Remember the pattern 1,5,10,50..1000
    let romanObj = {
        M: 1000,
        D: 500,
        C: 100,
        L: 50,
        X: 10,
        V: 5,
        I: 1
    };

    function checkRoman(str) {
        return str.split('').every(char => Object.keys(romanObj).includes(char))
    }

    function checkNumber(str) {
        return !isNaN(Number(str))
    }

    function romanToInteger(roman) {
        let result = 0;
        let preValue = 0;
        for (let i = roman.length - 1; i >= 0; i--) {
            let current = romanObj[roman[i]]
            if (current < preValue) {
                result -= current;
            } else {
                result += current
            }
            preValue = current
        }
        return result
    }

    // Remember the pattern 1,4,5,9, 10, 40...1000
    const integerToRoman = (num) => {
        let result = '';
        const romanMap = [
            { value: 1000, symbol: 'M' },
            { value: 900, symbol: 'CM' },
            { value: 500, symbol: 'D' },
            { value: 400, symbol: 'CD' },
            { value: 100, symbol: 'C' },
            { value: 90, symbol: 'XC' },
            { value: 50, symbol: 'L' },
            { value: 40, symbol: 'XL' },
            { value: 10, symbol: 'X' },
            { value: 9, symbol: 'IX' },
            { value: 5, symbol: 'V' },
            { value: 4, symbol: 'IV' },
            { value: 1, symbol: 'I' }
        ];

        for (let i = 0; i < romanMap.length; i++) {
            while (num >= romanMap[i].value) {
                result += romanMap[i].symbol;
                num -= romanMap[i].value;
            }
        }
        return result;
    };

    if (checkRoman(input)) {
        let ans = romanToInteger(input)
        response.textContent = `${input} = ${ans}`
    } else if (checkNumber(input)) {
        // Converting integer to roman
        let number = parseInt(input, 10);
        if (number <= 0 || number > 3999) {
            alert("Please enter an integer between 1 and 3999.");
        } else {
            let roman = integerToRoman(number);
            response.textContent = `${number} = ${roman}`;
        }
    } else {
        console.warn("Neither Roman nor Integer!");
    }
});