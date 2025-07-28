import { NextRequest, NextResponse } from "next/server";
import { ProjectService } from "@/services/internal/projectService";

const projectService = new ProjectService();

export async function GET() {
  try {
    const projects = await projectService.getAllProjects();
    return NextResponse.json(projects);
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Project name is required" },
        { status: 400 }
      );
    }

    const project = await projectService.createProject({ name, description });
    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    if (error.message === "Unauthorized" || error.message.includes("Unauthorized")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
