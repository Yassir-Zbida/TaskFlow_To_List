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
const editTask = document.getElementById('editTaskModal');
const editBtn = document.getElementById('taskedit');
const cancelEditTask = document.getElementById('cancelEditTask');

const editTaskTitle = document.getElementById('editTaskTitle');
const editTaskDescription = document.getElementById('editTaskDescription');
const editTaskStatus = document.getElementById('editTaskStatus');
const editTaskDate = document.getElementById('editTaskDate');
const editTaskPriority = document.getElementById('editTaskPriority');
const editTaskBtn = document.getElementById('editTaskBtn');
let drag = null ;


let tasks = [];

// Popup Open and Close
addTask.addEventListener('click', function() {
    addTaskModal.classList.remove('hidden');
});

cancel.addEventListener('click', function() {
    addTaskModal.classList.add('hidden');
});
 // Add Task Form Validation
function validateTaskForm() {
    let errorMessage = '';

    if (!taskTitle.value.trim()) {
        errorMessage += 'Task title is required.\n';
    }

    if (!taskDescription.value.trim()) {
        errorMessage += 'Task description is required.\n';
    }

    const dueDate = new Date(taskDate.value);
    const today = new Date();
    if (!taskDate.value) {
        errorMessage += 'Due date is required.\n';
    } else if (dueDate < today.setHours(0, 0, 0, 0)) {
        errorMessage += 'Due date must be today or a future date.\n';
    }

    if (!taskPriority.value) {
        errorMessage += 'Please select a priority level.\n';
    }

    if (!taskStatus.value) {
        errorMessage += 'Please select a task status.\n';
    }

    if (errorMessage) {
        alert(errorMessage);
        return false;
    }
    return true;
}


// Add Task
addTaskBtn.addEventListener('click', function() {
    if (!validateTaskForm()) {
        return; 
    }
    const newTask = {
        title: taskTitle.value,
        description: taskDescription.value,
        status: taskStatus.value,
        date: taskDate.value,
        priority: taskPriority.value
    };

    tasks.push(newTask);

    clearInputs(); 
    updateTaskCounters();
    
    addTaskModal.classList.add('hidden');
    displayTask();
});
function hideModal(){
    editTask.classList.add('hidden');

    
}

// Edit Popup 
function showEditModal(index) {
    editTask.classList.remove('hidden');
    editTaskTitle.value = tasks[index].title;
    editTaskDescription.value = tasks[index].description;
    editTaskStatus.value = tasks[index].status;
    editTaskDate.value = tasks[index].date;
    editTaskPriority.value = tasks[index].priority;
    editTaskBtn.onclick = function() {
        editTaskFunction(index);
    };
}
// Edit task 
function editTaskFunction(index) {
    tasks[index] = {
        title: editTaskTitle.value,
        description: editTaskDescription.value,
        status: editTaskStatus.value,
        date: editTaskDate.value,
        priority: editTaskPriority.value
    };
    displayTask();
    hideModal();
    updateTaskCounters();
}



// close PopUp 
function closeEditModal(){
    editTask.classList.add('hidden');
}

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
            createHtml(todo, tasks[i],i); 
        } else if (status === 'doing') {
            createHtml(doing, tasks[i], i);
        } else if (status === 'done') {
            createHtml(done, tasks[i],i);
        }
    }
    
}

// delete task 
function deleteTask(index) {
    const taskContainers = document.querySelectorAll('.taskContainer');
    const taskToRemove = taskContainers[index];
    taskToRemove.classList.add('transition-opacity', 'duration-500', 'opacity-0');
    setTimeout(() => {
        tasks.splice(index, 1);
        displayTask();
        updateTaskCounters();
    }, 500);
}

// Create Task card 
function createHtml(placeholder, task, index) { 
    const div = document.createElement('div');
    let borderColorClass;
    let bgColor;

    if (task.priority === 'P0') {
        borderColorClass = 'border-red-500';
        bgColor = 'bg-red-500/[.08]';
    } else if (task.priority === 'P1') {
        borderColorClass = 'border-yellow-400';
        bgColor = 'bg-yellow-500/[.08]';
    } else if (task.priority === 'P2') {
        borderColorClass = 'border-green-500';
        bgColor = 'bg-green-500/[.08]';
    }

    div.classList.add(
        'taskContainer', 'p-4', 'border-l-4', borderColorClass, bgColor,
        'rounded-lg', 'flex', 'flex-col', 'space-y-2', 'transition-opacity', 
        'duration-500', 'opacity-0'
    );

    div.innerHTML = `
        <div class="flex flex-col space-y-1">
            <h3 class="font-semibold text-lg text-gray-900 overflow-hidden whitespace-normal break-words">
                ${task.title}
            </h3>
            <p class="text-sm text-gray-500 mb-2 overflow-hidden text-ellipsis whitespace-normal break-words">
                Due: ${task.date}
            </p>
            <p class="text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-normal break-words">
                ${task.description}
            </p>
        </div>
        <div class="flex items-center space-x-2">
            <button onclick="deleteTask(${index})" class="text-red-500 hover:text-red-700">Delete</button>
            <button onclick="showEditModal(${index})" class="text-yellow-500 hover:text-yellow-700">Edit</button>
        </div>
    `;

    placeholder.appendChild(div);

    setTimeout(() => {
        div.classList.remove('opacity-0');
    }, 50);
}
