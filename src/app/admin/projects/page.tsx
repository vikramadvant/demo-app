"use client";
import { useState } from "react";
import { Plus, Users, Edit, Trash2, Loader2 } from "lucide-react";
import ProjectTable from "@/components/admin/ProjectTable";
import ProjectDialog from "@/components/admin/ProjectDialog";
import { useProjects, useCreateProject, useUpdateProject, useDeleteProject } from "@/hooks/projects";
import { Project } from "@/types/project";
import { ConfirmDialog } from "@/components/ConfirmDialog";

export default function AdminProjectsPage() {
  const [showProjectDialog, setShowProjectDialog] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  // React Query hooks
  const { data: projects = [], isLoading, error } = useProjects();
  const createProjectMutation = useCreateProject();
  const updateProjectMutation = useUpdateProject();
  const deleteProjectMutation = useDeleteProject();

  const handleCreate = () => {
    setEditingProject(null);
    setShowProjectDialog(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setShowProjectDialog(true);
  };

  const handleDelete = (project: Project) => {
    setProjectToDelete(project);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (projectToDelete) {
      await deleteProjectMutation.mutateAsync(projectToDelete.id);
      setShowDeleteDialog(false);
      setProjectToDelete(null);
    }
  };

  const handleAssign = (project: Project) => {
    // TODO: Implement assign functionality
    console.log("Assign project:", project);
  };

  const handleProjectSubmit = async (data: any) => {
    if (editingProject) {
      await updateProjectMutation.mutateAsync({ id: editingProject.id, data });
    } else {
      await createProjectMutation.mutateAsync(data);
    }
    setShowProjectDialog(false);
    setEditingProject(null);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Projects</h1>
            <p className="text-gray-600">Failed to load projects. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

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
            disabled={createProjectMutation.isPending}
            className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-lg shadow hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {createProjectMutation.isPending ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Plus size={18} />
            )}
            New Project
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={32} className="animate-spin text-primary" />
            <span className="ml-2 text-gray-600">Loading projects...</span>
          </div>
        ) : (
          <ProjectTable
            projects={projects}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAssign={handleAssign}
            isLoading={deleteProjectMutation.isPending}
          />
        )}
      </div>

      <ProjectDialog
        open={showProjectDialog}
        onClose={() => {
          setShowProjectDialog(false);
          setEditingProject(null);
        }}
        project={editingProject}
        onSubmit={handleProjectSubmit}
        isLoading={createProjectMutation.isPending || updateProjectMutation.isPending}
      />

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setProjectToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Project"
        message={`Are you sure you want to delete "${projectToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
} 