import { z } from "zod";

export const CreateContactSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  projectId: z.coerce.number().int().positive(),
  listId: z.coerce.number().int().positive().optional(),
  meta: z.record(z.string(), z.unknown()).nullable().optional(),
});

export const CreateListSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  projectId: z.coerce.number().int().positive(),
});
