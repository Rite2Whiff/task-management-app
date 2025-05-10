import { useSocket } from "@/context/SocketContext";
import { useTask } from "@/context/TaskContext";
import React, { useEffect, useState } from "react";

export default function RadioButton({ taskId }: { taskId: string }) {
  const { updateTask, fetchTasks } = useTask();
  const socket = useSocket();
  const [selected, setSelected] = useState(false);

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={selected}
        onChange={async () => {
          setSelected((prevState) => {
            if (prevState === false) {
              return true;
            } else {
              return false;
            }
          });
        }}
        className="hidden"
      />
      <span
        className={`w-4 h-4 flex items-center justify-center rounded-full border-2 transition-colors ${
          selected
            ? "bg-green-500 border-green-500 text-white"
            : "border-gray-400"
        }`}
      >
        {selected && "✓"}
      </span>
    </label>
  );
}
