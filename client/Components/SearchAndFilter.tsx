import { Funnel, CirclePlus, Search } from "lucide-react";
import { useRef, useState } from "react";
import TaskForm from "./TaskForm";

export default function SearchAndFilter({
  setSearch,
  search,
}: {
  setSearch: (value: string) => void;
  search: string;
}) {
  const [open, setOpen] = useState(false);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);
  const priorityRef = useRef<HTMLSelectElement | null>(null);
  const assignToRef = useRef<HTMLSelectElement | null>(null);

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
        <button className="border border-white/10 p-2 rounded-lg cursor-pointer">
          <Funnel color="#fff" />
        </button>
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
      <TaskForm
        open={open}
        setOpen={setOpen}
        titleRef={titleRef}
        descriptionRef={descriptionRef}
        dateRef={dateRef}
        priorityRef={priorityRef}
        assignToRef={assignToRef}
      />
    </div>
  );
}
