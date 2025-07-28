import { ProjectRepository } from "@/services/repositories/projectRepository";
import { AuthService } from "@/services/internal/authService";
import { CreateProjectRequest, UpdateProjectRequest, Project } from "@/types/project";

export class ProjectService {
  private projectRepository: ProjectRepository;
  private authService: AuthService;

  constructor() {
    this.projectRepository = new ProjectRepository();
    this.authService = new AuthService();
  }

  async createProject(projectData: CreateProjectRequest): Promise<Project> {
    const user = await this.authService.getCurrentUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    return await this.projectRepository.create({
      name: projectData.name,
      description: projectData.description ? projectData.description : undefined,
    });
  }

  async getAllProjects(): Promise<Project[]> {
    const user = await this.authService.getCurrentUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    return await this.projectRepository.findAll(); // Since userId removed
  }

  async getProjectById(projectId: number): Promise<Project | null> {
    const user = await this.authService.getCurrentUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    return await this.projectRepository.findById(projectId);
  }

  async updateProject(projectId: number, updateData: UpdateProjectRequest): Promise<Project> {
    const user = await this.authService.getCurrentUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    return await this.projectRepository.update(projectId, {
      name: updateData.name,
      description: updateData.description ? updateData.description : undefined,
    });
  }

  async deleteProject(projectId: number): Promise<Project> {
    const user = await this.authService.getCurrentUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    return await this.projectRepository.delete(projectId);
  }
}
