"use client";

import { useTask } from "@/context/TaskContext";
import type { Tasks, User } from "@/types";
import { useCallback, useEffect } from "react";
import { Calendar } from "lucide-react";
import TaskPriority from "./TaskPriority";
import RadioButton from "./RadioButton";
import { useSocket } from "@/context/SocketContext";

export default function Tasks() {
  const { fetchTasks, tasks } = useTask();
  const usersJson = localStorage.getItem("allUsers")!;
  const Users: User[] = usersJson ? JSON.parse(usersJson) : [];
  const socket = useSocket();

  function formatDate(isoString: Date) {
    const date = new Date(isoString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }

  const fetchTask = useCallback(async () => {
    await fetchTasks();
    socket?.on("new-task", (task) => {
      const userJson = localStorage.getItem("user");
      const User = userJson ? JSON.parse(userJson) : [];
      if (User.id === task.assignedToId) {
        console.log("new task was created", task);
        return;
      }
    });
  }, []);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  return (
    <div className="flex gap-x-20 gap-y-10 flex-wrap">
      {tasks?.map((task: Tasks) => {
        const { id, title, description, dueDate, status, priority, userId } =
          task;
        return (
          <div
            key={id}
            className={`${
              tasks && tasks.length >= 0
                ? "border border-white/10 rounded-lg min-w-[350px] max-w-[350px] p-5"
                : "hidden"
            }`}
          >
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <RadioButton taskId={id} />
                  <h4 className="text-xl">{title}</h4>
                </div>
                <TaskPriority priority={priority} />
              </div>
              <p className="text-md my-2 text-[#a3a3a3]">{description}</p>
              <div className="text-sm mb-2 flex justify-between">
                <div className="flex gap-1">
                  <Calendar size={17} />
                  {formatDate(dueDate)}
                </div>
                <span className="justify-self-end inline-block mr-2">
                  {status.charAt(0).toUpperCase() +
                    status.slice(1).toLowerCase()}
                </span>
              </div>
              <p>{`Assigned by ${
                Users.find((user) => user.id === userId)?.username
              }`}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
