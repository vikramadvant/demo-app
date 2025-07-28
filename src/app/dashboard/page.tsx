"use client";

import { UserButton } from "@clerk/nextjs";
import { useUser } from "@/context/UserContext";
import { useState } from "react";
import { TaskDialog } from "@/components/TaskDialog";
import { TaskCard } from "@/components/TaskCard";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Task, TaskColumnProps } from "@/types";
import { useTasks, useDeleteTask } from "@/hooks/tasks";

export default function DashboardPage() {
  const user = useUser();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; taskId: number | null }>({
    isOpen: false,
    taskId: null
  });

  // React Query hooks
  const { data: tasks = [], isLoading: tasksLoading, error: tasksError } = useTasks();
  const { deleteTask, isLoading: isDeleting } = useDeleteTask();

  function handleDeleteTask(taskId: number) {
    setDeleteConfirm({ isOpen: true, taskId });
  }

  async function confirmDelete() {
    if (!deleteConfirm.taskId) return;
    
    try {
      await deleteTask(deleteConfirm.taskId);
      setDeleteConfirm({ isOpen: false, taskId: null });
    } catch (error) {
      console.error("Failed to delete task:", error);
      alert("Failed to delete task. Please try again.");
    }
  }

  function handleDialogClose() {
    setIsCreateDialogOpen(false);
    setSelectedTask(null);
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

  if (tasksLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (tasksError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Error loading tasks. Please try again.</p>
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
            onTaskDelete={handleDeleteTask}
            deletingTaskId={isDeleting ? deleteConfirm.taskId : null}
          />
          <TaskColumn
            title="In Progress"
            status="IN_PROGRESS"
            tasks={tasks.filter((task) => task.status === "IN_PROGRESS")}
            onTaskClick={(task) => setSelectedTask(task)}
            onTaskDelete={handleDeleteTask}
            deletingTaskId={isDeleting ? deleteConfirm.taskId : null}
          />
          <TaskColumn
            title="Done"
            status="DONE"
            tasks={tasks.filter((task) => task.status === "DONE")}
            onTaskClick={(task) => setSelectedTask(task)}
            onTaskDelete={handleDeleteTask}
            deletingTaskId={isDeleting ? deleteConfirm.taskId : null}
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

      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, taskId: null })}
        onConfirm={confirmDelete}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
}

function TaskColumn({ title, status, tasks, onTaskClick, onTaskDelete, deletingTaskId }: TaskColumnProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold text-lg mb-4">{title}</h3>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => onTaskClick(task)}
            onDelete={onTaskDelete}
            isDeleting={deletingTaskId === task.id}
          />
        ))}
      </div>
    </div>
  );
} 