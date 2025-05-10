"use client";

import { TaskContextType, Tasks } from "@/types";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext<TaskContextType>({
  tasks: null,
  fetchTasks: async (): Promise<void> => {},
  deleteTask: async (): Promise<void> => {},
  updateTask: async (): Promise<void> => {},
});

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Tasks[]>([]);

  useEffect(() => {
    fetchTasks();
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
    } catch (error) {
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
    } catch (error) {
      console.log("Error", error);
    }
  }

  async function updateTask(taskId: string, taskStatus: string) {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.put(
        `http://localhost:3000/api/task/${taskId}`,
        { status: taskStatus },
        { headers: { Authorization: token } }
      );
      const taskJson = localStorage.getItem("tasks");
      const getTasks: Tasks[] = taskJson ? JSON.parse(taskJson) : [];
      console.log("get", getTasks);
      const findTask = getTasks.find((task) => task.id === taskId);

      if (findTask) {
        const updatedTask: Tasks = { ...findTask, status: taskStatus };
        const updatedTaskArray = setTasks((prevState) =>
          prevState.map((task) => (task.id === taskId ? updatedTask : task))
        );
        localStorage.setItem("tasks", JSON.stringify(updatedTaskArray));
        return;
      }
      console.log(response.data);
    } catch (error) {
      console.log("Error", error);
    }
  }

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, deleteTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTask = () => useContext(TaskContext);
