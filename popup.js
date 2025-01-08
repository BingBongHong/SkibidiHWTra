document.addEventListener("DOMContentLoaded", function () {
  const taskForm = document.getElementById("taskForm");
  const taskList = document.getElementById("taskList");

  taskForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const taskName = document.getElementById("taskName").value;
    const taskDueDate = document.getElementById("taskDueDate").value;
    const taskPriority = document.getElementById("taskPriority").value;

    const task = {
      name: taskName,
      dueDate: taskDueDate,
      priority: taskPriority,
      completed: false
    };

    saveTask(task);
    renderTask(task);
    taskForm.reset();
  });

  function saveTask(task) {
    chrome.storage.sync.get("tasks", function (data) {
      const tasks = data.tasks || [];
      tasks.push(task);
      chrome.storage.sync.set({ tasks });
    });
  }

  function renderTask(task) {
    const li = document.createElement("li");
    li.textContent = `${task.name} - Due: ${task.dueDate} - Priority: ${task.priority}`;

    const completeButton = document.createElement("button");
    completeButton.textContent = "Mark Complete";
    completeButton.addEventListener("click", function () {
      li.style.textDecoration = "line-through";
      task.completed = true;
    });

    li.appendChild(completeButton);
    taskList.appendChild(li);
  }

  // Load existing tasks on startup
  chrome.storage.sync.get("tasks", function (data) {
    const tasks = data.tasks || [];
    tasks.forEach(renderTask);
  });
});
