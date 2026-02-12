/**
 * todoReducer — Centralizes ALL todo state mutations.
 *
 * A reducer is a PURE function:
 * - Same input → always same output
 * - No side effects (no localStorage, no API calls inside)
 * - Takes (currentState, action) → returns newState
 *
 * Components dispatch WHAT happened → reducer decides HOW state changes.
 */
import type { Todo, TodoAction } from "../types/todo.types";

export const todoReducer = (state: Todo[], action: TodoAction): Todo[] => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: crypto.randomUUID(),
          title: action.payload.title,
          completed: false,
          priority: action.payload.priority,
          createdAt: Date.now(),
        },
      ];

    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload.id);

    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    case "LOAD_TODOS":
      return action.payload;

    default:
      return state;
  }
};