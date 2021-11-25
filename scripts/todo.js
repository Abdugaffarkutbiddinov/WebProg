// select everything
// select the todo-form
const todoForm = document.querySelector('.todo-form');
// select the input box
const todoInput = document.querySelector('.todo-input');
// select the <ul> with class="todo-items"
const todoItemsList = document.querySelector('.todo-items');
const template = document.querySelector('#task');
// array which stores every todos
let todos = [];

// add an eventListener on form, and listen for submit event
todoForm.addEventListener('submit', function(event) {
  // prevent the page from reloading when submitting the form
  event.preventDefault();
  addTodo(todoInput.value); // call addTodo function with input box current value
});

function addTodo(item) {
  if (item !== '') {
    const todo = {
      id: Date.now(),
      name: item,
      completed: false
    };

    todos.push(todo);
    addToLocalStorage(todos); 

    todoInput.value = '';
  }
}

function renderTodos(todos) {
  todoItemsList.innerHTML = '';

  todos.forEach(function(item) {
    const checked = item.completed ? 'checked': null;
    const clone = template.content.cloneNode(true);
    const li = clone.querySelector('.item');
    const todoName = clone.querySelector('.todo-name');
    
    li.setAttribute('data-key', item.id);

    if (item.completed === true) {
      li.classList.toggle('checked');

    }
    todoName.innerHTML = item.name;
    const checkbox = clone.querySelector('.checkbox');
    checkbox.addEventListener('click', (event) => {
      toggle(event.target.parentElement.getAttribute('data-key'));
    }
      );
    const del = clone.querySelector('.delete-button');
    del.addEventListener('click', (event) => {
        deleteTodo(event.target.parentElement.getAttribute('data-key'));
      }
        );
      
    todoItemsList.appendChild(clone);
  });

}


function addToLocalStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos(todos);
}


function getFromLocalStorage() {
  const reference = localStorage.getItem('todos');

  if (reference) {
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}


function toggle(id) {
  todos.forEach(function(item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });

  addToLocalStorage(todos);
}

function deleteTodo(id) {
  todos = todos.filter(function(item) {

    return item.id != id;
  });

  addToLocalStorage(todos);
}

getFromLocalStorage();
const clone = template.content.cloneNode(true);
