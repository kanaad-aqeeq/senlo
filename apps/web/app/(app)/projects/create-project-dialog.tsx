"use client";

import { useState } from "react";
import { Button, Dialog, FormField, Input, Textarea } from "@senlo/ui";
import { Plus } from "lucide-react";
import { useProjectsContext } from "./projects-context";

export function CreateProjectDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { createProject, isCreating } = useProjectsContext();

  async function handleSubmit(formData: FormData) {
    createProject(formData, {
      onSuccess: () => {
        setIsOpen(false);
        // Reset form by closing/reopening dialog
      },
      onError: (error) => {
        if (
          error &&
          typeof error === "object" &&
          "error" in error &&
          error.error
        ) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          const fieldErrors = error.error.fieldErrors;
          let errorMessage = "Validation failed";

          if (fieldErrors) {
            if ("name" in fieldErrors && fieldErrors.name?.[0]) {
              errorMessage = fieldErrors.name[0];
            } else if (
              "description" in fieldErrors &&
              fieldErrors.description?.[0]
            ) {
              errorMessage = fieldErrors.description[0];
            } else if ("general" in fieldErrors && fieldErrors.general?.[0]) {
              errorMessage = fieldErrors.general[0];
            }
          }

          alert(`Error: ${errorMessage}`);
        } else {
          // Handle other types of errors
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Failed to create project. Please try again.";
          alert(errorMessage);
        }
      },
    });
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Plus size={16} />
        New Project
      </Button>

      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create New Project"
        description="Projects help you organize your email templates and campaigns."
      >
        <form action={handleSubmit} className="space-y-4">
          <FormField
            label="Project Name"
            required
            hint="Give your project a descriptive name"
          >
            <Input
              name="name"
              placeholder="e.g. Marketing Q1 2024"
              required
              autoFocus
            />
          </FormField>

          <FormField
            label="Description (optional)"
            hint="Describe the purpose of this project"
          >
            <Textarea
              name="description"
              placeholder="e.g. All email campaigns related to the Q1 product launch..."
              rows={3}
            />
          </FormField>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="secondary"
              type="button"
              onClick={() => setIsOpen(false)}
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isCreating}>
              {isCreating ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}
