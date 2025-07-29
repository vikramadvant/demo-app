import { NextRequest, NextResponse } from "next/server";
import { ProjectService } from "@/services/internal/projectService";

const projectService = new ProjectService();

// Assign users to a project (replace all assignees)
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = parseInt(params.id);
    if (isNaN(projectId)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
    }
    const { userIds } = await request.json();
    if (!Array.isArray(userIds)) {
      return NextResponse.json({ error: "userIds must be an array" }, { status: 400 });
    }
    const result = await projectService.assignUsersToProject(projectId, userIds);
    return NextResponse.json(result);
  } catch (error: any) {
    if (error.message === "Unauthorized" || error.message.includes("Unauthorized")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to assign users" }, { status: 500 });
  }
}

// Remove a user from a project
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = parseInt(params.id);
    const { userId } = await request.json();
    if (isNaN(projectId) || !userId) {
      return NextResponse.json({ error: "Invalid project ID or user ID" }, { status: 400 });
    }
    const result = await projectService.removeUserFromProject(projectId, userId);
    return NextResponse.json(result);
  } catch (error: any) {
    if (error.message === "Unauthorized" || error.message.includes("Unauthorized")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to remove user from project" }, { status: 500 });
  }
} 