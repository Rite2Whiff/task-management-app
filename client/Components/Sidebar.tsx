import Link from "next/link";
import { LayoutDashboard, Settings, ClipboardList } from "lucide-react";
export default function Sidebar() {
  return (
    <div className="w-1/6  border-r-1 border-white/10">
      <h2 className="border-b-1 border-white/10 py-5 px-3">Task Flow</h2>
      <ul className="mt-5 px-3 flex flex-col gap-5">
        <li className="flex gap-2">
          <span>
            <LayoutDashboard />
          </span>
          <Link href={"#"}>Dashboard</Link>
        </li>
        <li className="flex gap-2">
          <span>
            <ClipboardList />
          </span>
          <Link href={"#"}>Tasks</Link>
        </li>
        <li className="flex gap-2">
          <span>
            <Settings />
          </span>
          <Link href={"#"}>Settings</Link>
        </li>
      </ul>
    </div>
  );
}
