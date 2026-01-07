"use client";

import { Dialog, Button, FormField, Input } from "@senlo/ui";
import { RecipientList } from "@senlo/core";

interface CreateContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  projectId: string;
  lists: RecipientList[];
  selectedListId?: number | null;
}

export function CreateContactDialog({
  isOpen,
  onClose,
  onSubmit,
  projectId,
  lists,
  selectedListId,
}: CreateContactDialogProps) {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Contact"
      description="Add a single contact to your project audience."
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <input type="hidden" name="projectId" value={projectId} />
        <FormField label="Email Address" required>
          <Input
            name="email"
            type="email"
            placeholder="example@domain.com"
            required
            autoFocus
          />
        </FormField>
        <FormField label="Full Name (optional)">
          <Input name="name" placeholder="John Doe" />
        </FormField>
        <FormField
          label="Add to List"
          hint="Optional: select a list to add this contact to"
        >
          <select
            name="listId"
            className="w-full h-9 px-3 rounded-md border border-zinc-200 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            defaultValue={selectedListId?.toString() || ""}
          >
            <option value="">No list (Just project contacts)</option>
            {lists.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </FormField>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Add Contact</Button>
        </div>
      </form>
    </Dialog>
  );
}

