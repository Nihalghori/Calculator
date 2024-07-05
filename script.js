const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let previousInput = '';
let operator = '';

function updateDisplay() {
    display.textContent = currentInput || '0';

}

function handleNumber(number) {
    if (currentInput === '0') {
        currentInput = number;
    
    }else{
        currentInput += number;
    }
    updateDisplay();
}

function handleOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }else {
        previousInput = currentInput;
    }

    operator = op;
    currentInput = '';

}

function calculate() {
    let result;

    switch (operator){
    case '+' :
        result = parseFloat(previousInput) + parseFloat(currentInput);
        break;
    case '-' :
        result = parseFloat(previousInput) - parseFloat(currentInput);
        break;
    case '*' :
        result = parseFloat(previousInput) * parseFloat(currentInput);
        break;
    case '/' :
        result = parseFloat(previousInput) / parseFloat(currentInput);
        break;
    case '%' :
        result = parseFloat(previousInput) % parseFloat(currentInput);
        break;
    default :
       
        break;
    };

    currentInput = result.toString();
previousInput = '';
operator = '';
updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay();
}

function handleBackspace (){
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        switch (value) {
            case 'C':
                clearDisplay();
                break;
            case '←':
                handleBackspace();
                break;
            case '%':
            case '/':
            case '*':
            case '-':
            case '+':
                handleOperator(value);
                break;
            case '=':
                calculate();
                break;
            case '.':
                if (!currentInput.includes('.')) {
                    currentInput += '.';
                    updateDisplay();
                }
                break;
            default:
                handleNumber(value);
                break;
        }
    });
});

updateDisplay();
