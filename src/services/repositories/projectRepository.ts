import { prisma } from "@/lib/prisma";
import { Project } from "@prisma/client";

export class ProjectRepository {
  async create(data: { name: string; description?: string }): Promise<Project> {
    return await prisma.project.create({
      data,
    });
  }

  async findAll(): Promise<Project[]> {
    return await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: number): Promise<Project | null> {
    return await prisma.project.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: { name?: string; description?: string }): Promise<Project> {
    return await prisma.project.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Project> {
    return await prisma.project.delete({
      where: { id },
    });
  }

  async findWithTasks(id: number) {
    return await prisma.project.findUnique({
      where: { id },
      include: {
        tasks: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }

  // Assign users to a project (replace all assignees)
  async assignUsersToProject(projectId: number, userIds: number[]) {
    // Remove all existing mappings for this project
    await prisma.projectUserMappings.deleteMany({ where: { projectId } });
    // Add new mappings
    const created = await Promise.all(
      userIds.map(userId =>
        prisma.projectUserMappings.create({
          data: { projectId, userId }
        })
      )
    );
    return created;
  }

  // Remove a user from a project
  async removeUserFromProject(projectId: number, userId: number) {
    return await prisma.projectUserMappings.deleteMany({
      where: { projectId, userId }
    });
  }
}
