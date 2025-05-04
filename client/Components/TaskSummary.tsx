import { TaskSummaryValues } from "@/types";

export default function TaskSummary({
  title,
  info,
  tasksNumber,
  icon: Icon,
  classname,
}: TaskSummaryValues) {
  return (
    <div className="border p-5 border-white/10 rounded-lg min-w-[300px] flex flex-col gap-2">
      <div className="flex justify-between">
        <h3 className="text-md">{title}</h3>
        <span>
          <Icon size={18} className={classname} />
        </span>
      </div>
      <div>
        <p className="text-2xl font-bold">{tasksNumber}</p>
        <p className="text-sm">{info}</p>
      </div>
    </div>
  );
}
