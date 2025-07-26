// src/app/api/tasks/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const taskId = parseInt(params.id);
    const body = await req.json();
    const user = await getOrCreateUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const task = await prisma.task.update({
      where: {
        id: taskId,
        userId: user.id,
      },
      data: {
        name: body.name,
        description: body.description,
        status: body.status,
        dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json({ error: "Task update failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const user = await getOrCreateUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const task = await prisma.task.create({
      data: {
        name: body.name,
        description: body.description,
        status: body.status,
        dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
        user: {
          connect: { id: user.id },
        },
        project: {
          connect: { id: 1 },
        }
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}

export async function GET() {
  const user = await getOrCreateUser();

  if (!user || !user.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return new NextResponse("Failed to fetch tasks", { status: 500 });
  }
}