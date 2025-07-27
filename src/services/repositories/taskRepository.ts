import { prisma } from "@/lib/prisma";
import { Task, CreateTaskRequest } from "@/types";

export class TaskRepository {
  async create(taskData: {
    name: string;
    description?: string;
    status: string;
    dueDate?: Date;
    userId: number;
    projectId?: number;
  }): Promise<Task> {
    return await prisma.task.create({
      data: {
        name: taskData.name,
        description: taskData.description,
        status: taskData.status,
        dueDate: taskData.dueDate,
        project: {
          connect: { id: 1}
        },
        user: {
          connect: { id: taskData.userId },
        }
      },
    });
  }

  async findManyByUserId(userId: number): Promise<(Task & { project: { name: string } })[]> {
    return await prisma.task.findMany({
      where: {
        userId,
      },
      include: {
        project: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async update(
    taskId: number,
    userId: number,
    updateData: {
      name?: string;
      description?: string;
      status?: string;
      dueDate?: Date;
    }
  ): Promise<Task> {
    return await prisma.task.update({
      where: {
        id: taskId,
        userId,
      },
      data: updateData,
    });
  }

  async findById(taskId: number, userId: number): Promise<(Task & { project: { name: string } }) | null> {
    return await prisma.task.findFirst({
      where: {
        id: taskId,
        userId,
      },
      include: {
        project: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async delete(taskId: number, userId: number): Promise<Task> {
    return await prisma.task.delete({
      where: {
        id: taskId,
        userId,
      },
    });
  }
} 