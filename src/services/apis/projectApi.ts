import { httpClient } from "./httpClient";

export interface CreateProjectRequest {
  name: string;
  description?: string;
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
}

export interface Project {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export class ProjectApi {
  private baseUrl = "/project";

  async createProject(data: CreateProjectRequest): Promise<Project> {
    const response = await httpClient.post(this.baseUrl, data);
    return response.data;
  }

  async getAllProjects(): Promise<Project[]> {
    const response = await httpClient.get(this.baseUrl);
    return response.data;
  }

  async getProjectById(id: number): Promise<Project> {
    const response = await httpClient.get(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async updateProject(id: number, data: UpdateProjectRequest): Promise<Project> {
    const response = await httpClient.patch(`${this.baseUrl}/${id}`, data);
    return response.data;
  }

  async deleteProject(id: number): Promise<void> {
    await httpClient.delete(`${this.baseUrl}/${id}`);
  }

  async getProjectWithTasks(id: number): Promise<Project & { tasks: any[] }> {
    const response = await httpClient.get(`${this.baseUrl}/${id}/tasks`);
    return response.data;
  }
} 