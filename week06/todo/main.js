import Todos from './todos.js';
import qs from './utilities.js';

let todoList = [];
//on load 
window.addEventListener("load", () => {
  const todos = new Todos('todoItems', todoList);
  todos.showTodoList();
  todos.addTodoListener();
  todos.addFormListener();
  todos.addFilterListener()
});

