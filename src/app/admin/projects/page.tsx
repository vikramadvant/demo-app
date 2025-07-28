"use client";
import { useState } from "react";
import { Plus, Users, Edit, Trash2 } from "lucide-react";
import ProjectTable from "@/components/admin/ProjectTable";
import ProjectDialog from "@/components/admin/ProjectDialog";
import AssignProjectDialog from "@/components/admin/AssignProjectDialog";

const mockProjects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Revamp the company website for 2024.",
    assignedTo: "Alice Johnson",
    status: "Active",
  },
  {
    id: 2,
    name: "Mobile App Launch",
    description: "Launch the new mobile app for Android and iOS.",
    assignedTo: "Unassigned",
    status: "Planning",
  },
  {
    id: 3,
    name: "Marketing Campaign",
    description: "Q3 digital marketing campaign.",
    assignedTo: "Bob Smith",
    status: "Completed",
  },
];

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState(mockProjects);
  const [showProjectDialog, setShowProjectDialog] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleCreate = () => {
    setEditingProject(null);
    setShowProjectDialog(true);
  };

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setShowProjectDialog(true);
  };

  const handleDelete = (project: any) => {
    // Show confirm dialog (not implemented)
    alert(`Delete project: ${project.name}`);
  };

  const handleAssign = (project: any) => {
    setSelectedProject(project);
    setShowAssignDialog(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-1">Project Management</h1>
            <p className="text-gray-500">Create, assign, and manage all projects in your organization.</p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-lg shadow hover:bg-primary/90 transition-colors"
          >
            <Plus size={18} /> New Project
          </button>
        </div>
        <ProjectTable
          projects={projects}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAssign={handleAssign}
        />
      </div>
      <ProjectDialog
        open={showProjectDialog}
        onClose={() => setShowProjectDialog(false)}
        project={editingProject}
      />
      <AssignProjectDialog
        open={showAssignDialog}
        onClose={() => setShowAssignDialog(false)}
        project={selectedProject}
      />
    </div>
  );
} 