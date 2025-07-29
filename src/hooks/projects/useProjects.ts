import { useQuery } from "@tanstack/react-query";
import { ProjectApi } from "@/services/apis/projectApi";

const projectApi = new ProjectApi();

export const projectKeys = {
  all: ["projects"] as const,
  lists: () => [...projectKeys.all, "list"] as const,
  list: (filters: string) => [...projectKeys.lists(), { filters }] as const,
  details: () => [...projectKeys.all, "detail"] as const,
  detail: (id: number) => [...projectKeys.details(), id] as const,
};

export function useProjects() {
  return useQuery({
    queryKey: projectKeys.lists(),  
    queryFn: () => projectApi.getAllProjects(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useProject(projectId: number) {
  return useQuery({
    queryKey: projectKeys.detail(projectId),
    queryFn: () => projectApi.getProjectById(projectId),
    enabled: !!projectId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useProjectWithTasks(projectId: number) {
  return useQuery({
    queryKey: [...projectKeys.detail(projectId), "tasks"],
    queryFn: () => projectApi.getProjectWithTasks(projectId),
    enabled: !!projectId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useProjectAssignees(projectId: number) {
  return useQuery({
    queryKey: [...projectKeys.detail(projectId), "assignees"],
    queryFn: () => projectApi.getProjectAssignees(projectId),
    enabled: !!projectId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}