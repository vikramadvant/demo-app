import { NextRequest, NextResponse } from "next/server";
import { ProjectService } from "@/services/internal/projectService";

const projectService = new ProjectService();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 }
      );
    }

    const projectWithTasks = await projectService.getProjectWithTasks(id);
    return NextResponse.json(projectWithTasks);
  } catch (error: any) {
    if (error.message === "Unauthorized" || error.message.includes("Unauthorized")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error.message === "Project not found") {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Failed to fetch project with tasks" },
      { status: 500 }
    );
  }
} 