export default function TaskPriority({ priority }: { priority: string }) {
  if (priority === "LOW") {
    return (
      <div className="text-[#2eb88a] py-1 px-6 text-md bg-[#3399771a] rounded-2xl flex items-center">
        {priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase()}
      </div>
    );
  } else if (priority === "MEDIUM") {
    return (
      <div className="text-[#af57db] py-1 px-6 text-md bg-[#c366e0]/10 rounded-2xl flex items-center">
        {priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase()}
      </div>
    );
  } else
    return (
      <div className="text-[#7f1d1d] py-1 px-6 text-md bg-[#ff00001a] rounded-2xl flex items-center">
        {priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase()}
      </div>
    );
}
