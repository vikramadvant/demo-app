import { useQuery } from '@tanstack/react-query';
import { UserApi } from '@/services/apis/profileApi';
import { UsersApi } from '@/services/apis/userApi';
import { User } from '@/types/user';

const userApi = new UserApi();
const usersApi = new UsersApi();

// Query keys
export const userKeys = {
  all: ['users'] as const,
  current: () => [...userKeys.all, 'current'] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
};

// Hook to fetch current user
export const useCurrentUser = () => {
  return useQuery<User | null>({
    queryKey: userKeys.current(),
    queryFn: () => userApi.getCurrentUser(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: false, // Don't retry on 401 errors
  });
};

// Hook to fetch all users
export const useUsers = () => {
  return useQuery<User[], Error>({
    queryKey: userKeys.all,
    queryFn: () => usersApi.getAllUsers(),
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: false,
  });
};

// Utility to check if user is admin
export function isAdmin(user?: User | null): boolean {
  return !!user?.roles?.includes('ADMIN');
} 