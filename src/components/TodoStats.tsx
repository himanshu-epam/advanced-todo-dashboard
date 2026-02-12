interface TodoStatsProps {
  total: number;
  completed: number;
  pending: number;
}

const TodoStats = ({ total, completed, pending }: TodoStatsProps) => {
  const completionPercent =
    total > 0 ? Math.round((completed / total) * 100) : 0;

  const stats = [
    {
      label: "Total",
      value: total,
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
      icon: "📋",
    },
    {
      label: "Completed",
      value: completed,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
      icon: "✅",
    },
    {
      label: "Pending",
      value: pending,
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
      icon: "⏳",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`flex flex-col items-center p-4 rounded-xl border ${stat.bg} 
                        transition-all duration-300 hover:scale-105`}
          >
            <span className="text-2xl mb-1">{stat.icon}</span>
            <span className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </span>
            <span className="text-xs text-gray-400 mt-1">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      {total > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Progress</span>
            <span className="text-gray-300 font-medium">
              {completionPercent}%
            </span>
          </div>
          <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full 
                         transition-all duration-700 ease-out"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoStats;
