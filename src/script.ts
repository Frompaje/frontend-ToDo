import { addForm } from "./constants/index.ts";
import { Task } from "./service/tasks.ts";
const taskModels = new Task();

addEventListener("DOMContentLoaded", () => {
  taskModels.load();
});

addForm?.addEventListener("submit", (event) => {
  taskModels.create(event);
});
