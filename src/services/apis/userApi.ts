import { User } from "@/types";
import { httpClient } from "./httpClient";

export class UserApi {
  private baseUrl: string = "/me";

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await httpClient.get<User>(this.baseUrl);
      return response.data;
    } catch (error: any) {
      if (error.status === 401) {
        return null;
      }
      throw error;
    }
  }
} 