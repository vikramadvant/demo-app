import * as Dialog from "@radix-ui/react-dialog";
import { X, UserPlus } from "lucide-react";

const mockUsers = [
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Charlie Lee" },
];

interface AssignProjectDialogProps {
  open: boolean;
  onClose: () => void;
  project: any;
}

export default function AssignProjectDialog({ open, onClose, project }: AssignProjectDialogProps) {
  if (!project) return null;

  const handleAssign = (user: any) => {
    alert(`Assign project '${project.name}' to ${user.name}`);
    onClose();
  };

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-8 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-bold">Assign Project</Dialog.Title>
            <button onClick={onClose} className="p-2 rounded hover:bg-gray-100">
              <X size={20} />
            </button>
          </div>
          <div className="mb-4">
            <p className="text-gray-700 mb-2">Select a user to assign <span className="font-semibold text-primary">{project.name}</span>:</p>
            <div className="space-y-2">
              {mockUsers.map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleAssign(user)}
                  className="w-full flex items-center gap-2 px-4 py-2 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium transition"
                >
                  <UserPlus size={18} /> {user.name}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
} 