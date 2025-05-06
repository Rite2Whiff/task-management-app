import { useTask } from "@/context/TaskContext";
import type { Tasks } from "@/types";
import { useEffect } from "react";
import { Calendar } from "lucide-react";
import TaskPriority from "./TaskPriority";

export default function Tasks() {
  const { fetchTasks, tasks } = useTask();

  function formatDate(isoString: Date) {
    const date = new Date(isoString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }

  useEffect(() => {
    async function getData() {
      await fetchTasks();
      const tasksString = localStorage.getItem("tasks");
      if (tasksString) {
        const tasks: Tasks[] = JSON.parse(tasksString);
        console.log(tasks);
      }
    }
    getData();
  }, []);

  return (
    <div className="border border-white/10 rounded-lg max-w-[350px] p-5">
      {tasks?.map((task: Tasks) => {
        const { id, title, description, dueDate, status, priority } = task;
        return (
          <div key={id} className="flex flex-col">
            <div className="flex justify-between">
              <h4 className="text-xl">{title}</h4>
              <TaskPriority priority={priority} />
            </div>
            <p className="text-md my-2 text-[#a3a3a3]">{description}</p>
            <p className="text-sm mb-2 flex justify-between">
              <div className="flex gap-1">
                <Calendar size={17} />
                {formatDate(dueDate)}
              </div>
              <span className="justify-self-end inline-block mr-2">
                {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
              </span>
            </p>
          </div>
        );
      })}
    </div>
  );
}
