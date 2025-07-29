import { TaskRepository } from "@/services/repositories/taskRepository";
import { AuthService } from "@/services/internal/authService";
import { Task, CreateTaskRequest, UpdateTaskRequest } from "@/types";

export class TaskService {
  private taskRepository: TaskRepository;
  private authService: AuthService;

  constructor() {
    this.taskRepository = new TaskRepository();
    this.authService = new AuthService();
  }

  async createTask(taskData: CreateTaskRequest) {
    const user = await this.authService.getCurrentUser();
    
    if (!user) {
      throw new Error("Unauthorized");
    }

    return await this.taskRepository.create({
      ...taskData,
      userId: user.id,
      dueDate: taskData.dueDate ? new Date(taskData.dueDate) : undefined,
    });
  }

  async getUserTasks() {
    const user = await this.authService.getCurrentUser();
    console.log('user: in task services', user);
    
    if (!user) {
      throw new Error("Unauthorized");
    }

    return await this.taskRepository.findManyByUserId(user.id);
  }

  async updateTask(
    taskId: number,
    updateData: UpdateTaskRequest
  ) {
    const user = await this.authService.getCurrentUser();
    
    if (!user) {
      throw new Error("Unauthorized");
    }

    return await this.taskRepository.update(taskId, user.id, {
      ...updateData,
      dueDate: updateData.dueDate ? new Date(updateData.dueDate) : undefined,
    });
  }

  async getTaskById(taskId: number) {
    const user = await this.authService.getCurrentUser();
    
    if (!user) {
      throw new Error("Unauthorized");
    }

    return await this.taskRepository.findById(taskId, user.id);
  }

  async deleteTask(taskId: number) {
    const user = await this.authService.getCurrentUser();
    
    if (!user) {
      throw new Error("Unauthorized");
    }

    return await this.taskRepository.delete(taskId, user.id);
  }
} 