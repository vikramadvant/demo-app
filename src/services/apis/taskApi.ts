import { Task } from "@/types";
import { CreateTaskRequest, UpdateTaskRequest } from "@/types/task";

export class TaskApi {
  private baseUrl: string;

  constructor() {
    this.baseUrl = "/api/tasks";
  }

  async createTask(taskData: CreateTaskRequest): Promise<Task> {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      throw new Error("Failed to create task");
    }

    return response.json();
  }

  async getTasks(): Promise<Task[]> {
    const response = await fetch(this.baseUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    return response.json();
  }

  async updateTask(taskId: number, updateData: UpdateTaskRequest): Promise<Task> {
    const response = await fetch(this.baseUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "id": taskId.toString(),
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error("Failed to update task");
    }

    return response.json();
  }

  async deleteTask(taskId: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${taskId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete task");
    }
  }

  async getTaskById(taskId: number): Promise<Task> {
    const response = await fetch(`${this.baseUrl}/${taskId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch task");
    }

    return response.json();
  }
} 