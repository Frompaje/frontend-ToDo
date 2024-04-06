import { iTask } from "../types/index.ts";
import {
  addDescription,
  addTitle,
  select,
  tbody,
  spanLegth,
  spanDescriptio,
} from "../constants/index.ts";
import { createRow } from "../createRow/createRow.ts";
import { API_URL } from "../config/index.ts";

spanLegth.innerText = `
  The maximum number of letters is 20`;

spanDescriptio.innerText = `
  The maximum number of letters is 50`;

addTitle.addEventListener("keyup", () => {
  spanLegth.innerText = `
  Remaining letters: ${20 - Number(addTitle.value.length)}`;
});

addDescription.addEventListener("keyup", () => {
  spanDescriptio.innerText = `
  Remaining letters: ${50 - Number(addDescription.value.length)}`;
});

export class Task {
  async returnAll() {
    const response = await fetch(API_URL);
    const tasks: iTask[] = await response.json();
    return tasks;
  }

  async load() {
    const tasks = await this.returnAll();
    tasks.forEach((task) => {
      createRow(task);
    });
  }

  async create(event: SubmitEvent) {
    if (!addTitle.value || !addDescription.value) {
      return;
    }
    event.preventDefault();

    const task = {
      title: addTitle.value,
      description: addDescription.value,
      status: select.value,
    };

    await fetch(API_URL, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });

    this.load();
    if (tbody && addTitle && addDescription) {
      tbody.innerText = "";
      addTitle.value = "";
      addDescription.value = "";
      return;
    }
  }
  async update(title: string, description: string, status: string, id: string) {
    const task = {
      id: id,
      title: title,
      description: description,
      status: status,
    };
    await fetch(API_URL, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
  }

  async delete(id: string) {
    const task = {
      id: id,
    };
    await fetch(API_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
  }
}
