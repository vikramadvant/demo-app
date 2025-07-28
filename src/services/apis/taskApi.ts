import { Task } from "@/types";
import { CreateTaskRequest, UpdateTaskRequest } from "@/types/task";
import { httpClient } from "./httpClient";

export class TaskApi {
  private baseUrl: string = "/tasks";

  async createTask(taskData: CreateTaskRequest): Promise<Task> {
    const response = await httpClient.post<Task>(this.baseUrl, taskData);
    return response.data;
  }

  async getTasks(): Promise<Task[]> {
    const response = await httpClient.get<Task[]>(this.baseUrl);
    return response.data;
  }

  async updateTask(taskId: number, updateData: UpdateTaskRequest): Promise<Task> {
    const response = await httpClient.patch<Task>(this.baseUrl, updateData, {
      headers: {
        "id": taskId.toString(),
      },
    });
    return response.data;
  }

  async deleteTask(taskId: number): Promise<void> {
    await httpClient.delete(`${this.baseUrl}/${taskId}`);
  }

  async getTaskById(taskId: number): Promise<Task> {
    const response = await httpClient.get<Task>(`${this.baseUrl}/${taskId}`);
    return response.data;
  }
} 