// Create task 
const addTaskModal = document.getElementById('addTaskModal');
const addTask = document.getElementById('addTask');
const cancel = document.getElementById('cancel');

// Popup Open and Close
addTask.addEventListener('click',function(){
    addTaskModal.classList.remove('hidden');
});
cancel.addEventListener('click', function(){
    addTaskModal.classList.add('hidden');
});

//

// Affiche Task
// save localstorage
// clear inputs
// read
// count total
// delete
// search 
// clean data