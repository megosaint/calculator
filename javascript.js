function add(num1, num2){
    return num1 + num2
};

function subtract(num1, num2){
    return num1 - num2
};

function multiply(num1, num2){
    return num1 * num2
};

function divide(num1, num2){
    if (num2 === 0) {
        return 'Zero division'
    }
    else {
        return Math.round((num1 / num2) * 100000000) / 100000000
    }
};

function operate(operator, num1, num2){
    if (operator == '+'){
        return add(num1, num2);
    }
    else if (operator === '-'){
        return subtract(num1, num2);
    }
    else if (operator === '*'){
        return multiply(num1, num2);
    }
    else if (operator === '/'){
        return divide(num1, num2);
    }
    else{
        return 'Not valid';
    }
};
//--------------------------------------------------------------------//

const btnNumber = document.querySelectorAll('.number');
const displayLower = document.querySelector('.display-lower');
const btnOper = document.querySelectorAll('.oper');
const displayUpper = document.querySelector('.display-upper');
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clear');
const dec = document.querySelector('.dec');
let numText = '';
let operator = '';
let num1;
let num2;
let counter = 0;
//----------------------------------------------------------------------//
btnNumber.forEach((button) => {
    button.addEventListener('click', () => {
        if (displayLower.textContent === '0'){
            displayLower.textContent = button.textContent;
            displayLower.classList.remove('equal');
            displayLower.classList.add('number');
            numText += button.textContent;
        }
        else if (displayLower.classList.contains('operator')){
            operator = displayLower.textContent;
            displayUpper.textContent += ` ${displayLower.textContent}`;
            displayLower.textContent = button.textContent;
            numText += button.textContent;
            displayLower.classList.remove('operator');
            displayLower.classList.add('number');
        }
        else if (displayLower.classList.contains('equal')){
            displayLower.textContent = button.textContent;
            displayLower.classList.remove('equal');
            displayLower.classList.add('number');
            numText += button.textContent;
        }
        else {
            displayLower.textContent += button.textContent;
            displayLower.classList.add('number');
            numText += button.textContent;
        }
    });
});

btnOper.forEach((button) => {
    button.addEventListener('click', () => {
        if (displayLower.classList.contains('number')){
            if (counter === 0){
                num1 = Number(numText);
                counter++;
                numText = '';
                displayUpper.textContent = displayLower.textContent;
                displayLower.textContent = button.textContent;
                displayLower.classList.remove('number');
                displayLower.classList.add('operator');
            }
            else {
                num2 = Number(numText);
                num1 = operate(operator, num1, num2);
                numText = '';
                num2 = undefined;
                displayUpper.textContent = num1;
                displayLower.textContent = button.textContent;
                displayLower.classList.remove('number');
                displayLower.classList.add('operator');
            }
        }
        else if (displayLower.classList.contains('operator')) {
            displayLower.textContent = button.textContent;
        }
    });
});

equal.addEventListener('click', () => {
    if (!num1){
        num1 = Number(numText);
        numText = '';
    }
    else{
        num2 = Number(numText);
        numText = '';
    }

    if (displayLower.classList.contains('operator') || num2 === undefined) {
        displayLower.textContent = num1;
        displayUpper.textContent = '';
        displayLower.classList.remove('number');
        displayLower.classList.remove('operator');
        displayLower.classList.add('equal');
        num1 = undefined;
        num2 = undefined;
        numText = '';
        counter = 0;
    }
    else{
        num1 = operate(operator, num1, num2);
        displayLower.textContent = num1;
        displayUpper.textContent = '';
        displayLower.classList.remove('number');
        displayLower.classList.add('equal');
        num1 = undefined;
        num2 = undefined;
        numText = '';
        counter = 0;
    }
});

clear.addEventListener('click', () => {
    displayUpper.textContent = '';
    displayLower.textContent = 0;
    num1 = undefined;
    num2 = undefined;
    numText = '';
    counter = 0;
});

dec.addEventListener('click', () => {
    if((displayLower.classList.contains('number')) && (displayLower.textContent.includes('.') === false)){
        displayLower.textContent += dec.textContent;
        numText += dec.textContent;
    }
    else if(displayLower.textContent === '0') {
        displayLower.textContent += dec.textContent;
        numText += dec.textContent;
        displayLower.classList.add('number');
    }
});