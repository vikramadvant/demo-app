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

    let findOrCreate = await this.userRepository.findOrCreate({
      email,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      imageUrl: clerkUser.imageUrl,
    });

    if (!findOrCreate) {
      console.error("Failed to create or find user in database");
      return null;
    }

    findOrCreate = JSON.parse(JSON.stringify(findOrCreate)); 

    const user = await this.userRepository.findUserWithRolesByEmail(findOrCreate?.email);

    if (!user) {
      console.error("Failed to find user with roles in database");
      return null;
    }

    return user;

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