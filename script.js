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

console.log("taskListContainer", taskListContainer, notasks);
// add task from input to local storage
addBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const task = taskInput.value;

  if (task && !taskListArray.includes(task)) {
    taskListArray.push(task);
    localStorage.setItem("task-list", JSON.stringify(taskListArray));
    taskInput.value = "";
  }
  taskListHtml();
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
  }
});

// task first time the page loads
taskListHtml();

// display task in html after adding to local storage
function taskListHtml() {
  const taskList = JSON.parse(localStorage.getItem("task-list"));
  taskListContainer.innerHTML = "";

  console.log("taskList", taskList);
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
