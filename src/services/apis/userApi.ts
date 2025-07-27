import { User } from "@/types";

export class UserApi {
  private baseUrl: string;

  constructor() {
    this.baseUrl = "/api/me";
  }

  async getCurrentUser(): Promise<User | null> {
    const response = await fetch(this.baseUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        return null;
      }
      throw new Error("Failed to fetch user");
    }

    return response.json();
  }
} 