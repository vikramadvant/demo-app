import { User } from "@/types";
import { httpClient } from "./httpClient";

export class UsersApi {
  private baseUrl: string = "/user";

  async getAllUsers(): Promise<User[]> {
    try {
      const response = await httpClient.get<User[]>(`${this.baseUrl}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error?.message || "Failed to fetch users");
    }
  }
}