import {
  darkThemeToggle,
  getCheckboxElements,
  getDeleteIcons,
  searchButtonElement,
  taskListElement,
  taskListLink,
} from "./elements";
import { addTask, deleteTask, toggleDarkMode, toggleTask } from "./utils";

export const initTaskListeners = () => {
  getDeleteIcons().forEach((icon, idx) =>
    icon.addEventListener("click", (e) => deleteTask(e, idx))
  );
  getCheckboxElements().forEach((checkbox, idx) => {
    checkbox.addEventListener("click", (e) => toggleTask(e, idx));
    checkbox.addEventListener(
      "keydown",
      (e) => e.key === "Enter" && toggleTask(e, idx)
    );
  });
};

export const initListeners = () => {
  darkThemeToggle.addEventListener("click", toggleDarkMode);

  searchButtonElement.addEventListener("click", addTask);

  taskListLink.addEventListener("click", () => {
    taskListElement.classList.toggle("TaskList__list--hideCompleted");
    taskListLink.classList.toggle("TaskList__link--isActive");
  });
};
