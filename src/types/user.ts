import { User as PrismaUser } from "@prisma/client";

// Base user type extending Prisma model
export interface User extends PrismaUser {
  roles?: string[]; // e.g. ['ADMIN', 'USER']
}

// User creation data type
export interface CreateUserData {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  imageUrl?: string | null;
}

// Component prop types
export interface UserProviderProps {
  children: React.ReactNode;
} 