import * as z from "zod";

export const taskFormSchema = z.object({
  name: z.string().min(1, "Task name is required").max(100, "Task name is too long"),
  description: z.string().max(500, "Description is too long").optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
  projectId: z.string().min(1, "Project is required"),
  dueDate: z.string().optional(),
}); 