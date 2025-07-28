import { Task } from "@/types";
import { CreateTaskRequest, UpdateTaskRequest } from "@/types/task";
import { httpClient } from "./httpClient";

export class ProjectApi {
  private baseUrl: string = "/project";

  async createProject(data: CreateTaskRequest): Promise<Task> {
    const response = await httpClient.post<Task>(`${this.baseUrl}/create`, data);
    return response.data;
  }

  async updateProject(id: number, data: UpdateTaskRequest): Promise<Task> {
    const response = await httpClient.put<Task>(`${this.baseUrl}/update/${id}`, data);
    return response.data;
  } 

  async deleteProject(id: number): Promise<void> {
    await httpClient.delete(`${this.baseUrl}/delete/${id}`);
  }

  async getProjectById(id: number): Promise<Task> {
    const response = await httpClient.get<Task>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async getAllProjects(): Promise<Task[]> {
    const response = await httpClient.get<Task[]>(`${this.baseUrl}/all`);
    return response.data;
  }
} 