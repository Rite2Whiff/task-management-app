import { useSocket } from "@/context/SocketContext";
import type { Notification, Tasks, User } from "@/types";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";

export default function Notification() {
  const socket = useSocket();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("notifications");
    if (stored) {
      setNotifications(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    const getUser = localStorage.getItem("user");
    const user = JSON.parse(getUser as string);
    const getAllUsers = localStorage.getItem("allUsers");
    const allUsers = JSON.parse(getAllUsers as string);

    const handleNewTask = (task: Tasks) => {
      if (task.assignedToId === user.id) {
        const findUser = allUsers.find((u: User) => u.id === task.userId);
        const newNotification = {
          ...task,
          title: task.title,
          assignedBy: findUser?.username,
        };
        setNotifications((prev) => [...prev, newNotification]);
        setCount((prev) => prev + 1);
      }
    };

    socket?.on("new-task", handleNewTask);

    return () => {
      socket?.off("new-task", handleNewTask);
    };
  }, [socket, notifications]);

  return (
    <div className="relative">
      <button className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <Bell />
      </button>

      <div
        className={`${
          isOpen
            ? "absolute min-w-[400px] min-h-[100px] max-h-[300px] border-bottom border-white/10 top-4 right-4 z-2 bg-black text-white  rounded-md overflow-y-auto "
            : " hidden"
        }`}
      >
        {notifications.map((task, index) => (
          <div
            key={index}
            className="mb-2 border-b border-white/10 p-2 text-sm"
          >
            <p className="p-2 text-md">
              A new task &nbsp; <strong>{task.title}</strong>
              &nbsp; was assigned by &nbsp;
              <strong>{task.assignedBy}</strong>
            </p>
          </div>
        ))}
        <button
          className={`${
            notifications.length > 0
              ? "inline-block w-full cursor-pointer"
              : "hidden"
          }`}
          onClick={() => {
            setNotifications([]);
          }}
        >
          clear all
        </button>
      </div>

      <div className="absolute bottom-5 left-4 bg-red-500 text-white rounded-full px-2">
        {count}
      </div>
    </div>
  );
}
