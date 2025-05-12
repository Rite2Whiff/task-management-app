import Tasks from "./Tasks";
import SearchAndFilter from "./SearchAndFilter";
import { useState } from "react";

export default function MyTasks() {
  const [search, setSearch] = useState("");
  return (
    <>
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Your Tasks</h2>
          <p className="text-lg text-[#a3a3a3]">
            Manage your tasks and boost your productivity
          </p>
        </div>
        <SearchAndFilter setSearch={setSearch} search={search} />
      </div>
      <div>
        <Tasks search={search} />
      </div>
    </>
  );
}
