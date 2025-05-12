"use client";

import { useTask } from "@/context/TaskContext";
import type { Tasks } from "@/types";
import { Calendar } from "lucide-react";
import TaskPriority from "./TaskPriority";
import RadioButton from "./RadioButton";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export function formatDate(isoString: Date) {
  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

export default function Tasks({ search }: { search: string }) {
  const { allUsers } = useAuth();
  const { tasks, fetchTasks } = useTask();

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks?.filter(
    (task: Tasks) =>
      task.title.toLowerCase().includes(search.toLowerCase() as string) ||
      task.description.toLowerCase().includes(search.toLowerCase() as string)
  );

  return (
    <div className="w-full ">
      <div className="flex gap-x-20 gap-y-10 flex-wrap ">
        {!filteredTasks?.length && filteredTasks?.length !== 0 && (
          <div>No Tasks Assigned </div>
        )}
        {filteredTasks?.map((task: Tasks) => {
          const { id, title, description, dueDate, status, priority, userId } =
            task;
          return (
            <div
              key={id}
              className={`${
                tasks?.length
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
                  <div className="flex gap-1 items-center">
                    <Calendar size={17} />
                    {formatDate(dueDate)}
                  </div>
                  <span className="justify-self-end inline-block mr-2">
                    {status.charAt(0).toUpperCase() +
                      status.slice(1).toLowerCase()}
                  </span>
                </div>
                <p>{`Assigned by ${
                  allUsers?.find((user) => user.id === userId)?.username
                }`}</p>
              </div>
            </div>
          );
        })}
      </div>

      {tasks?.length !== 0 && filteredTasks?.length === 0 && (
        <p className="text-center text-gray-400 mt-8">
          No tasks match your search.
        </p>
      )}
    </div>
  );
}
