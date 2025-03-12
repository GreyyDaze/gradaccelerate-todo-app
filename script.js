const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskListContainer = document.getElementById("task-list-container");
const taskListItemDesc = document.querySelector(".task-list-item .task-desc");
const taskListItem = document.querySelector(".task-list-item");
const cloneTaskListItem = taskListItem.cloneNode(true);
const notasks = document.getElementById("no-tasks");
let taskListArray = JSON.parse(localStorage.getItem("task-list"))
  ? JSON.parse(localStorage.getItem("task-list"))
  : [];

// add task from input to local storage
addBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const task = taskInput.value;

  if (addBtn.textContent.trim() === "Add Task") {
    if (task && !taskListArray.includes(task)) {
      taskListArray.push(task);
      localStorage.setItem("task-list", JSON.stringify(taskListArray));
      taskInput.value = "";
    }
    taskListHtml();
  } else if (addBtn.textContent === "Update Task") {
    let taskIndex = taskListArray.indexOf(taskDescription.textContent);
    taskDescription.textContent = taskInput.value;
    taskListArray[taskIndex] = taskDescription.textContent;
    localStorage.setItem("task-list", JSON.stringify(taskListArray));
    taskInput.value = "";
    window.location.reload();
  }
});

// for delete event add listener on parent
taskListContainer.addEventListener("click", (event) => {
  if (event.target.alt === "Delete") {
    console.log("here");
    let taskItem = event.target.closest(".task-list-item");
    let taskDescription = taskItem.querySelector(".task-desc");
    let taskIndex = taskListArray.indexOf(taskDescription.textContent);
    taskListArray.splice(taskIndex, 1);
    localStorage.setItem("task-list", JSON.stringify(taskListArray));
    window.location.reload();
  } else if (event.target.alt === "Edit") {
    taskItem = event.target.closest(".task-list-item");
    taskDescription = taskItem.querySelector(".task-desc");
    taskInput.value = taskDescription.textContent;
    taskInput.focus();
    addBtn.textContent = "Update Task";
  }
});

// task first time the page loads
taskListHtml();

// display task in html after adding to local storage
function taskListHtml() {
  const taskList = JSON.parse(localStorage.getItem("task-list"));
  taskListContainer.innerHTML = "";

  if (taskList.length > 0) {
    taskList.forEach((task, index) => {
      const nextTaskElement = taskListItem.cloneNode(true);
      nextTaskElement.querySelector(".task-desc").textContent = task;
      taskListContainer.appendChild(nextTaskElement);
    });
  }

  if (taskList.length > 0) {
    taskListContainer.classList.remove("hidden");
    notasks.classList.add("hidden");
  } else {
    taskListContainer.classList.add("hidden");
    notasks.classList.remove("hidden");
  }
}
