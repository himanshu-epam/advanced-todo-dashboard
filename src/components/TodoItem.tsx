import type { Todo } from "../types/todo.types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

/**
 * Presentational "dumb" component — only displays data and delegates actions.
 * It doesn't know HOW toggle/delete work. Same pattern as Angular's @Output().
 */
const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  const priorityConfig = {
    low: {
      badge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      bar: "bg-emerald-500",
      label: "Low",
    },
    medium: {
      badge: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      bar: "bg-amber-500",
      label: "Medium",
    },
    high: {
      badge: "bg-rose-500/20 text-rose-400 border-rose-500/30",
      bar: "bg-rose-500",
      label: "High",
    },
  };

  const config = priorityConfig[todo.priority];

  return (
    <div
      className={`group relative flex items-center gap-4 p-4 rounded-xl border 
                  transition-all duration-300 hover:shadow-lg animate-[fadeIn_0.3s_ease-out]
                  ${
                    todo.completed
                      ? "bg-gray-800/30 border-gray-700/30"
                      : "bg-gray-800/50 border-gray-700/50 hover:border-gray-600/50"
                  }`}
    >
      {/* Priority indicator bar on the left */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${config.bar} 
                    transition-opacity duration-300 ${todo.completed ? "opacity-30" : "opacity-100"}`}
      />

      {/* Custom checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center 
                    transition-all duration-300 cursor-pointer
                    ${
                      todo.completed
                        ? "bg-blue-500 border-blue-500 text-white"
                        : "border-gray-500 hover:border-blue-400"
                    }`}
        aria-label={`Mark "${todo.title}" as ${todo.completed ? "pending" : "completed"}`}
      >
        {todo.completed && (
          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </button>

      {/* Todo title */}
      <p
        className={`flex-1 min-w-0 text-base transition-all duration-300 truncate
                    ${todo.completed ? "line-through text-gray-500" : "text-gray-100"}`}
      >
        {todo.title}
      </p>

      {/* Priority badge */}
      <span
        className={`flex-shrink-0 px-2.5 py-1 text-xs font-medium rounded-full border ${config.badge}`}
      >
        {config.label}
      </span>

      {/* Delete button — visible on hover */}
      <button
        onClick={() => onDelete(todo.id)}
        className="flex-shrink-0 p-2 text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 
                   rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100 cursor-pointer"
        aria-label={`Delete "${todo.title}"`}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
};

export default TodoItem;
