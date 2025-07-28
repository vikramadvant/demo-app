import { useQuery } from '@tanstack/react-query';
import { UserApi } from '@/services/apis/userApi';

const userApi = new UserApi();

// Query keys
export const userKeys = {
  all: ['users'] as const,
  current: () => [...userKeys.all, 'current'] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
};

// Hook to fetch current user
export const useCurrentUser = () => {
  return useQuery({
    queryKey: userKeys.current(),
    queryFn: () => userApi.getCurrentUser(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: false, // Don't retry on 401 errors
  });
}; 