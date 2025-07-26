"use client";

import { UserButton } from "@clerk/nextjs";
import { useUser } from "@/context/UserContext";
import { useState, useEffect } from "react";
import { TaskDialog } from "@/components/TaskDialog";
import { TaskCard } from "@/components/TaskCard";

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
  const user = useUser();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  async function fetchTasks() {
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  }

  function handleDialogClose() {
    setIsCreateDialogOpen(false);
    setSelectedTask(null);
    fetchTasks(); // refresh after create or update
  }


  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-semibold text-primary">Dashboard</h1>
              <span className="text-sm text-gray-500">
                Welcome, {user?.firstName || "User"}!
              </span>
            </div>
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
        onClose={handleDialogClose}      
      />

      {selectedTask && (
        <TaskDialog
          isOpen={true}
          onClose={handleDialogClose}
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