import { NextRequest, NextResponse } from "next/server";
import { UserService } from "@/services/internal/userService";

const userService = new UserService();

export async function GET() {
  try {
    const users = await userService.getUsers();
    return NextResponse.json(users);
  } catch (error: any) {
    if (error.message === "Unauthorized" || error.message.includes("Unauthorized")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
