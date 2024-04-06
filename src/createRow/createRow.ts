import {
  btnNo,
  btnYes,
  modal,
  modalConstrols,
  select,
  tbody,
  main,
  app,
} from "../constants";
import { Task } from "../service/tasks";
import { iTask } from "../types";

export function createRow(tasks: iTask) {
  const taskModels = new Task();
  const { title, description, status, created_at, id } = tasks;
  const tr = document.createElement("tr");
  const tdTask = document.createElement("td");
  const tdDescription = document.createElement("td");
  const tdCreate_At = document.createElement("td");
  const tdStatus = document.createElement("td");
  const tdActions = document.createElement("td");
  const elementP = document.createElement("p");
  const spanTask = document.createElement("span");
  const spanDescription = document.createElement("span");
  const spanStatus = document.createElement("span");
  const spanCreate_At = document.createElement("span");
  const buttonPen = document.createElement("button");
  const buttonTrash = document.createElement("button");
  const buttonSubmit = document.createElement("button");
  const buttonExit = document.createElement("button");
  const iconExit = document.createElement("i");
  const iconSubmit = document.createElement("i");
  const iconPen = document.createElement("i");
  const iconTrash = document.createElement("i");
  const inputTask = document.createElement("input");
  const inputDescription = document.createElement("input");
  const inputStatus = document.createElement("input");
  const selectStatus = document.createElement("select");

  selectStatus.innerHTML = `
  <option value="Pending">Pending</option>
  <option value="In progress">In progress</option>
  <option value="Completed">Completed</option>
`;

  spanTask.innerText = title;
  spanDescription.innerText = description;
  spanCreate_At.innerText = new Date(created_at).toLocaleDateString("pt-br");
  spanStatus.innerText = status;

  tr.appendChild(tdTask);
  tr.appendChild(tdDescription);
  tr.appendChild(tdCreate_At);
  tr.appendChild(tdStatus);
  tr.appendChild(tdActions);
  tdStatus.appendChild(spanStatus);
  tdActions.appendChild(buttonPen);
  tdActions.appendChild(buttonTrash);
  buttonPen.appendChild(iconPen);
  buttonTrash.appendChild(iconTrash);
  tdTask.appendChild(spanTask);
  tdDescription.appendChild(spanDescription);
  elementP.appendChild(spanStatus).setAttribute("value", "options");
  tdStatus.appendChild(spanStatus);
  tdCreate_At.appendChild(spanCreate_At);

  elementP.classList.add("select");
  buttonPen.setAttribute("class", "btn-pen btn-action ");
  buttonTrash.setAttribute("class", "btn-trash btn-action ");
  iconPen.setAttribute("class", "bx bx-pencil");
  iconTrash.setAttribute("class", "bx bx-trash");

  buttonPen.addEventListener("click", () => {
    buttonSubmit.appendChild(iconSubmit);
    buttonExit.appendChild(iconExit);
    tdActions.appendChild(buttonSubmit);
    tdActions.appendChild(buttonExit);
    tdActions.removeChild(buttonPen);
    tdActions.removeChild(buttonTrash);

    buttonSubmit.setAttribute("class", "bx bx-check-circle");
    buttonExit.setAttribute("class", "bx bx-x-circle");
    buttonPen.classList.add("active");
    tr.classList.toggle("active");
    tdTask.classList.toggle("active");
    tdDescription.classList.toggle("active");
    tdStatus.classList.toggle("active");

    tdTask.innerText = "";
    inputTask.value = title;
    tdTask.appendChild(inputTask);

    tdDescription.innerText = "";
    inputDescription.value = description;
    tdDescription.appendChild(inputDescription);

    tdStatus.innerText = "";
    inputStatus.value = status;
    tdStatus.appendChild(selectStatus);
  });

  buttonSubmit.addEventListener("click", () => {
    taskModels.update(
      inputTask.value,
      inputDescription.value,
      selectStatus.value,
      id
    );
    spanTask.innerText = inputTask.value;
    tdTask.appendChild(spanTask);
    tdTask.removeChild(inputTask);

    spanDescription.innerText = inputDescription.value;
    tdDescription.appendChild(spanDescription);
    tdDescription.removeChild(inputDescription);

    spanStatus.innerText = selectStatus.value;
    tdStatus.appendChild(spanStatus);
    tdStatus.removeChild(selectStatus);

    tr.classList.toggle("active");

    tdActions.appendChild(buttonPen);
    tdActions.removeChild(buttonSubmit);

    tdActions.appendChild(buttonPen);
    tdActions.removeChild(buttonExit);

    tdActions.appendChild(buttonTrash);
    console.log("a alteração foi enviada");
  });

  buttonExit.addEventListener("click", () => {
    tr.classList.remove("active");
    spanTask.classList.add("remove");
    tdActions.appendChild(buttonPen);
    tdActions.appendChild(buttonTrash);
    tdActions.removeChild(buttonSubmit);
    tdActions.removeChild(buttonExit);

    spanTask.innerText = inputTask.value;
    tdTask.appendChild(spanTask);
    tdTask.removeChild(inputTask);

    spanDescription.innerText = inputDescription.value;
    tdDescription.appendChild(spanDescription);
    tdDescription.removeChild(inputDescription);

    spanStatus.innerText = select.value;
    tdStatus.appendChild(spanStatus);
    tdStatus.removeChild(selectStatus);
  });

  buttonTrash.addEventListener("click", () => {
    modal?.classList.add("active");
    modalConstrols.classList.add("active");
    btnNo?.classList.remove("active");
    main.classList.add("blur");
    app.classList.add("blur");

    let trashId = id;
    let coin = 0;
    btnYes?.addEventListener("click", () => {
      ++coin;
      btnYes?.classList.add("active");
      setTimeout(() => {
        btnYes?.classList.remove("active");
        modal.classList.remove("active");
        modalConstrols.classList.remove("active");
        main.classList.remove("blur");
        app.classList.remove("blur");
        taskModels.delete(trashId);
        tbody.innerText = "";
        taskModels.load();
        location.reload();
      }, 350);
    });
  });

  btnNo?.addEventListener("click", () => {
    main.classList.remove("blur");
    app.classList.remove("blur");
    btnNo?.classList.add("active");
    setTimeout(() => {
      btnNo?.classList.remove("active");
      modal.classList.remove("active");
    }, 350);
  });

  tbody?.appendChild(tr);
}
