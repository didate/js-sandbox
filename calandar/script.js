// variable declaration

let currentMonth = 0;
let currentYear = 0;
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

const start = [1, 1, 2010];

// arrow click
document.getElementById('arrow-left').addEventListener('click', arrowLeftClick);
document.getElementById('arrow-right').addEventListener('click', arrowRightClick);


function arrowLeftClick(e) {
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear -= 1;
    } else {
        currentMonth -= 1;
    }
    setCurrentMonth(currentMonth, currentYear);

}

function arrowRightClick(e) {
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear += 1
    } else {
        currentMonth += 1;
    }
    setCurrentMonth(currentMonth, currentYear);

}

function setCurrentMonth(month, year) {
    const value = `${months[month]} ${year}`;
    document.querySelector('.current-month').innerHTML = value;
    setCalendar();
}

function setCalendar() {
    removeCalendar();
    const theDate = new Date(`${currentYear}/${currentMonth + 1}/01`);
    const dow = theDate.getDay();

    // get number of day for current month
    let year = currentMonth === 0 ? currentYear - 1 : currentYear;
    let month = currentMonth === 0 ? 12 : currentMonth + 1;
    let monthOfcurrent = currentMonth === 0 ? 1 : currentMonth;

    let nodolm = new Date(`${year}/${month}/01`) - new Date(`${currentYear}/${monthOfcurrent}/01`);
    nodolm = Math.abs(nodolm / 1000 / 60 / 60 / 24);


    // add not-active number
    for (let index = dow - 1; index >= 0; index--) {
        createNumberElement(nodolm - index, 'number not-active');
    }

    // get number of day for current month
    year = currentMonth === 11 ? currentYear + 1 : currentYear;
    month = currentMonth === 11 ? 1 : currentMonth + 2;

    let nod = new Date(`${year}/${month}/01`) - new Date(`${currentYear}/${currentMonth + 1}/01`);
    nod = nod / 1000 / 60 / 60 / 24;
    // add active number
    for (let index = 1; index <= nod; index++) {
        createNumberElement(index, 'number');
    }

    // add not-active number
    for (let index = 1; index <= 42 - (dow + nod); index++) {
        createNumberElement(index, 'number not-active');
    }

}

function removeCalendar() {
    const panel = document.getElementById('panel');
    while (panel.firstChild) {
        panel.removeChild(panel.firstChild);
    }
}

function createNumberElement(value, className) {
    const numberElement = document.createElement('div');
    numberElement.innerText = value;
    numberElement.className = className;
    document.getElementById('panel').appendChild(numberElement);
}

load();
function load() {
    const currentDate = new Date();
    currentMonth = currentDate.getMonth();
    currentYear = currentDate.getFullYear();
    setCurrentMonth(currentMonth, currentYear);
}
