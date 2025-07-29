import { UserRepository } from "@/services/repositories/userRepository";
import { AuthService } from "@/services/internal/authService";
import { Task, CreateTaskRequest, UpdateTaskRequest } from "@/types";

export class UserService {
  private userRepository: UserRepository;
  private authService: AuthService;

  constructor() {
    this.userRepository = new UserRepository();
    this.authService = new AuthService();
  }

  async getUsers() {
    const user = await this.authService.getCurrentUser();
    
    if (!user) {
      throw new Error("Unauthorized");
    }

    return await this.userRepository.getUsers();
  }

} 