const addTaskModal = document.getElementById('addTaskModal');
const addTask = document.getElementById('addTask');
const cancel = document.getElementById('cancel');
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const taskStatus = document.getElementById('taskStatus');
const taskDate = document.getElementById('taskDate');
const taskPriority = document.getElementById('taskPriority');
const addTaskBtn = document.getElementById('addTaskBtn');
const todoDiv = document.getElementById('todoContainer');
const totalTask = document.getElementById('total');
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
    console.log(tasks.length)
    totalTask.innerHTML =  tasks.length ;
    clearInputs(); 
    
    addTaskModal.classList.add('hidden'); 
});

// Display Task 
function displayTasks() {
    
}


