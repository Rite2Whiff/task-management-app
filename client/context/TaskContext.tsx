"use client";

import { TaskContextType, Tasks } from "@/types";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext<TaskContextType>({
  tasks: null,
  fetchTasks: async (): Promise<void> => {},
  deleteTask: async (): Promise<void> => {},
});

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Tasks[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) setTasks(JSON.parse(storedTasks));
  }, []);

  async function fetchTasks() {
    const token = localStorage.getItem("accessToken");
    console.log(token);
    try {
      const response = await axios.get("http://localhost:3000/api/user/tasks", {
        headers: { Authorization: token },
      });
      setTasks(response.data.tasks);
      localStorage.setItem("tasks", JSON.stringify(response.data.tasks));
    } catch (error: any) {
      console.log("Error", error);
    }
  }

  async function deleteTask(taskId: string) {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/user/${taskId}`,
        { headers: { Authorization: token } }
      );

      const taskJson = localStorage.getItem("tasks")!;
      const getTasks: Tasks[] = taskJson ? JSON.parse(taskJson) : [];
      const updateTasks = getTasks.filter((task) => task.id !== taskId);

      setTasks(updateTasks);
      localStorage.setItem("tasks", JSON.stringify(updateTasks));

      console.log(response.data.message);
    } catch (error: any) {
      console.log("Error", error);
    }
  }

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTask = () => useContext(TaskContext);
