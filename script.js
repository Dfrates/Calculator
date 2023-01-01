/* Created by: Daniel Frates
 * Calculator Project
 * Started: 12/23/2022
 * Ended: TBD
 */

// initializes button container from DOM
const buttonContainer = document.querySelector('.btns-container');

const inputText = document.querySelector('.input-text');
const resultText = document.querySelector('.result-text');


// initializes buttons
const clearBtn = buttonContainer.querySelector('.clear');
const deleteBtn = buttonContainer.querySelector('.delete');
const equalBtn = buttonContainer.querySelector('.equal');
const decimalBtn = buttonContainer.querySelector('.dec');
const operatorBtns = buttonContainer.querySelectorAll('.operator');
const numberBtns = buttonContainer.querySelectorAll('.number');

let result = 0;
let numberFlag = false;
let operatorFlag = 1;
let inputOne = 0;
let inputTwo = 0;
let operatorInUse = false;
let screenCount = 0;
let decimalInUse = false;


function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function mutiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (parseInt(b) != 0) {
        resultText.textContent = 'NO!';
        return;
    }
    return a / b;
}

function modulo(a, b) {
    return a % b;
}

function clear() {
    inputText.textContent = '';
    resultText.textContent = '';
    result = 0;
    screenCount = 0;
    operatorInUse = false;
    numberFlag = false;
    inputOne = 0;
    inputTwo = 0;
}

function deletInput() {
    if (!parseInt(inputText.textContent.toString().slice(0, -1))) {
        operatorFlag = 1;
        operatorInUse = 0;
    }
    inputText.textContent = inputText.textContent.toString().slice(0, -1);
    
}

function inputToScreen(input) {
    if (screenCount < 8) {
        inputText.append(input);
        screenCount++;
    }
    
}

function setInputs() {
    const inputs = inputText.textContent.split(operator);
    if (!numberFlag) {
    inputOne = parseFloat(inputs[0]);
    console.log('input1: ' + inputOne);
    inputTwo = parseFloat(inputs.at(-1));
    console.log('input2: ' + inputTwo);
    numberFlag = true;
    return;
    }

    inputTwo = parseFloat(inputs.at(-1));
    decimalInUse = false;
    console.log('input2: ' + inputTwo);

}

function setOperator(input) {
    if (!operatorInUse) {
        operator = input;
        console.log('operator: ' + operator);
        inputText.append(operator);
        operatorInUse = true;
        return;
    }
}

function evaluate() {
    setOperator();
    setInputs();
    console.log(inputOne);
    console.log(inputTwo);
    console.log(operator);
    if (inputOne == undefined || inputTwo == undefined || operator == undefined) {
        clear();
        return;
    }
    result = Math.round(solve(operator, inputOne, inputTwo) * 100) / 100;

    refresh();
}

function solve(operator, operand1, operand2) {
    switch(operator) {
        case '+':
            return add(operand1, operand2);
        case '-':
            return subtract(operand1, operand2);
        case '/':
            return divide(operand1, operand2);
        case '*':
            return mutiply(operand1, operand2);
        case '%':
            return modulo(operand1, operand2);
        default:
            console.log('Error in solve');
            return;
    }
    operatorInUse = false;
    decimalInUse = false;
}





function refresh() {
    inputOne = result;
    decimalInUse = false;
    numberFlag = false;
    operatorInUse = false;
    inputText.textContent = '';
    resultText.textContent = '';
    resultText.append(result);
    inputText.append(inputOne);


}

function handleEvents() {
    clearBtn.addEventListener('click', function() {
        clear();
    });

    deleteBtn.addEventListener('click', function() {
        deletInput();
    });

    decimalBtn.addEventListener('click', function() {
        if(!decimalInUse) {
            inputToScreen(decimalBtn.textContent);
            decimalInUse = true;
        }
        
    });

    console.log(numberBtns.length);
    for(let i = 0; i < numberBtns.length; i++) {
        console.log('event added');
        numberBtns[i].addEventListener('click', function() {
            inputToScreen(numberBtns[i].textContent);
        });
    }

    for (let i = 0; i < operatorBtns.length; i++) {
        operatorBtns[i].addEventListener('click', function() {
            setOperator(operatorBtns[i].textContent);
            decimalInUse = false;
        });
    }

    equalBtn.addEventListener('click', function() {
        evaluate();
    });
}

handleEvents();
