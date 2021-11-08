const displayHistoryNumber = document.querySelector('.display-history-number');
const displayActualNumber = document.querySelector('.display-actual-number');
const displayTemporaryNumber = document.querySelector('.display-temporary-number');
const numbersElement = document.querySelectorAll('.number');
const operationElement = document.querySelectorAll('.operation');
const equalElement = document.querySelector('.equal');
const clearElement = document.querySelector('.all-clear');
const clearLastElement = document.querySelector('.last-all-clear');

let dis1Num = '';
let dis2Num = '';
let result = null;
let lastOperation = '';
let haveDot = false;

numbersElement.forEach(number => {
    number.addEventListener('click',(e) => {
        if(e.target.innerText === '.' && !haveDot){
            haveDot = true;
        }else if(e.target.innerText === '.' && haveDot) {
            return;
        }
        dis2Num += e.target.innerText;
        displayActualNumber.innerText = dis2Num;
    })
});

operationElement.forEach(operation => (
    operation.addEventListener('click', (e) => {
        if(!dis2Num) return;
        haveDot = false;
        const operationName = e.target.innerText;
        if(dis1Num && dis2Num && lastOperation) {
            mathOperation();
        }else {
            result = parseFloat(dis2Num);
        }
        clearVar(operationName);
        lastOperation = operationName;
        console.log(result);
    })
));

function clearVar(name = '') {
    dis1Num += dis2Num+ ' ' + name + ' ';
    displayHistoryNumber.innerText = dis1Num;
    displayActualNumber.innerText = '';
    dis2Num = '';
    displayTemporaryNumber.innerText = result;
}

function mathOperation() {
    if(lastOperation === 'X') {
        result = parseFloat(result) * parseFloat(dis2Num);
    } else if(lastOperation === '+') {
        result = parseFloat(result) + parseFloat(dis2Num);
     } else if(lastOperation === '-') {
        result = parseFloat(result) - parseFloat(dis2Num);
     } else if(lastOperation === '/') {
        result = parseFloat(result) / parseFloat(dis2Num);
     } else if(lastOperation === '%') {
        result = parseFloat(result) % parseFloat(dis2Num);
     }
}

equalElement.addEventListener('click', (e) => {
    if(!dis1Num || !dis2Num) return;
    haveDot = false;
    mathOperation();
    clearVar();
    displayActualNumber.innerText = result;
    displayTemporaryNumber.innerText = '';
    dis2Num = result;
    dis1Num = '';
});

clearElement.addEventListener('click', (e) => {
    displayActualNumber.innerText = 0;
    displayHistoryNumber.innerText = 0;
    displayTemporaryNumber.innerText = 0;
    dis1Num = '';
    dis2Num = '';
    result = '';
});

clearLastElement.addEventListener('click',(e) => {
    displayActualNumber.innerText = '';
    dis2Num = '';
});

window.addEventListener('keydown', (e) => {
    if(
        e.key === '0' ||
        e.key === '1' ||
        e.key === '2' ||
        e.key === '3' ||
        e.key === '4' ||
        e.key === '5' ||
        e.key === '6' ||
        e.key === '7' ||
        e.key === '8' ||
        e.key === '9' ||
        e.key === '.' 
    ) {
         clickButtonEl(e.key);   
    } else if(
        e.key === '*' ||
        e.key === '/' ||
        e.key === '+' ||
        e.key === '-' ||
        e.key === '%' 
    ) {
        clickOperation(e.key);
    } else if(e.key === '*') {
        clickOperation('X');
    } else if(e.key === 'Enter' || e.key === '=') {
        clickEqual();
    }
});

function clickButtonEl(key) {
    numbersElement.forEach(button => {
        if(button.innerText === key) {
            button.click();
        }
    });
}

function clickOperation(key) {
    operationElement.forEach(button => {
        if(button.innerText === key) {
            button.click();
        }
    })
}

function clickEqual() {
    equalElement.click();
}