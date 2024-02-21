import { App, inputElement, taskListElement } from "./elements";
import { initTaskListeners } from "./eventListeners";

export const toggleDarkMode = () => {
  App.classList.toggle("App--isDark");
  saveToDB("darkMode", App.classList.contains("App--isDark"));
};

export const fetchData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : false;
};

export const saveToDB = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const renderTaskList = (tasks) => {
  let taskList = "";
  tasks.forEach((task) => {
    taskList += `
    <li class="TaskList__taskContent ${
      task.isCompleted ? "TaskList__taskContent--isActive" : ""
    }">
      <div class="TaskList__checkbox" tabindex="0" role="button">
        <img
          src="./assets/icon-checkmark.svg"
          alt="img"
          class="TaskList__checkboxImg"
        />
      </div>
      <div class="TaskList__valueContent">
        <p class="TaskList__value">${task.value}</p>
        <img
          src="./assets/icon-basket.svg"
          alt="delete icon"
          class="TaskList__deleteIcon"
        />
      </div>
    </li>`;
  });
  taskListElement.innerHTML = taskList;
  inputElement.value = "";
};

export const deleteTask = (e, idx) => {
  const answer = confirm("هل انت متأكد من حذف المهمه ؟");
  if (answer === false) return;

  const tasks = fetchData("tasks");
  tasks.splice(idx, 1);

  saveToDB("tasks", tasks);
  initTaskList(tasks);
};

export const toggleTask = (e, idx) => {
  const tasks = fetchData("tasks");
  e.currentTarget.parentElement.classList.toggle(
    "TaskList__taskContent--isActive"
  );
  tasks[idx].isCompleted = !tasks[idx].isCompleted;
  saveToDB("tasks", tasks);
};

export const addTask = (e) => {
  e.preventDefault();

  const taskValue = inputElement.value;
  if (!taskValue) return;

  const task = {
    value: taskValue,
    isCompleted: false,
  };

  const tasks = fetchData("tasks") || [];
  tasks.push(task);

  saveToDB("tasks", tasks);
  initTaskList(tasks);
};

export const renderEmptyState = () => {
  taskListElement.innerHTML = `
    <li class="EmptyList">
      <img
        src="./assets/icon-empty.svg"
        alt="list is empty"
        class="EmptyList__img"
      />
      <p>قائمه المهام فارغه</p>
    </li>`;
};

export const initTaskList = (tasks) => {
  if (tasks?.length) {
    renderTaskList(tasks);
    initTaskListeners();
  } else {
    renderEmptyState();
  }
};

export const initDataOnStartup = () => {
  fetchData("darkMode") && toggleDarkMode();
  initTaskList(fetchData("tasks"));
};
