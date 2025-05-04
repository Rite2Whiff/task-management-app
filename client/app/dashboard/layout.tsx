import Sidebar from "@/Components/Sidebar";
import TasksDashboard from "@/Components/TasksDashboard";

export default function DashboardLayout() {
  return (
    <main className="flex min-h-screen">
      <Sidebar />
      <TasksDashboard />
    </main>
  );
}
