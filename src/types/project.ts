import { Project as PrismaProject } from "@prisma/client";

export interface Project extends PrismaProject {
  tasks?: Task[];
}

export interface Task {
  id: number;
  name: string;
  description?: string;
  status: string;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  projectId: number;
  user?: {
    id: number;
    firstName?: string;
    lastName?: string;
    email: string;
  };
}

export interface CreateProjectRequest {
  name: string;
  description?: string;
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
}

export interface ProjectWithTasks extends Project {
  tasks: Task[];
}

// Component prop types
export interface ProjectCardProps {
  project: Project;
  onEdit?: (project: Project) => void;
  onDelete?: (projectId: number) => void;
  onAssign?: (project: Project) => void;
}

export interface ProjectDialogProps {
  project?: Project;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateProjectRequest | UpdateProjectRequest) => void;
  isLoading?: boolean;
}

export interface ProjectTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (projectId: number) => void;
  onAssign: (project: Project) => void;
  isLoading?: boolean;
}

export interface AssignProjectDialogProps {
  project?: Project;
  isOpen: boolean;
  onClose: () => void;
  onAssign: (projectId: number, userId: number) => void;
  users: Array<{
    id: number;
    firstName?: string;
    lastName?: string;
    email: string;
  }>;
}

