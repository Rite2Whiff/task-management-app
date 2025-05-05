"use client";
import {
  Funnel,
  CirclePlus,
  Search,
  ChartColumnIncreasing,
  Clock,
  CircleCheck,
  CircleAlert,
} from "lucide-react";
import TaskSummary from "./TaskSummary";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function TasksDashboard() {
  const { user } = useAuth();

  return (
    <div className="w-5/6 ">
      <header className="border-b-1 border-white/10 px-5 py-5 flex justify-between items-center">
        <h2 className="text-lg">Hi {user?.username}</h2>
        <div>
          <button
            type="button"
            className="pointer bg-white px-6 py-2 text-black rounded-lg"
          >
            <Link href={"/auth/login"}>Logout</Link>
          </button>
        </div>
      </header>
      <div className="p-4 flex flex-col gap-y-5">
        <div className="flex justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Your Tasks</h2>
            <p className="text-lg text-[#a3a3a3]">
              Manage your tasks and boost your productivity
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="absolute top-3 left-2">
                <Search size={16} color="#a3a3a3" />
              </span>
              <input
                type="text"
                id="tasks"
                placeholder="Search tasks..."
                className="border border-white/10 px-8 py-2 rounded-lg"
              />
            </div>
            <button className="border border-white/10 p-2 rounded-lg cursor-pointer">
              <Funnel color="#fff" />
            </button>
            <button className="bg-white px-4 py-2 rounded-lg text-black flex gap-2 cursor-pointer">
              <span>
                <CirclePlus />
              </span>
              Add Task
            </button>
          </div>
        </div>
        <div className="flex gap-4">
          <TaskSummary
            icon={ChartColumnIncreasing}
            title="Total Tasks"
            tasksNumber={24}
            info="12 tasks added this week"
          />
          <TaskSummary
            icon={Clock}
            title="In Progress"
            tasksNumber={24}
            classname="text-[#cc5fd9]"
            info="12 tasks added this week"
          />
          <TaskSummary
            icon={CircleCheck}
            title="Completed"
            tasksNumber={24}
            classname="text-[#2eb88a]"
            info="12 tasks added this week"
          />
          <TaskSummary
            icon={CircleAlert}
            title="Overdue"
            tasksNumber={24}
            classname="text-[#7f1d1d]"
            info="12 tasks added this week"
          />
        </div>
      </div>
    </div>
  );
}
