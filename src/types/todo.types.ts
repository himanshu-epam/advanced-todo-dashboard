/**
 * Priority levels for a todo item.
 * Union type ensures only valid values are accepted at compile time.
 */
export type Priority = "low" | "medium" | "high";

/**
 * Single Todo item shape.
 * Every todo has a unique id, title, completion status, priority, and creation timestamp.
 */
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  createdAt: number;
}

/**
 * All possible actions the reducer can handle.
 *
 * This is called a "Discriminated Union" — TypeScript will enforce
 * the correct payload shape for each action type.
 *
 * Example: If you dispatch { type: "ADD_TODO" }, TS will REQUIRE
 * payload to have { title, priority }. Wrong payload = compile error!
 */
export type TodoAction =
   | { type: "ADD_TODO"; payload: { title: string; priority: Priority } }
   | { type: "DELETE_TODO"; payload: { id: string } }
   | { type: "TOGGLE_TODO"; payload: { id: string } }
   | { type: "LOAD_TODOS"; payload: Todo[] };