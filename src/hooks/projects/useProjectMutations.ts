import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProjectApi } from "@/services/apis/projectApi";
import { projectKeys } from "./useProjects";
import { CreateProjectRequest, UpdateProjectRequest } from "@/types/project";
import { toast } from "react-hot-toast";

const projectApi = new ProjectApi();

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectRequest) => projectApi.createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      toast.success("Project created successfully");
    },
    onError: (error: any) => {
      console.error("Error creating project:", error);
      toast.error(error?.message || "Failed to create project");
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateProjectRequest }) =>
      projectApi.updateProject(id, data),
    onSuccess: (updatedProject) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      queryClient.setQueryData(
        projectKeys.detail(updatedProject.id),
        updatedProject
      );
      toast.success("Project updated successfully");
    },
    onError: (error: any) => {
      console.error("Error updating project:", error);
      toast.error(error?.message || "Failed to update project");
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: number) => projectApi.deleteProject(projectId),
    onSuccess: (_, projectId) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      queryClient.removeQueries({ queryKey: projectKeys.detail(projectId) });
      toast.success("Project deleted successfully");
    },
    onError: (error: any) => {
      console.error("Error deleting project:", error);
      toast.error(error?.message || "Failed to delete project");
    },
  });
}

export function useAssignUsersToProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ projectId, userIds }: { projectId: number; userIds: number[] }) =>
      projectApi.assignUsersToProject(projectId, userIds),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(projectId) });
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      toast.success("Users assigned to project successfully");
    },
    onError: (error: any) => {
      console.error("Error assigning users to project:", error);
      toast.error(error?.message || "Failed to assign users to project");
    },
  });
}

export function useRemoveUserFromProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ projectId, userId }: { projectId: number; userId: number }) =>
      projectApi.removeUserFromProject(projectId, userId),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(projectId) });
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      toast.success("User removed from project successfully");
    },
    onError: (error: any) => {
      console.error("Error removing user from project:", error);
      toast.error(error?.message || "Failed to remove user from project");
    },
  });
} 