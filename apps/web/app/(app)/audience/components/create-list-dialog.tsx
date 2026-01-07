"use client";

import { Dialog, Button, FormField, Input, Textarea } from "@senlo/ui";

interface CreateListDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  projectId: number;
}

export function CreateListDialog({
  isOpen,
  onClose,
  onSubmit,
  projectId,
}: CreateListDialogProps) {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Create New List"
      description="Create a segment to group your contacts."
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <input type="hidden" name="projectId" value={projectId} />
        <FormField label="List Name" required>
          <Input
            name="name"
            placeholder="e.g. Early Adopters"
            required
            autoFocus
          />
        </FormField>
        <FormField label="Description (optional)">
          <Textarea
            name="description"
            placeholder="A short description of this list..."
            rows={3}
          />
        </FormField>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Create List</Button>
        </div>
      </form>
    </Dialog>
  );
}
