import { Project as PrismaUser } from "@prisma/client";

export interface Project extends PrismaUser {
  tasks?: string[]; // e.g. ['Task1', 'Task2']
}

// Project creation data type
export interface CreateProjectRequest {
  name: string;
  description?: string | null;
}

// Project update data type
export interface UpdateProjectRequest {
  name?: string;
  description?: string | null;
}


// Component prop types
export interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  onDelete?: (projectId: number) => void;
  isDeleting?: boolean;
}

export interface ProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  project?: Project;
}

export interface ProjectListProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
  onProjectDelete?: (projectId: number) => void;
  deletingProjectId?: number | null;
}

export interface ProjectColumnProps {
  title: string;
  projects: Project[];
  onProjectClick: (project: Project) => void;
  onProjectDelete?: (projectId: number) => void;
  deletingProjectId?: number | null;
}

