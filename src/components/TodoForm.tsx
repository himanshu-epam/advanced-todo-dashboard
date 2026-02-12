import react from "react";
import type { Priority } from "../types/todo.types";

interface TodoFormProps {
  onAddTodo: (title: string, priority: Priority) => void;
}

const TodoForm = ({ onAddTodo }: TodoFormProps) => {
  const [title, setTitle] = react.useState("");
  const [priority, setPriority] = react.useState<Priority>("medium");

  /**
   * useRef gives us a direct reference to the input DOM element.
   * We use it to auto-focus the input after adding a todo.
   * Changing a ref does NOT cause re-renders (unlike useState).
   */
  const inputRef = react.useRef<HTMLInputElement>(null);

  const handleSubmit = (e: react.SubmitEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    onAddTodo(trimmedTitle, priority);
    setTitle("");

    // Auto-focus input after adding — smooth UX
    inputRef.current?.focus();
  };

  const priorityStyles: Record<Priority, string> = {
    low: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    high: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 p-4 bg-gray-800/50 backdrop-blur-sm 
                 rounded-xl border border-gray-700/50"
    >
      {/* ref={inputRef} connects the DOM element to our ref variable */}
      <input
        ref={inputRef}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg 
                   text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 
                   focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
        autoFocus
      />

      <div className="flex gap-3">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className={`px-4 py-3 rounded-lg border cursor-pointer transition-all duration-200 
                     focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${priorityStyles[priority]}`}
        >
          <option value="low">🟢 Low</option>
          <option value="medium">🟡 Medium</option>
          <option value="high">🔴 High</option>
        </select>

        <button
          type="submit"
          disabled={!title.trim()}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 
                     disabled:text-gray-500 text-white font-semibold rounded-lg 
                     transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 
                     active:scale-95 disabled:cursor-not-allowed"
        >
          + Add
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
