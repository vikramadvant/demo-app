import { ProjectRepository } from "@/services/repositories/projectRepository";
import { AuthService } from "./authService";

export class ProjectService {
  private projectRepository: ProjectRepository;
  private authService: AuthService;

  constructor() {
    this.projectRepository = new ProjectRepository();
    this.authService = new AuthService();
  }

  async createProject(data: { name: string; description?: string }) {
    // Check if user is admin
    const currentUser = await this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error("Unauthorized");
    }

    const isAdmin = currentUser.roles?.includes("ADMIN");
    if (!isAdmin) {
      throw new Error("Unauthorized: Admin access required");
    }

    return await this.projectRepository.create(data);
  }

  async getAllProjects() {
    // Check if user is admin
    const currentUser = await this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error("Unauthorized");
    }

    const isAdmin = currentUser.roles?.includes("ADMIN");
    if (!isAdmin) {
      throw new Error("Unauthorized: Admin access required");
    }

    return await this.projectRepository.findAll();
  }

  async getProjectById(id: number) {
    // Check if user is admin
    const currentUser = await this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error("Unauthorized");
    }

    const isAdmin = currentUser.roles?.includes("ADMIN");
    if (!isAdmin) {
      throw new Error("Unauthorized: Admin access required");
    }

    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new Error("Project not found");
    }

    return project;
  }

  async updateProject(id: number, data: { name?: string; description?: string }) {
    // Check if user is admin
    const currentUser = await this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error("Unauthorized");
    }

    const isAdmin = currentUser.roles?.includes("ADMIN");
    if (!isAdmin) {
      throw new Error("Unauthorized: Admin access required");
    }

    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new Error("Project not found");
    }

    return await this.projectRepository.update(id, data);
  }

  async deleteProject(id: number) {
    // Check if user is admin
    const currentUser = await this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error("Unauthorized");
    }

    const isAdmin = currentUser.roles?.includes("ADMIN");
    if (!isAdmin) {
      throw new Error("Unauthorized: Admin access required");
    }

    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new Error("Project not found");
    }

    // check whether this project is assigned to any user
    const assignees = await this.projectRepository.getAssignees(id);
    console.log('assignees: ', assignees);

    if (assignees.length > 0) {
      return new Error("Project cannot be deleted as it has assigned users");
    }
    console.log('assignees: ', assignees);
    
    return await this.projectRepository.delete(id);
  }

  async getProjectWithTasks(id: number) {
    // Check if user is admin
    const currentUser = await this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error("Unauthorized");
    }

    const isAdmin = currentUser.roles?.includes("ADMIN");
    if (!isAdmin) {
      throw new Error("Unauthorized: Admin access required");
    }

    const project = await this.projectRepository.findWithTasks(id);
    if (!project) {
      throw new Error("Project not found");
    }

    return project;
  }

  async assignUsersToProject(projectId: number, userIds: number[]) {
    // Check if user is admin
    const currentUser = await this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error("Unauthorized");
    }
    const isAdmin = currentUser.roles?.includes("ADMIN");
    if (!isAdmin) {
      throw new Error("Unauthorized: Admin access required");
    }
    return await this.projectRepository.assignUsersToProject(projectId, userIds);
  }

  async removeUserFromProject(projectId: number, userId: number) {
    // Check if user is admin
    const currentUser = await this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error("Unauthorized");
    }
    const isAdmin = currentUser.roles?.includes("ADMIN");
    if (!isAdmin) {
      throw new Error("Unauthorized: Admin access required");
    }
    return await this.projectRepository.removeUserFromProject(projectId, userId);
  }
}
