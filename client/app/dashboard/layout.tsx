"use client";
import Sidebar from "@/Components/Sidebar";
import TasksDashboard from "@/Components/TasksDashboard";
import { ViewOption } from "@/types";
import { useState } from "react";

export default function DashboardLayout() {
  const [view, setView] = useState<ViewOption>("myTasks");

  function handleSelect(selectedView: ViewOption) {
    setView(selectedView);
    console.log(selectedView);
  }

  return (
    <main className="flex min-h-screen ">
      <Sidebar onSelect={handleSelect} view={view} />
      <TasksDashboard view={view} />
    </main>
  );
}
