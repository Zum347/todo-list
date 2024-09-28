const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoFilter = document.querySelector(".filter-todo");
const todoList = document.querySelector(".todo-list");

// alert

const alertWarning = document.querySelector(".alert-warning");
const alertSuccess = document.querySelector(".alert-success");

//events

document.addEventListener("DOMContentLoaded", function () {
  getTodos();
});

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
todoFilter.addEventListener("click", filterTodo);

//function

function addTodo(e) {
  e.preventDefault();
  const isEmpty = (str) => !str.trim().length;

  if (isEmpty(todoInput.value)) {
    alertWarning.style.display = "block";
    setTimeout(() => {
      alertWarning.style.display = "none";
    }, 1500);

    // clear todo input value

   todoInput.value = "";

} else{
    alertSuccess.style.display = "block";
    setTimeout(() => {
    alertSuccess.style.display ="none";
    }, 1500);

    saveLocalTodos(todoInput.value);


   //create todo div

   const todoDıv = document.createElement("div");
   todoDıv.classList.add("todo");

   // check mark button

   const completedButton = document.createElement("button");
   completedButton.innerHTML = "<i class= 'fas fa-check-circle'></i>";
   completedButton.classList.add("complete-btn");
   todoDıv.appendChild(completedButton);


   //check todo li
    
   const newTodo = document.createElement("li");
   newTodo.innerHTML = todoInput.value;
   newTodo.classList.add("todo-item");
   todoDıv.appendChild(newTodo); 

   //check trash button 
   const trashButton = document.createElement("button");
   trashButton.innerHTML = "<i class='fa fa-minus-circle'></i>";
        todoDıv.appendChild(trashButton);

        // append to list 
        todoList.appendChild(todoDıv);

        // clear todo input value
        todoInput.value = "";
    
    
}}


      function deleteCheck(e) {   
      const item = e.target


     //delete todo
     if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocaleStorage(todo)
        todo.addEventListener("transitionend", function(){
            todo.remove();
        })
     }


      // check mark

      if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed")
      }
    }

    function filterTodo(e) {
        const todos = todoList.childNodes;
        todos.forEach(function (item) {
            switch (e.target.value) {
                case "all":
                    item.style.display = "flex";
                    break;
                case "completed":
                    if (item.classList.contains("completed")) {
                        item.style.display = "flex";
                    } else {
                        item.style.display = "none";
                    }
                    break;
                case "uncompleted":
                    if (!item.classList.contains("completed")) {
                        item.style.display = "flex";
                    } else {
                        item.style.display = "none";
                    }
                    break;
            }
        })
    }
    
    
    // locale Storage

    function saveLocalTodos(todo) {
        let todos;
        if (localStorage.getItem("todos") === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }
    
        todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos))
    }
    
    function getTodos() {
        let todos;
        if (localStorage.getItem("todos") === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }
    
        todos.forEach((todo) => {
            // create todo div
            const todoDıv = document.createElement("div");
            todoDıv.classList.add("todo");
    
            // check mark button
            const completedButton = document.createElement("button");
            completedButton.innerHTML = "<i class='fas fa-check-circle'></i>";
            completedButton.classList.add("complete-btn");
            todoDıv.appendChild(completedButton);
    
            // create todo li
            const newTodo = document.createElement("li");
            newTodo.innerText = todo;
            newTodo.classList.add("todo-item");
            todoDıv.appendChild(newTodo);
    
            //check trash button
            const trashButton = document.createElement("button");
            trashButton.innerHTML = "<i class='fa fa-minus-circle'></i>";
            trashButton.classList.add("trash-btn");
            todoDıv.appendChild(trashButton);
    
            // append to list 
            todoList.appendChild(todoDıv);
        });
    }
    
    
    
    function removeLocaleStorage(todo) {
        let todos;
        if (localStorage.getItem("todos") === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }
        const todoIndex = todo.children[1].innerText;
        todos.splice(todos.indexOf(todoIndex), 1);
        localStorage.setItem("todos", JSON.stringify(todos));
    }
    
    


