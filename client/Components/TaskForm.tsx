"use client";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/types";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import axios from "axios";

import { RefObject } from "react";

export default function TaskForm({
  open,
  setOpen,
  titleRef,
  descriptionRef,
  dateRef,
  priorityRef,
  assignToRef,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  titleRef: RefObject<HTMLInputElement | null>;
  descriptionRef: RefObject<HTMLInputElement | null>;
  dateRef: RefObject<HTMLInputElement | null>;
  priorityRef: RefObject<HTMLSelectElement | null>;
  assignToRef: RefObject<HTMLSelectElement | null>;
}) {
  const { allUsers, user } = useAuth();
  const filetUsers = allUsers?.filter((u: User) => u.id !== user?.id);

  async function handleSubmit() {
    const title = titleRef.current?.value;
    const description = descriptionRef.current?.value;
    const dateString = new Date(dateRef.current?.value as string);
    dateString.setUTCHours(14, 30, 0, 0);
    const date = dateString.toISOString();
    const priority = priorityRef.current?.value;
    const token = localStorage.getItem("accessToken");
    const assignTo = assignToRef.current?.value;
    const assignToUser = filetUsers?.find(
      (user: User) => user.username === assignTo
    );
    console.log(title, description, date, priority, assignToUser?.id, token);
    const response = await axios.post(
      "http://localhost:3000/api/task",
      {
        title,
        description,
        assignedToId: assignToUser?.id,
        dueDate: date,
        priority,
      },
      { headers: { Authorization: token } }
    );
    console.log(response);
  }

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10 ">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg  text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div>
                <div className="mt-3 text-center  sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-xl font-semibold text-white"
                  >
                    Create a Task
                  </DialogTitle>
                  <div className="mt-2">
                    <form className="flex flex-col w-full gap-4">
                      <div className="flex flex-col gap-1 ">
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
                          ref={titleRef}
                          required
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
                          ref={descriptionRef}
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
                          ref={dateRef}
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
                          ref={priorityRef}
                          name="priority"
                          className="border bg-black
                          border-white/20 rounded-md py-1 px-2"
                        >
                          <option value="LOW">Low</option>
                          <option value="MEDIUM">Medium</option>
                          <option value="CRITICAL">Critical</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="task-priority"
                          className="text-white text-md ml-1"
                        >
                          Assign to
                        </label>
                        <select
                          ref={assignToRef}
                          name="priority"
                          className="border bg-black
                          border-white/20 rounded-md py-1 px-2"
                        >
                          {filetUsers?.map((user: User) => {
                            return (
                              <option key={user.id} value={user.username}>
                                {user.username}
                              </option>
                            );
                          })}
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
                className="inline-flex w-full justify-center cursor-pointer rounded-md bg-white text-black px-3 py-2 text-sm font-semibold  shadow-xs sm:ml-3 sm:w-auto"
              >
                Create
              </button>
              <button
                type="button"
                data-autofocus
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
