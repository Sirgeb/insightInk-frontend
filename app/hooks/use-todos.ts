import { useEffect, useMemo, useRef, useState } from "react";
import {
  createTodoAction,
  deleteTodoAction,
  getTodosAction,
} from "@/app/actions/todo-action";
import { parseTasks } from "@/lib/parse-tasks";
import { Task, Tasks } from "@/components/todo-list";

export function useTodos(tasks: Tasks | string | null) {
  const parsedTasks: any = useMemo(() => {
    return tasks ? parseTasks(tasks) : [];
  }, [tasks]);

  const [taskList, setTaskList] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const previousTasksRef = useRef<Task[]>([]);

  // Sync tasks from props
  useEffect(() => {
    if (!parsedTasks.length) return;

    setTaskList((prev) => {
      const merged = [...prev];

      parsedTasks.forEach((task: Task) => {
        const exists = merged.some(
          (t) =>
            t.task === task.task &&
            t.duration_minutes === task.duration_minutes,
        );

        if (!exists) merged.unshift(task);
      });

      return merged;
    });
  }, [parsedTasks]);

  // Fetch existing todos
  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);

      const result = await getTodosAction();

      if (result.ok && result.todos) {
        const formatted = result.todos.map((todo: any) => ({
          id: todo.id,
          task: todo.task,
          duration_minutes: todo.duration,
          priority: todo.priority,
          tags: todo.tags || [],
        }));

        setTaskList((prev) => (prev.length ? prev : formatted));
        previousTasksRef.current = formatted;
      }

      setLoading(false);
    };

    fetchTodos();
  }, []);

  // Persist new tasks
  useEffect(() => {
    if (!taskList.length) return;

    const previous = previousTasksRef.current;

    const newTasks = taskList.filter(
      (task) =>
        !previous.some(
          (prev) =>
            prev.task === task.task &&
            prev.duration_minutes === task.duration_minutes,
        ),
    );

    if (!newTasks.length) return;

    previousTasksRef.current = taskList;

    const formatted = newTasks.map((task) => ({
      task: task.task,
      duration: task.duration_minutes,
      priority: task.priority,
      tags: task.tags,
    }));

    createTodoAction(formatted);
  }, [taskList]);

  const removeTask = async (index: number) => {
    const task = taskList[index];

    setTaskList((prev) => prev.filter((_, i) => i !== index));

    if (!task?.id) return;

    const result = await deleteTodoAction(task.id);

    if (!result.ok) {
      setTaskList((prev) => {
        const updated = [...prev];
        updated.splice(index, 0, task);
        return updated;
      });
    }
  };

  return { taskList, loading, removeTask };
}
