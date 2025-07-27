import { Task as PrismaTask } from "@prisma/client";

// Base task type extending Prisma model
export interface Task extends PrismaTask {
  project: {
    name: string;
  };
}

// API request types
export interface CreateTaskRequest {
  name: string;
  description?: string;
  status: string;
  dueDate?: string;
  projectId?: number;
}

export interface UpdateTaskRequest {
  name?: string;
  description?: string;
  status?: string;
  dueDate?: string;
}

// Task status enum
export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

// Component prop types
export interface TaskCardProps {
  task: Task;
  onClick: () => void;
  onDelete?: (taskId: number) => void;
  isDeleting?: boolean;
}

export interface TaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task;
}

export interface TaskColumnProps {
  title: string;
  status: string;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onTaskDelete?: (taskId: number) => void;
  deletingTaskId?: number | null;
} 