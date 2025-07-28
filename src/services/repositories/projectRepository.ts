import { prisma } from "@/lib/prisma";
import { Project } from "@/types/project";

export class ProjectRepository {
  async create(projectData: {
    name: string;
    description?: string;
  }): Promise<Project> {
    return await prisma.project.create({
      data: {
        name: projectData.name,
        description: projectData.description
      },
    });
  }

  async findAll(): Promise<Project[]> {
    return await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(projectId: number): Promise<Project | null> {
    return await prisma.project.findFirst({
      where: {
        id: projectId
      },
    });
  }

  async update(
    projectId: number,
    updateData: {
      name?: string;
      description?: string;
    }
  ): Promise<Project> {
    return await prisma.project.update({
      where: {
        id: projectId
      },
      data: updateData,
    });
  }

  async delete(projectId: number): Promise<Project> {
    return await prisma.project.delete({
      where: {
        id: projectId
      },
    });
  }
}
