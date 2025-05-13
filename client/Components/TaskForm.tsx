"use client";
import { useAuth } from "@/context/AuthContext";
import { Tasks, User } from "@/types";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function TaskForm({
  open,
  setOpen,
  taskToEdit,
  onTaskUpdated,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  taskToEdit?: Tasks | null;
  onTaskUpdated?: (updatedTask: Tasks) => void;
}) {
  const { allUsers, user } = useAuth();
  const filteredUsers = allUsers?.filter((u: User) => u.id !== user?.id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("LOW");
  const [assignTo, setAssignTo] = useState<string>("");

  useEffect(() => {
    if (open && taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setDueDate(new Date(taskToEdit.dueDate).toISOString().split("T")[0]);
      setPriority(taskToEdit.priority);
      setAssignTo(taskToEdit.assignedToId || "");
    }
  }, [open, taskToEdit]);

  useEffect(() => {
    if (!open) {
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("LOW");
      setAssignTo("");
    }
  }, [open]);

  const handleInputChange =
    (setter: (value: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setter(e.target.value);
    };

  async function handleSubmit() {
    const token = localStorage.getItem("accessToken");

    const taskPayload = {
      title,
      description,
      assignedToId: assignTo,
      dueDate: new Date(dueDate).toISOString(),
      priority,
    };

    try {
      if (taskToEdit) {
        const response = await axios.put(
          `http://ec2-3-111-39-63.ap-south-1.compute.amazonaws.com:3000/api/task/${taskToEdit.id}`,
          taskPayload,
          { headers: { Authorization: token } }
        );
        onTaskUpdated?.(response.data);
      } else {
        const response = await axios.post(
          "http://ec2-3-111-39-63.ap-south-1.compute.amazonaws.com:3000/api/task",
          taskPayload,
          { headers: { Authorization: token } }
        );
        console.log(response);
      }

      setOpen(false);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
          >
            <div className="bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div>
                <div className="mt-3 text-center sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-xl font-semibold text-white"
                  >
                    {taskToEdit ? "Edit Task" : "Create a Task"}
                  </DialogTitle>
                  <div className="mt-2">
                    <form className="flex flex-col w-full gap-4">
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="task_title"
                          className="text-white text-md ml-1"
                        >
                          Title
                        </label>
                        <input
                          type="text"
                          id="task_title"
                          className="border border-white/20 rounded-md py-1 px-2"
                          required
                          value={title}
                          onChange={handleInputChange(setTitle)}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="task_description"
                          className="text-white text-md ml-1"
                        >
                          Description
                        </label>
                        <input
                          type="text"
                          id="task_description"
                          className="border border-white/20 rounded-md py-1 px-2"
                          required
                          value={description}
                          onChange={handleInputChange(setDescription)}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="due_date"
                          className="text-white text-md ml-1"
                        >
                          Date
                        </label>
                        <input
                          type="date"
                          id="due_date"
                          className="border border-white/20 rounded-md py-1 px-2"
                          required
                          value={dueDate}
                          onChange={handleInputChange(setDueDate)}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="task-priority"
                          className="text-white text-md ml-1"
                        >
                          Priority
                        </label>
                        <select
                          name="priority"
                          className="border bg-black border-white/20 rounded-md py-1 px-2"
                          value={priority}
                          onChange={handleInputChange(setPriority)}
                        >
                          <option value="LOW">Low</option>
                          <option value="MEDIUM">Medium</option>
                          <option value="CRITICAL">Critical</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="assign-to"
                          className="text-white text-md ml-1"
                        >
                          Assign to
                        </label>
                        <select
                          name="assign-to"
                          className="border bg-black border-white/20 rounded-md py-1 px-2"
                          value={assignTo}
                          onChange={handleInputChange(setAssignTo)}
                        >
                          <option value="">Select a user</option>
                          {filteredUsers?.map((user: User) => (
                            <option key={user.id} value={user.id}>
                              {user.username}
                            </option>
                          ))}
                        </select>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-black px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex w-full justify-center cursor-pointer rounded-md bg-white text-black px-3 py-2 text-sm font-semibold shadow-xs sm:ml-3 sm:w-auto"
              >
                {taskToEdit ? "Update" : "Create"}
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full cursor-pointer justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
