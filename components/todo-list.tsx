"use client";

import { useState } from "react";

type Task = {
  task: string;
  duration_minutes: number;
  priority: "high" | "low";
  tags: string[];
};

type Tasks = Task[];

export default function TodoList({ tasks }: { tasks: Tasks | string | null }) {
  if (!tasks) return null;

  let arrOfTasks: Task[] = [];

  if (typeof tasks === "string") {
    try {
      const cleanJSON = tasks
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      arrOfTasks = JSON.parse(cleanJSON);
    } catch (error) {
      console.error("Invalid JSON", error);
      return <div>Error loading tasks.</div>;
    }
  } else {
    arrOfTasks = tasks;
  }

  const [taskList, setTaskList] = useState<Task[]>(arrOfTasks);

  const removeTask = (index: number) => {
    setTaskList((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-10 max-w-3xl mx-auto w-full">
      <h3 className="text-lg text-gray-300 mb-4">Upcoming Tasks</h3>

      <div className="space-y-4">
        {taskList.map((task: Task, index: number) => {
          const isHigh = task.priority === "high";

          return (
            <div
              key={index}
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
        })}
      </div>
    </div>
  );
}
