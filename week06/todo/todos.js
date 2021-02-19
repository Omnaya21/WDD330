import readFromLS, {writeToLS} from "./ls.js";
import qs from "./utilities.js"; 

let todoList = null;

export default class Todos {
  ///in the constructor you should set a variable with the element our todo list will be built in, and the key we will use to read/write from localStorage
  constructor(key, data) {
    this.key = key;    
    this.todoList = getTodos(this.key);
    this.parentElement = qs('ul');
    this.filter = 'showAll';  //Other choices are showActive, showCompleted
  }

  setFilter(newFilter)
  {
    this.filter = newFilter;
  }

  getAllTodos() {
    return this.todoList;
  }

  getTodoName(description) {
    return this.getAllTodos().find(todo => todo.description === description);
  }

  //show a list of todos in the parentElement
  showTodoList() {
    this.parentElement.innerHTML = '';
    renderTodoList(this.getAllTodos(), this.parentElement);
    showTasksDisplayed(todoList.length);
  }

  // show one todo in the parentElement
  showOneTodo(description) {
    const todo = todoList.find(todo => todo.description === description);
    this.parentElement.innerHTML = '';    
    renderOneTodoFull(this.parentElement, todo);
  }

  /* Add a method to the Todos class called addTodo. It should grab the input in the html where users enter the text of the task, 
    then send that along with the key to a SaveTodo() function. Then update the display with the current list of tasks */
  addTodo(text) {
    saveTodo(text, this.key);
  }

  completeTodo(key) {
    const index = todoList.findIndex(item => item.id === Number(key));
    todoList[index].checked = !todoList[index].checked;

    writeToLS(this.key, todoList);
    renderSingleTodo(todoList[index]);
    showTasksDisplayed(todoList.length);
  }

  removeTodo(key) {
    const index = todoList.findIndex(item => item.id === Number(key));
    const todo = {
      deleted: true,
      ...todoList[index]
    }
    todo.deleted = true
    todoList = todoList.filter(item => item.id !== Number(key));
    this.todoList = todoList;
    writeToLS(this.key, todoList);
    renderSingleTodo(todo);
    showTasksDisplayed(todoList.length);
  }

  filterTodos(filter) {}

  addTodoListener() {
    this.parentElement.addEventListener('click', event => {
      if (event.target.classList.contains('js-tick')) {
        const itemKey = event.target.parentElement.dataset.key;
        this.completeTodo(itemKey);
      }

      if (event.target.classList.contains('js-delete-todo')) {
        const itemKey = event.target.parentElement.dataset.key;
        this.removeTodo(itemKey);
      }
    });
  }

  addFormListener() {
    const form = qs('.js-form');
    form.addEventListener('submit', event => {
      event.preventDefault();
      const input = document.querySelector('.js-todo-input');
      const text = input.value.trim();

      if (text !== '') {
        this.addTodo(text);
        input.value = '';
        input.focus();
      }
    });
  }

  addFilterListener()
  {
    const showAll = qs('.js-filter-all')
    const showCompleted = qs('.js-filter-completed');
    const showActive = qs('.js-filter-active');
    showAll.addEventListener('click', eevent =>
    {  
      if(this.filter !== 'showAll')
      {
        this.setFilter('showAll');
        renderTodoList(todoList, this.parentElement);
        showTasksDisplayed(todoList.length);
      }
    });
    showCompleted.addEventListener('click', event =>
    {  
      event.preventDefault();
      if(this.filter !== 'showCompleted'){
        this.setFilter('showCompleted');
        const filteredList = todoList.filter(item => item.checked === true);
        renderTodoList(filteredList, this.parentElement);
        showTasksDisplayed(filteredList.length);
      }
    });
    showActive.addEventListener('click', event =>
    {  
      if(this.filter !== 'showActive'){
        this.setFilter('showActive');
        const filteredList = todoList.filter(item => item.checked !== true);
        renderTodoList(filteredList, this.parentElement);
        showTasksDisplayed(filteredList.length);
      }
    });
  }
}


/* build a todo object, add it to the todoList, and save the new list to local storage.
@param {string} key The key under which the value is stored under in LS 
@param {string} task The text of the task to be saved.
*/
function saveTodo(task, key) { 
  //A todo should look like this: { id : timestamp, content: string, completed: bool }
  const todo = {
    text: task,
    checked: false,
    id: Date.now(),
  };

  todoList.push(todo);
  writeToLS(key, todoList);
  renderSingleTodo(todo);
  showTasksDisplayed(todoList.length);
}


/* check the contents of todoList, a local variable containing a list of ToDos. If it is null then pull the list of todos from localstorage, 
  update the local variable, and return it
  @param {string} key The key under which the value is stored under in LS 
  @return {array} The value as an array of objects
*/
function getTodos(key) {
  if (todoList === null)
  {
    todoList = readFromLS(key);
    return todoList;
  }
 }


/* foreach todo in list, build a li element for the todo, and append it to element
@param {array} list The list of tasks to render to HTML 
@param {element} element The DOM element to insert our list elements into.
*/
function renderTodoList(list, element) {
  element.innerHTML = '';
  list.forEach(todo => {
    renderSingleTodo(todo);
  });
}

function renderSingleTodo(todo) {
  const list = qs('.js-todo-list');
  const item = qs(`[data-key='${todo.id}']`);

  if (todo.deleted) {
    item.remove();
    if (todoList.length === 0) list.innerHTML = '';
    return
  }

  const isChecked = todo.checked ? 'done': '';
  const node = document.createElement("li");
  node.setAttribute('class', `todo-item ${isChecked}`);
  node.setAttribute('data-key',todo.id);
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

function showTasksDisplayed(taskCount)
{
  const shownTasks = qs('.js-shown-tasks');
  shownTasks.innerHTML = taskCount;
}