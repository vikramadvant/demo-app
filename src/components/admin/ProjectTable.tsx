import { Edit, Trash2, Users } from "lucide-react";

interface Project {
  id: number;
  name: string;
  description: string;
  assignedTo: string;
  status: string;
}

interface ProjectTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
  onAssign: (project: Project) => void;
}

export default function ProjectTable({ projects, onEdit, onDelete, onAssign }: ProjectTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-blue-100 to-purple-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Assigned To</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {projects.map((project) => (
            <tr key={project.id} className="hover:bg-blue-50 transition cursor-pointer">
              <td className="px-6 py-4 font-semibold text-primary" onClick={() => onAssign(project)}>
                {project.name}
              </td>
              <td className="px-6 py-4 text-gray-600">{project.description}</td>
              <td className="px-6 py-4">
                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${project.assignedTo === 'Unassigned' ? 'bg-gray-100 text-gray-500' : 'bg-green-100 text-green-700'}`}>
                  {project.assignedTo}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-block px-2 py-1 rounded text-xs font-semibold
                  ${project.status === 'Active' ? 'bg-blue-100 text-blue-700' :
                    project.status === 'Completed' ? 'bg-green-100 text-green-700' :
                    'bg-yellow-100 text-yellow-700'}`}
                >
                  {project.status}
                </span>
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
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 