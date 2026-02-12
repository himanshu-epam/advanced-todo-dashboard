/**
 * Utility for persisting todos to localStorage.
 *
 * WHY separate file?
 * - Single Responsibility: storage logic stays isolated from UI
 * - Easy to swap with a real API later (just change this file)
 * - Easy to unit test independently
 */
import type { Todo } from "../types/todo.types";

const STORAGE_KEY = "advanced-todo-dashboard";

/** Load todos from localStorage. Returns empty array on failure. */
export const loadTodos = (): Todo[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? (JSON.parse(data) as Todo[]) : [];
  } catch (error) {
    console.error("Failed to load todos from localStorage:", error);
    return [];
  }
};

/** Save todos to localStorage. Silently handles errors. */
export const saveTodos = (todos: Todo[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error("Failed to save todos to localStorage:", error);
  }
};