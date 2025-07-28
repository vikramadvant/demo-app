import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProjectApi } from "@/services/apis/projectApi";
import { projectKeys } from "./useProjects";
import { CreateProjectRequest, UpdateProjectRequest } from "@/types/project";

const projectApi = new ProjectApi();

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectRequest) => projectApi.createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
    onError: (error: any) => {
      console.error("Error creating project:", error);
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
    },
    onError: (error: any) => {
      console.error("Error updating project:", error);
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
    },
    onError: (error: any) => {
      console.error("Error deleting project:", error);
    },
  });
} 