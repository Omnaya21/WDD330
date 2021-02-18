let todoList = [];

function renderTodo(todo) {
  localStorage.setItem('todoItems', JSON.stringify(todoList));

  const list = document.querySelector('.js-todo-list');
  const item = document.querySelector(`[data-key='${todo.id}']`);

  if (todo.deleted) {
    item.remove();
    if (todoList.length === 0) list.innerHTML = '';
    return
  }


  const isChecked = todo.checked ? 'done': '';
  const node = document.createElement("li");
  node.setAttribute('class', `todo-item ${isChecked}`);
  node.setAttribute('data-key', todo.id);
  node.innerHTML = `
    <input id="${todo.id}" type="checkbox"/>
    <label for="${todo.id}" class="tick js-tick"></label>
    <span>${todo.text}</span>
    <button class="delete-todo js-delete-todo">
    <svg><use href="#delete-icon"></use></svg>
    </button>
  `;

  if (item) {
    list.replaceChild(node, item);
  } else {
    list.append(node);
  }
}

function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };

  todoList.push(todo);
  renderTodo(todo);
}

function toggleDone(key) {
  const index = todoList.findIndex(item => item.id === Number(key));
  todoList[index].checked = !todoList[index].checked;

  renderTodo(todoList[index])
  localStorage.setItem('todoItems', JSON.stringify(todoList));
}

function deleteTodo(key) {
  const index = todoList.findIndex(item => item.id === Number(key));
  const todo = {
    deleted: true,
    ...todoList[index]
  }
  todo.deleted = true
  todoList = todoList.filter(item => item.id !== Number(key));
  renderTodo(todo);
}

const form = document.querySelector('.js-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const input = document.querySelector('.js-todo-input');

  const text = input.value.trim();
  if (text !== '') {
    addTodo(text);
    input.value = '';
    input.focus();
  }
});

const list = document.querySelector('.js-todo-list');
list.addEventListener('click', event => {
  if (event.target.classList.contains('js-tick')) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }

  if (event.target.classList.contains('js-delete-todo')) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const ref = localStorage.getItem('todoItems');
  if (ref) {
    todoList = JSON.parse(ref);
    todoList.forEach(t => {
      renderTodo(t);
    });
  }
});