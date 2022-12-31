import { createReducer, on } from "@ngrx/store";
import { ITodo } from "../../shared/interfaces/todo";
import {
  addTodoSuccess,
  editTodoSuccess,
  removeTodoSuccess,
} from "./todo.actions";

export const TODOS_LOCAL_NAME = "todos";
const savedTodos = JSON.parse(localStorage.getItem(TODOS_LOCAL_NAME)!);
const initialTodos: ITodo[] = savedTodos || [];

export const todoReducer = createReducer(
  initialTodos,
  on(addTodoSuccess, (todos, newState) => {
    const newTodos = JSON.parse(JSON.stringify(todos));
    return [...newTodos, newState.todo];
  }),
  on(removeTodoSuccess, (todos, removeIndex) => {
    const newTodos: ITodo[] = JSON.parse(JSON.stringify(todos));
    return newTodos.filter((_, index) => index !== removeIndex.index);
  }),
  on(editTodoSuccess, (todos, { index, todo }) => {
    const newState = JSON.parse(JSON.stringify(todos));
    newState.splice(index, 1, todo);
    return newState;
  })
);
