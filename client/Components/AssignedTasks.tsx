"use client";
import { useTask } from "@/context/TaskContext";
import { Tasks } from "@/types";
import TaskPriority from "./TaskPriority";
import { Calendar } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { formatDate } from "./Tasks";
import { useEffect } from "react";

export default function AssignedTasks() {
  const { getAssignedTasks, assignedTasks } = useTask();
  const { allUsers } = useAuth();

  useEffect(() => {
    getAssignedTasks();
  }, []);

  return (
    <div className="flex gap-x-20 gap-y-10 flex-wrap">
      {!assignedTasks?.length && <div>No Tasks Assigned </div>}
      {assignedTasks?.length &&
        assignedTasks?.map((task: Tasks) => {
          const {
            id,
            title,
            description,
            dueDate,
            status,
            priority,
            assignedToId,
          } = task;
          return (
            <div
              key={id}
              className={`${
                assignedTasks && assignedTasks.length >= 0
                  ? "border border-white/10 rounded-lg min-w-[350px] max-w-[350px] p-5"
                  : "hidden"
              }`}
            >
              <div className="flex flex-col">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
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
                <p>{`Assigned to ${
                  allUsers?.find((user) => user.id === assignedToId)?.username
                }`}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
}
