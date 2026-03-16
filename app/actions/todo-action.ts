"use server";

import api from "@/lib/axios";
import { getSessionCookie } from "@/lib/session-cookie";

type TodoInput = {
  task: string;
  duration: number;
  priority: "high" | "low";
  tags?: string[];
};

type Result = {
  ok: boolean;
  message: string;
  todos?: TodoInput[];
};

export const createTodoAction = async (todos: TodoInput[]): Promise<Result> => {
  try {
    const jwtToken = await getSessionCookie();

    await api.post("/todos", todos, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    return {
      ok: true,
      message: "Todos created successfully",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Unable to create todos",
    };
  }
};

export const deleteTodoAction = async (todoId: string): Promise<Result> => {
  try {
    const jwtToken = await getSessionCookie();

    await api.delete(`/todos/${todoId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    return {
      ok: true,
      message: "Todo deleted successfully",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Unable to delete todo",
    };
  }
};

export const getTodosAction = async (): Promise<Result> => {
  try {
    const jwtToken = await getSessionCookie();

    const response = await api.get("/todos", {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    return {
      ok: true,
      message: "Todos fetched successfully",
      todos: response.data.todos,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Unable to fetch todos",
    };
  }
};
