import { Task } from "./todo-list";

export default function TodoItem({
  task,
  index,
  removeTask,
}: {
  task: Task;
  index: number;
  removeTask: (index: number) => void;
}) {
  const isHigh = task.priority === "high";

  return (
    <div
      className={`flex justify-between items-center border rounded-xl p-4 ${
        isHigh
          ? "border-emerald-400/30 bg-emerald-900/20"
          : "border-white/10 bg-[#0b0f0f]"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-gray-200">
          {task.task.charAt(0).toUpperCase() + task.task.slice(1)}
        </span>

        {task.tags?.map((tag, i) => (
          <span
            key={i}
            className="text-xs bg-emerald-700 px-2 py-1 rounded-full"
          >
            {tag.toUpperCase()}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <span className="text-xs text-gray-400">
          {task.duration_minutes} min
        </span>

        <button
          onClick={() => removeTask(index)}
          className="text-red-400 hover:text-red-500 hover:cursor-pointer text-lg"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
