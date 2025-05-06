export default function TaskPriority({ priority }: { priority: string }) {
  if (priority === "LOW") {
    return (
      <div className="text-[#2eb88a] py-1 px-6 text-md bg-[#3399771a] rounded-2xl flex items-center">
        {priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase()}
      </div>
    );
  } else if (priority === "MEDIUM") {
    return (
      <div className="text-[#cc5fd9] bg-purple-100 rounded-xl">
        {" "}
        {priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase()}
      </div>
    );
  } else
    return (
      <div className="text-[#7f1d1d] bg-red-100 rounded-xl">
        {" "}
        {priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase()}
      </div>
    );
}
