import Tasks from "./Tasks";
import SearchAndFilter from "./SearchAndFilter";

export default function MyTasks() {
  return (
    <>
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Your Tasks</h2>
          <p className="text-lg text-[#a3a3a3]">
            Manage your tasks and boost your productivity
          </p>
        </div>
        <SearchAndFilter />
      </div>
      <div>
        <Tasks />
      </div>
    </>
  );
}
