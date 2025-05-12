"use client";
import { useTask } from "@/context/TaskContext";
import { Tasks } from "@/types";
import TaskPriority from "./TaskPriority";
import { Calendar, Pencil, Trash } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { formatDate } from "./Tasks";
import { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import axios from "axios";

export default function AssignedTasks() {
  const { getAssignedTasks, assignedTasks, setAssignedTasks } = useTask();
  const { allUsers } = useAuth();

  const [open, setOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Tasks | null>(null);

  useEffect(() => {
    getAssignedTasks();
  }, []);

  const tasksToRender = assignedTasks ?? [];

  const handleTaskUpdated = (updatedTask: Tasks) => {
    const updatedTasks = tasksToRender.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setAssignedTasks(updatedTasks);
  };

  const handleDelete = async (taskId: string) => {
    const token = localStorage.getItem("accessToken");

    try {
      await axios.delete(`http://localhost:3000/api/task/${taskId}`, {
        headers: { Authorization: token },
      });

      const updatedTasks = tasksToRender.filter((task) => task.id !== taskId);
      setAssignedTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <>
      <div className="flex gap-x-20 gap-y-10 flex-wrap">
        {tasksToRender.length === 0 && <div>No Tasks Assigned</div>}
        {tasksToRender.map((task: Tasks) => {
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
              className="border border-white/10 rounded-lg min-w-[350px] max-w-[350px] p-5"
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
                <p>
                  {`Assigned to ${
                    allUsers?.find((user) => user.id === assignedToId)?.username
                  }`}
                </p>
                <div className="flex gap-2">
                  <button
                    className="mt-3 text-sm cursor-pointer text-blue-400 flex items-center gap-1"
                    onClick={() => {
                      setTaskToEdit(task);
                      setOpen(true);
                    }}
                  >
                    <Pencil size={14} />
                    Edit Task
                  </button>
                  <button
                    className="mt-3 text-sm cursor-pointer text-red-400 flex items-center gap-1"
                    onClick={() => handleDelete(id)}
                  >
                    <Trash size={14} />
                    Delete Task
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <TaskForm
        open={open}
        setOpen={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) setTaskToEdit(null);
        }}
        taskToEdit={taskToEdit}
        onTaskUpdated={handleTaskUpdated}
      />
    </>
  );
}
