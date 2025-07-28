import { prisma } from "@/lib/prisma";
import { User, CreateUserData } from "@/types";

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } });
  }

  async create(userData: CreateUserData): Promise<User> {
    return await prisma.user.create({
      data: userData,
    });
  }

  async findOrCreate(userData: CreateUserData): Promise<User> {
    let user = await this.findByEmail(userData.email);

    if (!user) {
      user = await this.create(userData);
    }

    return user;
  }

  // Fetch user with roles as string array
  async findUserWithRolesByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });
    if (!user) return null;
    // Map roles to string array
    const roles = user.roles.map((ur) => ur.role.role);
    return { ...user, roles };
  }
} 