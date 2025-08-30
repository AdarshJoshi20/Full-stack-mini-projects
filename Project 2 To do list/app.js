

const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');
const inputBox = document.getElementById('input-box');

// Function to create a task item in the DOM
function createTask(taskObj) {
    const li = document.createElement('li');

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = taskObj.completed;
    li.appendChild(checkbox);

    // Task text
    const taskText = document.createElement('span');
    taskText.innerText = taskObj.text;
    if (taskObj.completed) {
        taskText.style.textDecoration = 'line-through';
    }
    li.appendChild(taskText);

    // Checkbox toggle
    checkbox.addEventListener('change', () => {
        taskText.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
        saveData();
    });

    // Edit button
    const editButton = document.createElement('button');
    editButton.innerHTML = '✏️';
    editButton.className = 'edit';
    li.appendChild(editButton);

    editButton.addEventListener('click', () => {
        let editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = taskText.innerText;
        li.insertBefore(editInput, taskText);
        li.removeChild(taskText);
        editInput.focus();

        function saveEdit() {
            taskText.innerText = editInput.value;
            li.insertBefore(taskText, editInput);
            li.removeChild(editInput);
            saveData();
        }

        editInput.addEventListener('blur', saveEdit);
        editInput.addEventListener('keypress', e => {
            if (e.key === 'Enter') saveEdit();
        });
    });

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '🗑️';
    deleteButton.className = 'delete';
    li.appendChild(deleteButton);

    deleteButton.addEventListener('click', () => {
        taskList.removeChild(li);
        saveData();
    });

    taskList.appendChild(li);
}

// adding new task when "Add task" is clicked
addButton.addEventListener('click', () => {
    if (inputBox.value.trim() === "") return; // prevent empty tasks
    createTask({ text: inputBox.value, completed: false });
    inputBox.value = "";
    saveData();
});

// adding new task when "Enter" is pressed
inputBox.addEventListener('keydown', function(e)
{
    if(e.key === "Enter")
    {
        createTask({ text: inputBox.value, completed: false });
        inputBox.value = "";
        saveData();
    }
});

// this function is storing raw data in localStorage
// so when you load tasks back from localStorage (using storedTasks())
// then the <li> elements come back as plain HTML only.
// the event listeners added to checkbox, edit button or delete
// button don't get restored because even listeners aren't saved in innerHTML.
// hence, after refreshing button/checkboxes won't work.
// so i have to modify saveData() to store tasks in an array of objects

//for example:[
// {text:"Buy milk", completed: False},
// {text:"Go to college", completed: True}
// ]

// function saveData()
// {
//     localStorage.setItem('data', taskList.innerHTML);
// }

//here instead of saving raw HTM, i am storing tasks in an array of objects
function saveData() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        const text = li.querySelector('span').innerText;
        const completed = li.querySelector('input[type="checkbox"]').checked;
        tasks.push({ text, completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Load tasks from localStorage
function loadTasks() {
    const stored = JSON.parse(localStorage.getItem('tasks')) || [];
    stored.forEach(task => createTask(task));
}

loadTasks();

const dropDown = document.getElementById("dropDownMenu");
// displays all tasks when "All" selected
// displays unchecked tasks when "Pending" selected
//displays checked tasks when "Completed" selected
document.getElementById('dropDownMenu').addEventListener('change', function() {
    const filter = this.value; // All, Pending, Completed
    const stored = JSON.parse(localStorage.getItem('tasks')) || [];

    // clear current list
    taskList.innerHTML = '';

    stored.forEach(task => {
        if (
            filter === 'All' ||
            (filter === 'Completed' && task.completed) ||
            (filter === 'Pending' && !task.completed)
        ) {
            createTask(task);
        }
    });
});

const daySwitch = document.getElementById('day');
const nightSwitch = document.getElementById('night');
const body = document.body;

// Apply saved theme on page load
window.addEventListener("load", () => {
    const savedTheme = localStorage.getItem("theme") || "day";
    body.classList.add(savedTheme);
});

// Switch to day mode
daySwitch.addEventListener("click", () => {
    body.classList.remove("night");
    body.classList.add("day");
    localStorage.setItem("theme", "day");
});

// Switch to night mode
nightSwitch.addEventListener("click", () => {
    body.classList.remove("day");
    body.classList.add("night");
    localStorage.setItem("theme", "night");
});














