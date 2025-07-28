import { Edit, Trash2, Users, Loader2 } from "lucide-react";
import { Project } from "@/types/project";

interface ProjectTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
  onAssign: (project: Project) => void;
  isLoading?: boolean;
}

export default function ProjectTable({ projects, onEdit, onDelete, onAssign, isLoading }: ProjectTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-blue-100 to-purple-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Created</th>
            <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {projects.map((project) => (
            <tr key={project.id} className="hover:bg-blue-50 transition cursor-pointer">
              <td className="px-6 py-4 font-semibold text-primary" onClick={() => onAssign(project)}>
                {project.name}
              </td>
              <td className="px-6 py-4 text-gray-600">{project.description || "No description"}</td>
              <td className="px-6 py-4 text-gray-500 text-sm">
                {new Date(project.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 flex items-center justify-center gap-2">
                <button
                  className="p-2 rounded hover:bg-blue-50 text-blue-600"
                  title="Assign to user"
                  onClick={() => onAssign(project)}
                >
                  <Users size={18} />
                </button>
                <button
                  className="p-2 rounded hover:bg-yellow-50 text-yellow-600"
                  title="Edit project"
                  onClick={() => onEdit(project)}
                >
                  <Edit size={18} />
                </button>
                <button
                  className="p-2 rounded hover:bg-red-50 text-red-600"
                  title="Delete project"
                  onClick={() => onDelete(project)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Trash2 size={18} />
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 