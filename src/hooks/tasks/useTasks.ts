import { useQuery } from '@tanstack/react-query';
import { TaskApi } from '@/services/apis/taskApi';

const taskApi = new TaskApi();

// Query keys
export const taskKeys = {
  all: ['tasks'] as const,
  lists: () => [...taskKeys.all, 'list'] as const,
  list: (filters: string) => [...taskKeys.lists(), { filters }] as const,
  details: () => [...taskKeys.all, 'detail'] as const,
  detail: (id: number) => [...taskKeys.details(), id] as const,
};

// Hook to fetch all tasks
export const useTasks = () => {
  return useQuery({
    queryKey: taskKeys.lists(),
    queryFn: () => taskApi.getTasks(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
};

// Hook to fetch a single task by ID
export const useTask = (taskId: number) => {
  return useQuery({
    queryKey: taskKeys.detail(taskId),
    queryFn: () => taskApi.getTaskById(taskId),
    enabled: !!taskId, // Only run query if taskId exists
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}; 