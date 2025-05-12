import { CirclePlus, Search } from "lucide-react";
import { useState } from "react";
import TaskForm from "./TaskForm";

export default function SearchAndFilter({
  setSearch,
  search,
}: {
  setSearch: (value: string) => void;
  search: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-8">
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          className="bg-white px-4 py-2 rounded-lg text-black flex gap-2 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <span>
            <CirclePlus />
          </span>
          Add Task
        </button>
      </div>
      <TaskForm open={open} setOpen={setOpen} />
    </div>
  );
}
