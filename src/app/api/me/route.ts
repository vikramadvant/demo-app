// src/app/api/me/route.ts
import { NextResponse } from "next/server";
import { AuthService } from "@/services/internal/authService";

const authService = new AuthService();

// Returns user with roles: string[]
export async function GET() {
  try {
    const user = await authService.getCurrentUser();
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}
