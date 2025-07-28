import { useState } from "react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { taskFormSchema } from "@/schemas/task";
import { format } from "date-fns";
import { TaskDialogProps } from "@/types";
import { Trash2 } from "lucide-react";
import { ConfirmDialog } from "./ConfirmDialog";
import { useCreateTask, useUpdateTask, useDeleteTask } from "@/hooks/tasks";

type TaskFormValues = z.infer<typeof taskFormSchema>;

export function TaskDialog({ isOpen, onClose, task }: TaskDialogProps) {
  const router = useRouter();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // React Query hooks
  const { createTask, isLoading: isCreating } = useCreateTask();
  const { updateTask, isLoading: isUpdating } = useUpdateTask();
  const { deleteTask, isLoading: isDeleting } = useDeleteTask();

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      name: task?.name || "",
      description: task?.description || "",
      status: (task?.status as "TODO" | "IN_PROGRESS" | "DONE") || "TODO",
      dueDate: task?.dueDate ? format(new Date(task.dueDate), "yyyy-MM-dd") : undefined,
    },
  });

  async function onSubmit(data: TaskFormValues) {
    try {
      if (task) {
        await updateTask({ taskId: task.id, updateData: data });
      } else {
        await createTask(data);
      }

      router.refresh();
      onClose();
      form.reset();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  }

  async function handleDelete() {
    if (!task) return;
    
    try {
      await deleteTask(task.id);
      router.refresh();
      onClose();
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again.");
    }
  }

  const isLoading = isCreating || isUpdating || isDeleting;

  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={onClose}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-xl font-semibold">
                {task ? "Edit Task" : "Create Task"}
              </Dialog.Title>
              {task && (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={isDeleting}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors disabled:opacity-50"
                  title="Delete task"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
            
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Task Name
                </label>
                <input
                  {...form.register("name")}
                  id="name"
                  className="w-full rounded-md border p-2"
                  placeholder="Enter task name"
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <textarea
                  {...form.register("description")}
                  id="description"
                  className="h-24 w-full rounded-md border p-2"
                  placeholder="Enter task description"
                />
                {form.formState.errors.description && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.description.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="status" className="text-sm font-medium">
                    Status
                  </label>
                  <select
                    {...form.register("status")}
                    id="status"
                    className="w-full rounded-md border p-2"
                  >
                    <option value="TODO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="DONE">Done</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="dueDate" className="text-sm font-medium">
                    Due Date
                  </label>
                  <input
                    {...form.register("dueDate")}
                    type="date"
                    id="dueDate"
                    className="w-full rounded-md border p-2"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : task ? "Update Task" : "Create Task"}
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </>
  );
} 