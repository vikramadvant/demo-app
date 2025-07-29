import { Task } from "@/types";
import { CreateTaskRequest, UpdateTaskRequest } from "@/types/task";
import { httpClient } from "./httpClient";

export class TaskApi {
  private baseUrl = "/tasks";

  async createTask(data: any) {
    try {
      const response = await httpClient.post(this.baseUrl, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error?.message || "Failed to create task");
    }
  }

  async getTasks() {
    try {
      const response = await httpClient.get(this.baseUrl);
      return response.data;
    } catch (error: any) {
      throw new Error(error?.message || "Failed to fetch tasks");
    }
  }

  async getTask(taskId: number) {
    try {
      const response = await httpClient.get(`${this.baseUrl}/${taskId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error?.message || "Failed to fetch task");
    }
  }

async updateTask(taskId: number, data: any) {
  try {
    const response = await httpClient.patch(this.baseUrl, data, {
      headers: {
        'id': taskId,
      },
    });
    return response.data;
  } catch (error: any) {
    console.log('error: ', error);
    throw new Error(error?.message || "Failed to update task");
  }
}


  async deleteTask(taskId: number) {
    try {
      const response = await httpClient.delete(`${this.baseUrl}/${taskId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error?.message || "Failed to delete task");
    }
  }
} 