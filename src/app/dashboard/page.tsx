"use client";

import { UserButton } from "@clerk/nextjs";
import { useState } from "react";
import { TaskDialog } from "@/components/task-dialog";
import { TaskCard } from "@/components/task-card";

interface Task {
  id: string;
  name: string;
  description?: string;
  status: string;
  projectId: string;
  dueDate?: string;
  project: {
    name: string;
  };
}

export default function DashboardPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // This would normally come from an API call
  const tasks: Task[] = [
    {
      id: "1",
      name: "Example Task",
      description: "This is an example task",
      status: "TODO",
      projectId: "1",
      project: {
        name: "Example Project",
      },
      dueDate: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Example Task",
      description: "This is an example task",
      status: "IN_PROGRESS",
      projectId: "1",
      project: {
        name: "Example Project",
      },
      dueDate: new Date().toISOString(),
    },
    {
      id: "3",
      name: "Example Task",
      description: "This is an example task",
      status: "IN_PROGRESS",
      projectId: "1",
      project: {
        name: "Example Project",
      },
      dueDate: new Date().toISOString(),
    },
    {
      id: "4",
      name: "Example Task",
      description: "This is an example task",
      status: "DONE",
      projectId: "1",
      project: {
        name: "Example Project",
      },
      dueDate: new Date().toISOString(),
    },
    {
      id: "5",
      name: "Example Task",
      description: "This is an example task",
      status: "IN_PROGRESS",
      projectId: "1",
      project: {
        name: "Example Project",
      },
      dueDate: new Date().toISOString(),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-primary">Dashboard</h1>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">Your Tasks</h2>
            <p className="text-gray-500">Manage and track your tasks</p>
          </div>
          <button
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Create New Task
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TaskColumn
            title="To Do"
            status="TODO"
            tasks={tasks.filter((task) => task.status === "TODO")}
            onTaskClick={(task) => setSelectedTask(task)}
          />
          <TaskColumn
            title="In Progress"
            status="IN_PROGRESS"
            tasks={tasks.filter((task) => task.status === "IN_PROGRESS")}
            onTaskClick={(task) => setSelectedTask(task)}
          />
          <TaskColumn
            title="Done"
            status="DONE"
            tasks={tasks.filter((task) => task.status === "DONE")}
            onTaskClick={(task) => setSelectedTask(task)}
          />
        </div>
      </main>

      <TaskDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      />

      {selectedTask && (
        <TaskDialog
          isOpen={true}
          onClose={() => setSelectedTask(null)}
          task={selectedTask}
        />
      )}
    </div>
  );
}

interface TaskColumnProps {
  title: string;
  status: string;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

function TaskColumn({ title, status, tasks, onTaskClick }: TaskColumnProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold text-lg mb-4">{title}</h3>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => onTaskClick(task)}
          />
        ))}
      </div>
    </div>
  );
} 