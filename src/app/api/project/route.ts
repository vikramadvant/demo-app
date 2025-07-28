// src/app/api/tasks/route.ts
import { NextRequest, NextResponse } from "next/server";
import { TaskService } from "@/services/internal/taskService";

const taskService = new TaskService();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const task = await taskService.createTask(body);
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const tasks = await taskService.getUserTasks();
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const taskIdHeader = req.headers.get("id");

    if (!taskIdHeader) {
      return NextResponse.json({ error: "Task ID not provided" }, { status: 400 });
    }

    const taskId = parseInt(taskIdHeader, 10);
    const body = await req.json();
    const task = await taskService.updateTask(taskId, body);

    return NextResponse.json(task);
  } catch (error) {
    console.error("PATCH error:", error);
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Task update failed" }, { status: 500 });
  }
}