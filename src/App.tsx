import { useReducer, useEffect, useMemo } from "react";
import { todoReducer } from "./reducers/todoReducer";
import { loadTodos, saveTodos } from "./utils/storage";
import type { Priority } from "./types/todo.types";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoStats from "./components/TodoStats";

const App = () => {
  /**
   * useReducer — replaces useState for complex state.
   *
   * Returns [currentState, dispatchFunction]
   * - todos: the current array of todos
   * - dispatch: function to send actions to todoReducer
   *
   * Flow: dispatch(action) → todoReducer(currentState, action) → newState → re-render
   */
  const [todos, dispatch] = useReducer(todoReducer, []);

  /**
   * useEffect #1: Load from localStorage on FIRST RENDER only.
   *
   * Empty dependency array [] = run once on mount.
   * This is our "ngOnInit" equivalent.
   */
  useEffect(() => {
    const savedTodos = loadTodos();
    if (savedTodos.length > 0) {
      dispatch({ type: "LOAD_TODOS", payload: savedTodos });
    }
  }, []);

  /**
   * useEffect #2: Persist & log on every todo change.
   *
   * [todos] dependency = runs every time `todos` changes.
   * Side effects (localStorage, console.log) belong in useEffect,
   * NOT inside the reducer (which must stay pure).
   */
  useEffect(() => {
    saveTodos(todos);
    console.log(
      `[TodoDashboard] Todos updated — Total: ${todos.length}`,
      todos,
    );
  }, [todos]);

  /**
   * useMemo — cached computation.
   * Only recalculates when `todos` changes, not on every render.
   */
  const stats = useMemo(() => {
    const completed = todos.filter((t) => t.completed).length;
    return {
      total: todos.length,
      completed,
      pending: todos.length - completed,
    };
  }, [todos]);

  // Action handlers — dispatch to the reducer
  const handleAddTodo = (title: string, priority: Priority) => {
    dispatch({ type: "ADD_TODO", payload: { title, priority } });
  };

  const handleToggleTodo = (id: string) => {
    dispatch({ type: "TOGGLE_TODO", payload: { id } });
  };

  const handleDeleteTodo = (id: string) => {
    dispatch({ type: "DELETE_TODO", payload: { id } });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 -z-10" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Todo Dashboard
          </h1>
          <p className="text-gray-500 mt-2">
            Day 3 — useReducer + useRef + useEffect
          </p>
        </header>

        {/* Stats */}
        <section className="mb-6" aria-label="Todo Statistics">
          <TodoStats {...stats} />
        </section>

        {/* Form */}
        <section className="mb-6" aria-label="Add Todo">
          <TodoForm onAddTodo={handleAddTodo} />
        </section>

        {/* List */}
        <section aria-label="Todo List">
          <TodoList
            todos={todos}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
          />
        </section>
      </div>
    </div>
  );
};

export default App;
