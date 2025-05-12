import { Tasks } from "@/types";
import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import TaskPriority from "./TaskPriority";
import { formatDate } from "./Tasks";
import { useAuth } from "@/context/AuthContext";

export function OverdueTasks() {
  const [overDueTasks, setOverDueTasks] = useState<Tasks[]>([]);
  const { allUsers, user } = useAuth();

  useEffect(() => {
    const tasksString = localStorage.getItem("tasks");
    if (tasksString && user) {
      const tasks: Tasks[] = JSON.parse(tasksString);
      const today = new Date();

      const filtered = tasks.filter((task) => {
        const dueDate = new Date(task.dueDate);
        return (
          task.userId === user.id &&
          dueDate < today &&
          task.status.toLowerCase() !== "completed"
        );
      });

      setOverDueTasks(filtered);
    }
  }, [user]);

  return (
    <div className="flex gap-x-10 gap-y-8 flex-wrap">
      {overDueTasks.length === 0 && <div>No Overdue Tasks</div>}
      {overDueTasks.map((task) => {
        const { id, title, description, dueDate, priority, status, userId } =
          task;

        return (
          <div
            key={id}
            className="border border-red-500/40 rounded-lg min-w-[350px] max-w-[350px] p-5"
          >
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <h4 className="text-xl">{title}</h4>
                <TaskPriority priority={priority} />
              </div>
              <p className="text-md my-2 text-[#a3a3a3]">{description}</p>
              <div className="text-sm flex justify-between mb-3">
                <div className="flex gap-1 items-center">
                  <Calendar size={17} />
                  {formatDate(dueDate)}
                </div>
                <span className="text-red-400">
                  {status.charAt(0).toUpperCase() +
                    status.slice(1).toLowerCase()}
                </span>
              </div>
              <p>{`Assigned by ${
                allUsers?.find((u) => u.id === userId)?.username || "Unknown"
              }`}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
