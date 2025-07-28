import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";

interface ProjectDialogProps {
  open: boolean;
  onClose: () => void;
  project: any;
}

export default function ProjectDialog({ open, onClose, project }: ProjectDialogProps) {
  const isEdit = !!project;
  const { register, handleSubmit, reset } = useForm({
    defaultValues: project || { name: "", description: "", status: "Active" },
  });

  const onSubmit = (data: any) => {
    alert(`${isEdit ? "Edit" : "Create"} project: ${JSON.stringify(data, null, 2)}`);
    reset();
    onClose();
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Project Name</label>
              <input
                {...register("name", { required: true })}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter project name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                {...register("description")}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter project description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                {...register("status")}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Active">Active</option>
                <option value="Planning">Planning</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/90 shadow"
              >
                {isEdit ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
} 