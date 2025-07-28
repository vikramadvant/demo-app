import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TaskApi } from '@/services/apis/taskApi';
import { CreateTaskRequest, UpdateTaskRequest } from '@/types/task';
import { taskKeys } from './useTasks';

const taskApi = new TaskApi();

// Hook to create a new task
export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (taskData: CreateTaskRequest) => taskApi.createTask(taskData),
    onSuccess: () => {
      // Invalidate and refetch tasks list
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    },
    onError: (error: any) => {
      console.error('Error creating task:', error);
    },
  });

  return {
    createTask: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
};

// Hook to update an existing task
export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ taskId, updateData }: { taskId: number; updateData: UpdateTaskRequest }) =>
      taskApi.updateTask(taskId, updateData),
    onSuccess: (updatedTask, variables) => {
      // Update the specific task in cache
      queryClient.setQueryData(taskKeys.detail(variables.taskId), updatedTask);
      // Invalidate and refetch tasks list
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    },
    onError: (error: any) => {
      console.error('Error updating task:', error);
    },
  });

  return {
    updateTask: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
};

// Hook to delete a task
export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (taskId: number) => taskApi.deleteTask(taskId),
    onSuccess: (_, taskId) => {
      // Remove the specific task from cache
      queryClient.removeQueries({ queryKey: taskKeys.detail(taskId) });
      // Invalidate and refetch tasks list
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    },
    onError: (error: any) => {
      console.error('Error deleting task:', error);
    },
  });

  return {
    deleteTask: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
}; 