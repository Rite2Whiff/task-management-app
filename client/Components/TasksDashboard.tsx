"use client";

import { useAuth } from "@/context/AuthContext";
import { ViewOption } from "@/types";
import MyTasks from "./MyTasks";
import AssignedTasks from "./AssignedTasks";
import { OverdueTasks } from "./OverdueTasks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TasksDashboard({ view }: { view: ViewOption }) {
  const { user, logout, getAllUsers } = useAuth();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      await getAllUsers();
    }
    fetchData();
  }, []);

  return (
    <div className="w-5/6 ">
      <header className="border-b-1 border-white/10 px-5 py-5 flex justify-between items-center">
        <h2 className="text-lg">Hi {user?.username}</h2>
        <div>
          <button
            onClick={() => {
              logout();
              router.push("/auth/login");
            }}
            type="button"
            className="cursor-pointer bg-white px-6 py-2 text-black rounded-lg"
          >
            Logout
          </button>
        </div>
      </header>
      <div className="p-4 flex flex-col gap-y-5">
        {(view === "myTasks" && (
          <div>
            <MyTasks />
          </div>
        )) ||
          (view === "assignedTasks" && (
            <div>
              <AssignedTasks />
            </div>
          )) ||
          (view === "overdueTasks" && (
            <div>
              <OverdueTasks />
            </div>
          ))}
      </div>
    </div>
  );
}
