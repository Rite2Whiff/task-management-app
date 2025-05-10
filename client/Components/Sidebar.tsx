import { SidebarProps, ViewOption } from "@/types";
import { ClipboardList, CircleAlert } from "lucide-react";

const Sidebar: React.FC<SidebarProps> = ({
  onSelect,
  view,
}: {
  onSelect: (view: ViewOption) => void;
  view: ViewOption;
}) => {
  return (
    <div className="w-1/6 border-r-1 border-white/10">
      <h2 className="border-b-1 text-lg border-white/10 py-[26px] px-3">
        Task Flow
      </h2>
      <div className="mt-5 px-3 flex flex-col gap-2">
        <button
          className={`flex gap-2 py-2 px-2 rounded-md cursor-pointer ${
            view === "myTasks"
              ? "bg-[#262626]"
              : "flex gap-2 cursor-pointer py-2 px-2 rounded-md "
          }`}
          onClick={() => onSelect("myTasks")}
        >
          <span>
            <ClipboardList />
          </span>
          <p className="text-md">My Tasks</p>
        </button>
        <button
          className={`flex gap-2 py-2 px-2 rounded-md cursor-pointer ${
            view === "assignedTasks"
              ? "bg-[#262626]"
              : "flex gap-2 cursor-pointer py-2 px-2 rounded-md "
          }`}
          onClick={() => onSelect("assignedTasks")}
        >
          <span>
            <ClipboardList />
          </span>
          <p>Assigned Tasks</p>
        </button>
        <button
          className={`flex gap-2 py-2 px-2 rounded-md cursor-pointer ${
            view === "overdueTasks"
              ? "bg-[#262626]"
              : "flex gap-2 cursor-pointer py-2 px-2 rounded-md "
          }`}
          onClick={() => onSelect("overdueTasks")}
        >
          <span>
            <CircleAlert />
          </span>
          <p>Overdue Tasks</p>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
