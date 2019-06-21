export const ADD_TODO = "ADD_TODO";
export const TOGGLE_STATUS = "TOGGLE_STATUS";
export const DELETE_TODO = "DELETE_TODO";
export const LOAD_TODOS = "LOAD_TODOS"

export const addTodo = todo => ({ type: ADD_TODO, payload: todo });
export const toggleTodoStatus = id => ({ type: TOGGLE_STATUS, payload: id });
export const deleteTodo = id => ({ type: DELETE_TODO, payload: id });
export const loadTodos = todos => ({ type: LOAD_TODOS, payload: todos});