const addTaskModal = document.getElementById('addTaskModal');
const addTask = document.getElementById('addTask');
const cancel = document.getElementById('cancel');
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const taskStatus = document.getElementById('taskStatus');
const taskDate = document.getElementById('taskDate');
const taskPriority = document.getElementById('taskPriority');
const addTaskBtn = document.getElementById('addTaskBtn');
const totalTaskTodo = document.getElementById('todoTotal');
const totalTaskDoing = document.getElementById('doingTotal');
const totalTaskDone = document.getElementById('doneTotal');
let tasks = [];

// Popup Open and Close
addTask.addEventListener('click', function() {
    addTaskModal.classList.remove('hidden');
});

cancel.addEventListener('click', function() {
    addTaskModal.classList.add('hidden');
});

// Clear inputs of forms 
function clearInputs() {
    taskTitle.value = '';
    taskDescription.value = '';
    taskStatus.value = '';
    taskDate.value = '';
    taskPriority.value = '';
}

// Update Total Counter Span 
function updateTaskCounters() {
    let todoCount = 0;
    let doingCount = 0;
    let doneCount = 0;

    tasks.forEach(task => {
        if (task.status === 'todo') todoCount++;
        else if (task.status === 'doing') doingCount++;
        else if (task.status === 'done') doneCount++;
    });

    totalTaskTodo.textContent = todoCount;
    totalTaskDoing.textContent = doingCount;
    totalTaskDone.textContent = doneCount;
}

// Add Task
addTaskBtn.addEventListener('click', function() {
    const newTask = {
        title: taskTitle.value,
        description: taskDescription.value,
        status: taskStatus.value,
        date: taskDate.value,
        priority: taskPriority.value
    };

    tasks.push(newTask);
    console.log(tasks.length);
    clearInputs(); 
    updateTaskCounters();
    addTaskModal.classList.add('hidden');
    displayTask();
});

// Display Task 
function displayTask() {
    const todo = document.getElementById('todoContainer');
    const doing = document.getElementById('doingContainer');
    const done = document.getElementById('doneContainer');
    todo.innerHTML = "";
    doing.innerHTML = "";
    done.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
        const status = tasks[i].status.toLowerCase();
        if (status === 'todo') {
            createHtml(todo, tasks[i]); // Pass the current task to createHtml
        } else if (status === 'doing') {
            createHtml(doing, tasks[i]);
        } else if (status === 'done') {
            createHtml(done, tasks[i]);
        }
    }
}

// Create Task card 
function createHtml(placeholder, task) { 
    const div = document.createElement('div');

    let borderColorClass;
    if (task.priority === 'P0') {
        borderColorClass = 'border-red-500';
    } else if (task.priority === 'P1') {
        borderColorClass = 'border-yellow-400';
    } else if (task.priority === 'P2') {
        borderColorClass = 'border-green-500';
    }

    div.innerHTML = `<div class="p-4 border-l-4 ${borderColorClass} bg-gray-50 rounded-lg flex justify-between items-center" draggable="true">
                        <div>
                            <h3 class="font-semibold" draggable="true">${task.title}</h3>
                            <p class="text-sm text-gray-500">Due: ${task.date}</p>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button class="text-red-500 hover:text-red-700">Delete</button>
                            <button class="text-yellow-500 hover:text-yellow-700">Edit</button>
                        </div>
                    </div>`;
    placeholder.appendChild(div);
}

