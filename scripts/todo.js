// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const template = document.querySelector('#task');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);

// todoInput.addEventListener('input', () => {
//     // todoButton.disabled = !todoInput.value
//     if (todoInput.value.length == 0)
//     { 
//         // todoButton.disabled; 
//         todoButton.disabled = true;
//     }  	
//     else if(todoInput.value.length != 0) {
//         todoButton.disabled = false;
//     }
// });
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);

// Functions 
function addTodo(event) {

    event.preventDefault();
    // todoButton.disabled = true;
    const clone = template.content.cloneNode(true);

    const task = clone.querySelector('.task');
    const container = clone.querySelector('.todo');
    const taskText = clone.querySelector('.todo-item');
    taskText.innerText = todoInput.value;
    saveLocalTodos(todoInput.value);
    const complete = clone.querySelector('.complete-btn')
    const del = clone.querySelector('.delete-btn');
    todoList.appendChild(clone);
    todoInput.value = "";


}

function deleteCheck(e) {
    const item = e.target
    if (item.classList[0] === "delete-btn") {
        const todo = item.parentElement;
        // call REMOVE
        removeLocalTodos(todo);
        todo.remove();
        
    }
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {
        const clone = template.content.cloneNode(true);
        const task = clone.querySelector('.task');
        const container = clone.querySelector('.todo');
        const taskText = clone.querySelector('.todo-item');
        taskText.innerText = todo;
        const complete = clone.querySelector('.complete-btn')
        const del = clone.querySelector('.delete-btn');
        todoList.appendChild(clone);
               
    });
}

function removeLocalTodos(todo) {
    console.log("hekko");
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));  
}

