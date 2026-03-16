import { Tasks } from "@/components/todo-list";

export function parseTasks(tasks: Tasks | string | null): Tasks | null {
  if (!tasks) return null;

  if (typeof tasks === "string") {
    try {
      const cleanJSON = tasks
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      return JSON.parse(cleanJSON);
    } catch (error) {
      console.error("Invalid JSON", error);
      return null;
    }
  }

  return tasks;
}
