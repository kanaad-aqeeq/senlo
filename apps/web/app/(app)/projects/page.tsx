"use client";

import { PageHeader, EmptyState } from "@senlo/ui";
import { CreateProjectDialog } from "./create-project-dialog";
import { ProjectCard } from "./project-card";
import { Folder, Loader2 } from "lucide-react";
import { ProjectsProvider, useProjectsContext } from "./projects-context";

function ProjectsPageContent() {
  const { projects, isLoading, error } = useProjectsContext();

  if (isLoading) {
    return (
      <main className="max-w-6xl mx-auto py-10 px-8">
        <div className="text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
            <Loader2 size={40} className="text-blue-500 animate-spin" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Loading projects...
            </h1>
            <p className="text-gray-600">
              Please wait while we load your projects.
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-6xl mx-auto py-10 px-8">
        <div className="text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              !
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Failed to load projects
            </h1>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto py-10 px-8">
      <PageHeader
        title="Projects"
        description="Manage your projects, templates, and email campaigns."
        actions={<CreateProjectDialog />}
      />

      {!Array.isArray(projects) || projects.length === 0 ? (
        <EmptyState
          icon={<Folder size={40} />}
          title="No projects yet"
          action={<CreateProjectDialog />}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </main>
  );
}

export default function ProjectsPage() {
  return (
    <ProjectsProvider>
      <ProjectsPageContent />
    </ProjectsProvider>
  );
}
