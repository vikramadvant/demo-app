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
} 