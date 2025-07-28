import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { X, Loader2 } from "lucide-react";
import { Project, CreateProjectRequest, UpdateProjectRequest } from "@/types/project";
import { useEffect } from "react";

interface ProjectDialogProps {
  open: boolean;
  onClose: () => void;
  project?: Project | null;
  onSubmit: (data: CreateProjectRequest | UpdateProjectRequest) => void;
  isLoading?: boolean;
}

export default function ProjectDialog({ open, onClose, project, onSubmit, isLoading }: ProjectDialogProps) {
  const isEdit = !!project;
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { name: "", description: "" },
  });

  // Reset form values when project changes (for edit mode)
  useEffect(() => {
    if (project) {
      reset({
        name: project.name,
        description: project.description || "",
      });
    } else {
      reset({
        name: "",
        description: "",
      });
    }
  }, [project, reset]);

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    reset();
  };

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-8 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-bold">
              {isEdit ? "Edit Project" : "Create Project"}
            </Dialog.Title>
            <button onClick={onClose} className="p-2 rounded hover:bg-gray-100">
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Project Name *</label>
              <input
                {...register("name", { required: "Project name is required" })}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter project name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                {...register("description")}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter project description"
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/90 shadow disabled:opacity-50 flex items-center gap-2"
              >
                {isLoading && <Loader2 size={16} className="animate-spin" />}
                {isEdit ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
} 