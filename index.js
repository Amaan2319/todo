let inputField = document.getElementById('new-todo');
let addTaskButton = document.getElementById('add-btn');
let tasksList = document.getElementById('task-list');

// Load saved tasks from browser's local storage
window.addEventListener('DOMContentLoaded', () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
        savedTasks.forEach(task => {
            createTaskElement(task);
        });
    }
});

// Add a new task
function addTask() {
    let taskText = inputField.value;
    if (taskText.trim() !== "") {
        createTaskElement(taskText);
        saveTasksToLocalStorage();
        inputField.value = ""; // Clear the input field
    } else {
        alert('Please add a task first');
    }
}

// Create a new task element
function createTaskElement(taskText) {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item border bg-violet-200 border-gray-400 rounded-md py-2 px-3 my-4 flex items-center justify-between';
    listItem.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-sm btn-danger';

    const deleteIcon = document.createElement('img');
    deleteIcon.src = 'bin.png';
    deleteIcon.alt = 'Delete';
    deleteIcon.className = 'w-4';

    deleteButton.appendChild(deleteIcon);
    deleteButton.addEventListener('click', () => {
        listItem.remove();
        saveTasksToLocalStorage();
    });

    listItem.appendChild(deleteButton);
    tasksList.appendChild(listItem);
}

// Save tasks to browser's local storage
function saveTasksToLocalStorage() {
    const tasks = Array.from(tasksList.children).map(task => task.textContent);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
