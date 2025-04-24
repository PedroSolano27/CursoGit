// Seleção
const todoForm = document.querySelector("#todo-form");              //
const todoInput = document.querySelector("#todo-input");            //
const todoList = document.querySelector("#todo-list");              // 
const editForm = document.querySelector("#edit-form");              //
const editInput = document.querySelector("#edit-input");            // Seletores
const cancelEdBtn = document.querySelector("#cancel-edit-btn");     //
const searchInput = document.querySelector("#search-input");        //
const eraseBtn = document.querySelector("#erase-btn");              //
const filterSlt = document.querySelector("#filter-select");         //


//Variáveis
let oldInputValue;                                                  // Variável de Título


// Eventos
document.addEventListener("click", function(e){                     // Botões da Tarefa
    const target = e.target;
    const parent = target.closest("section");
    let taskTitle;

    if(parent && parent.querySelector("h3")){ 
        taskTitle = parent.querySelector("h3").innerText; 
    }

    if(target.classList.contains("task-finish")){ 
        parent.classList.toggle("done"); 
        updateTaskStatus(taskTitle);
    } 

    if (target.classList.contains("task-edit")){ 
        toggleForm();
        editInput.value = taskTitle;
        oldInputValue = taskTitle;
    } 

    if (target.classList.contains("task-delete")){ 
        parent.remove();
        removeTasks(taskTitle);
    }

});

todoForm.addEventListener("submit", function(e){                    // Botão de Salvar
    e.preventDefault();

    const inputValue = todoInput.value;
    if(!inputValue){ 
        alert("Nenhum dado inserido!"); 
        return; 
    }
    saveTask(inputValue);
});

cancelEdBtn.addEventListener("click", function(e){                  // Botão de Cancelar
    e.preventDefault(); 
    toggleForm();
});

editForm.addEventListener("submit", function(e){                    // Botão de Atualizar
    e.preventDefault();
     
    const editValue = editInput.value;
    if(!editValue){return;}

    updateTask(editValue);
    toggleForm();
});

searchInput.addEventListener("keyup", function(e){                  // Barra de Pesquisa
    const search = e.target.value;
    getSearchedTask(search);
});

eraseBtn.addEventListener("click", function(e){                     // Botão de Limpar Busca
    e.preventDefault();

    searchInput.value = "";

    const tasks = document.querySelectorAll(".task");
    searchInput.dispatchEvent(new Event ("keyup"));
});

filterSlt.addEventListener("change", function(e){                   // Seletor de Filtro
    const filter = e.target.value;
    filterTasks(filter);
});


// Funções
function saveTask(text, done = 0, save = 1){                        // Salvar Tarefa
    const task = document.createElement("section");
    task.classList.add("task");

    const taskTitle = document.createElement("h3");
    taskTitle.innerText = text;

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("task-finish");
    doneBtn.innerHTML = `<i class="fa-solid fa-check"></i>`

    const editBtn = document.createElement("button");
    editBtn.classList.add("task-edit");
    editBtn.innerHTML = `<i class="fa-solid fa-pen"></i>`

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("task-delete");
    deleteBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`

    task.appendChild(taskTitle);
    task.appendChild(doneBtn);
    task.appendChild(editBtn);
    task.appendChild(deleteBtn);

    if(done){ task.classList.add("done"); }
    if(save){ saveTaskLocalStorage({text, done}); }
    todoList.appendChild(task);

    todoInput.value = "";
    todoInput.focus();
}

function toggleForm(){                                              // Alternar Formulários
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

function updateTask(text){                                          // Atualizar Tarefa
    const tasks = document.querySelectorAll(".task");

    tasks.forEach((task) => {
        let taskTitle = task.querySelector("h3");
        if(taskTitle.innerText === oldInputValue){
            taskTitle.innerText = text;
            updateTaskText(oldInputValue, text);
        }
    });
}

function getSearchedTask(search){                                   // Pesquisar Tarefa
    const tasks = document.querySelectorAll(".task");

    tasks.forEach((task) => {
        let taskTitle = task.querySelector("h3").innerText.toLowerCase();
        const normalSearch = search.toLowerCase();

        task.style.display = "flex";
        if(!taskTitle.includes(normalSearch)){
            task.style.display = "none";
        }
    });
}

function filterTasks(filter){                                       // Filtrar Tarefas
    const tasks = document.querySelectorAll(".task");

    switch(filter){
        case "all":
            tasks.forEach((task) =>{ 
                task.style.display = "flex" 
            });
        break;
        case "done":
            tasks.forEach((task) =>{ 
                if(task.classList.contains("done")){
                    task.style.display = "flex" 
                } else {
                    task.style.display = "none" 
                }
            });
        break;
        case "todo":
            tasks.forEach((task) =>{ 
                if(!task.classList.contains("done")){
                    task.style.display = "flex" 
                } else {
                    task.style.display = "none" 
                }
            });
        break;
        default:
        break;
    }
}


// Local Storage
function getTasks(){                                                // Pega as Tarefas no Local Storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return tasks;
}

function saveTaskLocalStorage(task){                                // Salvar Tarefas no Local Storage
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks(){                                            // Carrega Tarefas do Local Storage
    const tasks = getTasks();
    tasks.forEach((task) =>{
        saveTask(task.text, task.done, 0);
    });
}

function removeTasks(text){                                         // Deleta Tarefa no Local Storage
    const tasks = getTasks();

    const filtereredTasks = tasks.filter((task) => task.text !== text);
    localStorage.setItem("tasks", JSON.stringify(filtereredTasks));
}

function updateTaskStatus(text){                                    // Atualiza Status da Tarefa no Local Storage
    const tasks = getTasks();

    tasks.map((task) => task.text === text ? (task.done = !task.done) : null);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskText(oldText, newText){                          // Atualiza Texto da Tarefa no Local Storage
    const tasks = getTasks();

    tasks.map((task) => task.text === oldText ? (task.text = newText) : null);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


//Inicialização
displayTasks();                                                     // Inicialização