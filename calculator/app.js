// UI Variable
let historyValue = document.getElementById('history-value');
let outputValue = document.getElementById('output-value');
let numbers = document.querySelectorAll('.number');
let operators = document.querySelectorAll('.operator');
// Global Var 
let operatorTaped = false;
let operatorEqual = false;

numbers.forEach(function (number) {
    number.addEventListener('click', getNombre);
});

operators.forEach(function (operator) {
    operator.addEventListener('click', tapOperator);
})

function getNombre(e) {
    if (operatorTaped) {
        // reset outputValue 
        printOutput('');
        operatorTaped = false;
    }
    if (operatorEqual) {
        printHistory('');
        operatorEqual = false;
    }
    printOutput(getOutput() + e.target.id);
}

function tapOperator(e) {

    operatorTaped = true;

    if (operatorEqual) {
        printHistory('');
        operatorEqual = false;
    }

    if (e.target.id === 'clear') {
        printOutput('');
        printHistory('');
    } else if (e.target.id === 'backspace') {
        getOutput().length > 0 ? printOutput(getOutput().slice(0, getOutput().length - 1)) : printOutput('');
        if (isNaN(getOutput())) {
            printOutput('');
        }
    } else if (e.target.id === '%') {
        printOutput(Number(getOutput()) / 100)
    } else if (e.target.id === '=') {
        operatorEqual = true;
        if (getOutput()) {
            printHistory(`${getHistory()} ${getOutput()}`);
        }

        if (getHistory().length > 0) {
            // Check if the last element in history is not an operator
            if (isNaN(getHistory().substr(getHistory.length - 1, 1))) {
                // if so, remove it
                printHistory(getHistory().slice(0, getHistory.length - 1))
            }
            printOutput(eval(getHistory())); // Evaluate operation
            // printHistory(''); // Clean history
        }
    } else {
        if (!isNaN(getOutput()) && getOutput() != Infinity && getOutput().length > 0) { // if value is a number add it to history
            printHistory(`${getHistory()} ${getOutput()} ${e.target.id}`);
            printOutput('');
        }

    }

}



function printOutput(value) {
    outputValue.innerText = value;
}
function getOutput() {
    return outputValue.innerText;
}
function printHistory(value) {
    historyValue.innerText = value;
}
function getHistory() {
    return historyValue.innerText;
}