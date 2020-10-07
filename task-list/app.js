// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();
function loadEventListeners() {

    // DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task Event
    form.addEventListener('submit', addTask);

    // Clear Task Event
    clearBtn.addEventListener('click', clearTask);

    // Remove task Event
    taskList.addEventListener('click', removeTask);

    // Filter Tasks Event
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from LS
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    } else {
        tasks = [];
    }

    tasks.forEach(function (task) {
        // create li element
        const li = document.createElement('li');
        li.className = 'collection-item';

        // Create text node and append li
        li.appendChild(document.createTextNode(task));

        // Create new link element

        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>'

        li.appendChild(link)

        // Append li to ul
        taskList.appendChild(li);
    })
}

// Add Task callback
function addTask(e) {

    if (taskInput.value === '') {

    }

    // create li element
    const li = document.createElement('li');
    li.className = 'collection-item';

    // Create text node and append li
    li.appendChild(document.createTextNode(taskInput.value));

    // Create new link element

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>'

    li.appendChild(link)

    // Append li to ul
    taskList.appendChild(li);

    // Store to LS
    storeTask(taskInput.value);

    // Clear input
    taskInput.value = '';
    taskInput.focus();
    e.preventDefault();
}

// Store Task
function storeTask(value) {
    let tasks;
    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    } else {
        tasks = [];
    }
    tasks.push(taskInput.value);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Remove from LS
function removeFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    } else {
        tasks = [];
    }
    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure ?')) {
            e.target.parentElement.parentElement.remove();

            // Remove from LS
            removeFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Clear Task
function clearTask() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}