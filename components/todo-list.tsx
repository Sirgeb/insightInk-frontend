"use client";

import { useTodos } from "@/app/hooks/use-todos";
import TodoItem from "./todo-item";
import { Skeleton } from "@/components/ui/skeleton";

export type Task = {
  id?: string;
  task: string;
  duration_minutes: number;
  priority: "high" | "low";
  tags: string[];
};

export type Tasks = Task[];

export default function TodoList({ tasks }: { tasks: Tasks | string | null }) {
  const { taskList, loading, removeTask } = useTodos(tasks);

  return (
    <div className="mt-10 max-w-3xl mx-auto w-full">
      {!!taskList.length && (
        <h3 className="text-lg text-gray-300 mb-4">Upcoming Tasks</h3>
      )}

      <div className="space-y-4">
        {loading && (
          <div className="border border-white/10 bg-[#0b0f0f] rounded-xl p-4">
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        )}

        {!loading &&
          taskList.map((task, index) => (
            <TodoItem
              key={index}
              task={task}
              index={index}
              removeTask={removeTask}
            />
          ))}
      </div>
    </div>
  );
}
