import { format } from "date-fns";
import { TaskCardProps } from "@/types";
import { Trash2, Loader2 } from "lucide-react";

export function TaskCard({ task, onClick, onDelete, isDeleting }: TaskCardProps) {
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    if (onDelete && !isDeleting) {
      onDelete(task.id);
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors relative group"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
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
      
      {/* Delete button - visible on hover */}
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="absolute top-2 right-2 p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50"
        title="Delete task"
      >
        {isDeleting ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <Trash2 size={14} />
        )}
      </button>
    </div>
  );
} 