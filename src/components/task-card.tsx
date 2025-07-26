import { format } from "date-fns";

interface TaskCardProps {
  task: {
    id: string;
    name: string;
    description?: string;
    status: string;
    projectId: string;
    dueDate?: string;
    project: {
      name: string;
    };
  };
  onClick: () => void;
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{task.name}</h4>
          {task.description && (
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {task.description}
            </p>
          )}
          {/* <p className="text-sm text-gray-500 mt-2">
            Project: {task.project.name}
          </p> */}
        </div>
        <div className="flex flex-col items-end gap-2">
          {task.dueDate && (
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
              Due {format(new Date(task.dueDate), "MMM d")}
            </span>
          )}
          <span
            className={`text-xs px-2 py-1 rounded ${
              task.status === "TODO"
                ? "bg-gray-100 text-gray-700"
                : task.status === "IN_PROGRESS"
                ? "bg-blue-100 text-blue-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {task.status === "TODO"
              ? "To Do"
              : task.status === "IN_PROGRESS"
              ? "In Progress"
              : "Done"}
          </span>
        </div>
      </div>
    </div>
  );
} 