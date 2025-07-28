import { currentUser } from "@clerk/nextjs/server";
import { UserRepository } from "@/services/repositories/userRepository";
import { User, CreateUserData } from "@/types";

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getOrCreateUser(): Promise<User | null> {
    const clerkUser = await currentUser();

    if (!clerkUser || !clerkUser.emailAddresses?.[0]?.emailAddress) {
      return null;
    }

    const email = clerkUser.emailAddresses[0].emailAddress;

    return await this.userRepository.findOrCreate({
      email,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      imageUrl: clerkUser.imageUrl,
    });
  }

  async getCurrentUser(): Promise<any> {
    const clerkUser = await currentUser();
    if (!clerkUser || !clerkUser.emailAddresses?.[0]?.emailAddress) {
      return null;
    }
    const email = clerkUser.emailAddresses[0].emailAddress;
    return await this.userRepository.findUserWithRolesByEmail(email);
  }
} 