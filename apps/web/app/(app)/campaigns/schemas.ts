import { z } from "zod";

export const CreateCampaignSchema = z.object({
  name: z.string().min(1).max(255).trim(),
  description: z.string().max(1000).trim().optional(),
  projectId: z.preprocess((val) => (val === "" ? undefined : val), z.coerce.number().int().positive()),
  templateId: z.preprocess((val) => (val === "" ? undefined : val), z.coerce.number().int().positive()),
  listId: z.preprocess((val) => (val === "" ? undefined : val), z.coerce.number().int().positive().optional()),
  type: z.enum(["STANDARD", "TRIGGERED"]).default("STANDARD"),
  fromName: z.string().max(255).trim().optional(),
  fromEmail: z.string().email().optional(),
  subject: z.string().max(255).trim().optional(),
  variablesSchema: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return null;
      try {
        return JSON.parse(val);
      } catch {
        return null;
      }
    }),
});

export const UpdateCampaignSchema = z.object({
  name: z.string().min(1).max(255).trim(),
  description: z.string().max(1000).trim().optional(),
  fromName: z.string().max(255).trim().optional(),
  fromEmail: z.string().email().optional(),
  subject: z.string().max(255).trim().optional(),
  variablesSchema: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return null;
      try {
        return JSON.parse(val);
      } catch {
        return null;
      }
    }),
});
