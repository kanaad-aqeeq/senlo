"use client";

import { useState } from "react";
import { Card, Badge, Dialog, Button } from "@senlo/ui";
import { Project } from "@senlo/core";
import Link from "next/link";
import { Folder, Calendar, Trash2 } from "lucide-react";
import { deleteProject } from "./actions";
import { logger } from "apps/web/lib/logger";
import { useProjectsContext } from "./projects-context";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { refetch } = useProjectsContext();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteProject(project.id);
      setIsDeleteOpen(false);
      refetch();
    } catch (error) {
      logger.error("Failed to delete project from card", {
        projectId: project.id,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Link href={`/projects/${project.id}`} className="group relative">
        <Card className="h-full p-5 transition-shadow hover:shadow-md border-zinc-200 group-hover:border-zinc-300">
          <div className="flex flex-col h-full gap-4">
            <div className="flex items-start justify-between">
              <div className="p-2 bg-zinc-100 rounded-lg group-hover:bg-zinc-200 transition-colors">
                <Folder size={20} className="text-zinc-600" />
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 font-normal text-zinc-500 border-zinc-200"
                >
                  <Calendar size={12} />
                  {project.createdAt instanceof Date
                    ? project.createdAt.toLocaleDateString("en-GB")
                    : String(project.createdAt)}
                </Badge>
                <button
                  onClick={handleDelete}
                  className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  title="Delete project"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
                {project.name}
              </h3>
              {project.description && (
                <p className="text-sm text-zinc-500 line-clamp-2">
                  {project.description}
                </p>
              )}
            </div>
          </div>
        </Card>
      </Link>

      <Dialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Delete Project"
        description={`Are you sure you want to delete "${project.name}"? All templates inside this project will also be deleted. This action cannot be undone.`}
        footer={
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => setIsDeleteOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Project"}
            </Button>
          </div>
        }
      >
        <p className="text-sm text-zinc-500">
          This will permanently remove the project and all its associated data.
        </p>
      </Dialog>
    </>
  );
}
