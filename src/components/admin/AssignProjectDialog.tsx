import * as Dialog from "@radix-ui/react-dialog";
import { X, UserCheck, UserPlus } from "lucide-react";
import { useState, useEffect } from "react";
import { useAssignUsersToProject } from "@/hooks/projects";
import { useProjectAssignees } from "@/hooks/projects";

interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;
}

interface AssignProjectDialogProps {
  open: boolean;
  onClose: () => void;
  project: { id: number; name: string } | null;
  assignedUserIds: number[];
  allUsers: User[];
  onSave?: (userIds: number[]) => void; // optional, for local state fallback
}

export default function AssignProjectDialog({
  open,
  onClose,
  project,
  assignedUserIds,
  allUsers,
  onSave,
}: AssignProjectDialogProps) {
  console.log('allUsers: ', allUsers);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const assignMutation = useAssignUsersToProject();
  const [error, setError] = useState<string | null>(null);
  const { data: assignees, isLoading: isLoadingAssignees } = useProjectAssignees(project?.id || 0);

  useEffect(() => {
    if (assignees && Array.isArray(assignees)) {
      setSelectedUserIds(assignees.map((a) => a.id));
    } else {
      setSelectedUserIds(assignedUserIds || []);
    }
    setError(null);
  }, [assignedUserIds, assignees, open]);

  const handleToggle = (userId: number) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSave = async () => {
    if (!project) return;
    try {
      await assignMutation.mutateAsync({ projectId: project.id, userIds: selectedUserIds });
      if (onSave) onSave(selectedUserIds); // for local state fallback
      onClose();
    } catch (e: any) {
      setError(e?.message || "Failed to assign users");
    }
  };

  console.log('selectedUserIds: ', selectedUserIds);

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-8 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-bold">
              Assign Users to Project
            </Dialog.Title>
            <button onClick={onClose} className="p-2 rounded hover:bg-gray-100">
              <X size={20} />
            </button>
          </div>
          <div className="mb-4 text-gray-700">
            <span className="font-semibold">Project:</span> {project?.name}
          </div>
          {error && <div className="text-red-500 mb-2 text-center">{error}</div>}
          {isLoadingAssignees ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-2 text-gray-500">Loading assignees...</span>
            </div>
          ) : (
            <div className="max-h-64 overflow-y-auto mb-6">
              {allUsers.length === 0 ? (
                <div className="text-gray-500 text-center py-8">No users found.</div>
              ) : (
                <ul className="space-y-2">
                  {allUsers.map((user) => {
                    const checked = selectedUserIds.includes(user.id);
                    return (
                      <li
                        key={user.id}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg border transition cursor-pointer ${checked ? "bg-blue-50 border-blue-400" : "bg-white border-gray-200 hover:bg-gray-50"}`}
                        onClick={() => handleToggle(user.id)}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => handleToggle(user.id)}
                          className="accent-primary w-4 h-4"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <span className="flex-1">
                          {user.firstName || user.lastName
                            ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
                            : user.email}
                          <span className="ml-2 text-xs text-gray-400">{user.email}</span>
                        </span>
                        {checked ? (
                          <UserCheck className="text-primary" size={18} />
                        ) : (
                          <UserPlus className="text-gray-400" size={18} />
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
              disabled={assignMutation.isPending}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/90 shadow disabled:opacity-50"
              disabled={allUsers.length === 0 || assignMutation.isPending}
            >
              {assignMutation.isPending ? "Saving..." : "Save"}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
} 