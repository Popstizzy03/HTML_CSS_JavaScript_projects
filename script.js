let tasks = [];

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');

  if (taskInput.value === '') {
    alert('Please enter a task');
    return;
  }

  const task = {
    text: taskInput.value,
    completed: false
  };
  tasks.push(task);
  saveTasksToLocalStorage();

  const newTaskLi = document.createElement('li');
  newTaskLi.textContent = task.text;
  newTaskLi.id = task.text;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = () => deleteTask(task.text);

  const completeButton = document.createElement('button');
  completeButton.textContent = 'Complete';
  completeButton.onclick = () => completeTask(task.text);

  newTaskLi.appendChild(deleteButton);
  newTaskLi.appendChild(completeButton);

  taskList.appendChild(newTaskLi);

  taskInput.value = '';
}

function deleteTask(taskText) {
  const taskIndex = tasks.findIndex(task => task.text === taskText);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    saveTasksToLocalStorage();
    const taskElement = document.getElementById(taskText);
    taskElement.remove();
  }
}

function completeTask(taskText) {
  const task = tasks.find(task => task.text === taskText);
  if (task) {
    task.completed = !task.completed;
    saveTasksToLocalStorage();
    const taskElement = document.getElementById(taskText);
    taskElement.classList.toggle('completed');
  }
}

function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    tasks.forEach(task => {
      addTaskToUI(task);
    });
  }
}

function addTaskToUI(task) {
  // Similar to addTask function, but without saving to local storage
}

loadTasksFromLocalStorage();
