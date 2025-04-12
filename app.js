const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

loadTasksFromLocalStorage();


taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskInput = document.getElementById("task-input");
  const task = taskInput.value.trim();

  if (task) {
    // Crear nuevo <li>
    const taskItem = document.createElement("li");

    // Crear contenedor del texto
    const taskContent = document.createElement("div");
    taskContent.textContent = task;

    // Crear contenedor para botones
    const taskActions = document.createElement("div");

    // Botón de eliminar
    const deleteBtn = document.createElement("span");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";

    // Botón de editar
    const editBtn = document.createElement("span");
    editBtn.classList.add("edit-btn");
    editBtn.textContent = "Edit";

    // Añadir botones al contenedor
    taskActions.appendChild(deleteBtn);
    taskActions.appendChild(editBtn);

    // Añadir texto y botones al <li>
    taskItem.appendChild(taskContent);
    taskItem.appendChild(taskActions);

    // Agregar <li> a la lista
    taskList.appendChild(taskItem);

    // Limpiar input
    storeTaskInLocalStorage(task);
    taskInput.value = "";
  }
});

// 🧠 DELEGAR eventos para borrar y editar (también para los que ya existen)

taskList.addEventListener("click", (event) => {
    const target = event.target;
  
    // 🔥 Eliminar tarea
    if (target.classList.contains("delete-btn")) {
        const li = target.closest("li");
        if (li) {
          const taskContent = li.querySelector("div:first-child")?.textContent;
          li.remove();
      
          // Eliminar del localStorage
          let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
          tasks = tasks.filter((t) => t !== taskContent);
          localStorage.setItem("tasks", JSON.stringify(tasks));
        }
      }

  
    // ✏️ Editar tarea
    if (target.classList.contains("edit-btn")) {
      const li = target.closest("li");
      const taskContent = li?.querySelector("div:first-child");
      if (taskContent) {
        const newTask = prompt("Edit task:", taskContent.textContent);
        if (newTask !== null && newTask.trim() !== "") {
          taskContent.textContent = newTask.trim();
          updateLocalStorage()
        }
      }
    }
});

function storeTaskInLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    // Check if the task already exists
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.forEach((task) => {
      const taskItem = document.createElement("li");
      const taskContent = document.createElement("div");
      taskContent.textContent = task;
  
      const taskActions = document.createElement("div");
  
      const deleteBtn = document.createElement("span");
      deleteBtn.classList.add("delete-btn");
      deleteBtn.textContent = "Delete";
  
      const editBtn = document.createElement("span");
      editBtn.classList.add("edit-btn");
      editBtn.textContent = "Edit";
  
      taskActions.appendChild(deleteBtn);
      taskActions.appendChild(editBtn);
  
      taskItem.appendChild(taskContent);
      taskItem.appendChild(taskActions);
  
      taskList.appendChild(taskItem);
    });
}

// Update local storage when tasks are added or removed
function updateLocalStorage() {
    const tasks = [];
    taskList.querySelectorAll("li").forEach((li) => {
        const taskContent = li.querySelector("div:first-child");
        if (taskContent) {
            tasks.push(taskContent.textContent);
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Clear local storage (optional)
// localStorage.clear();
function clearLocalStorage() {
    localStorage.removeItem("tasks");
    taskList.innerHTML = ""; // Clear the displayed tasks
}

const toggleCheckbox = document.getElementById("toggle-theme-checkbox");

toggleCheckbox.addEventListener("change", () => {
  document.body.classList.toggle("dark-theme", toggleCheckbox.checked);
});

// Al cargar la página
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
    toggleCheckbox.checked = true;
  }
  
  toggleCheckbox.addEventListener("change", () => {
    document.body.classList.toggle("dark-theme", toggleCheckbox.checked);
    localStorage.setItem("theme", toggleCheckbox.checked ? "dark" : "light");
  });
