// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();
function loadEventListeners() {
    // Add task Event
    form.addEventListener('submit', addTask);

    // Clear Task Event
    clearBtn.addEventListener('click', clearTask);

    // Remove task Event
    taskList.addEventListener('click', removeTask);

    // Filter Tasks Event
    filter.addEventListener('keyup', filterTasks);
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

    // Clear input
    taskInput.value = '';
    taskInput.focus();
    e.preventDefault();
}

// Remove Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure ?')) {
            e.target.parentElement.parentElement.remove();
        }
    }
}

// Clear Task
function clearTask() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
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