"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@senlo/ui";
import { EmailProvider } from "@senlo/core";
import Link from "next/link";
import { CreateTemplateDialog } from "./create-template-dialog";
import { EditProjectDialog } from "./edit-project-dialog";
import { useProject } from "apps/web/queries/projects";
import { useProjectTemplates } from "apps/web/queries/templates";
import { TemplatesList } from "./templates-list";

interface ProjectPageClientProps {
  projectId: string;
}

export default function ProjectPage({ projectId }: ProjectPageClientProps) {
  const [providers, setProviders] = useState<EmailProvider[]>([]);
  const [providersLoading, setProvidersLoading] = useState(true);

  const {
    data: project,
    isLoading: projectLoading,
    error: projectError,
  } = useProject(projectId);

  const {
    data: templates = [],
    isLoading: templatesLoading,
    totalCount,
  } = useProjectTemplates({
    projectId: project?.id || 0,
  });

  useEffect(() => {
    async function loadProviders() {
      try {
        const { listProviders } = await import("./actions");
        const result = await listProviders();
        if (result.success) {
          setProviders(result.data);
        }
      } catch (error) {
        console.error("Failed to load providers:", error);
      } finally {
        setProvidersLoading(false);
      }
    }
    loadProviders();
  }, []);

  if (projectLoading || providersLoading || templatesLoading) {
    return (
      <main className="max-w-6xl mx-auto py-10 px-8">
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      </main>
    );
  }

  if (projectError || !project) {
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
              Project not found
            </h1>
            <p className="text-gray-600">
              {projectError?.message ||
                "The project you are looking for does not exist."}
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto py-10 px-8">
      <div className="mb-6">
        <Link
          href="/projects"
          className="text-sm text-zinc-500 hover:text-zinc-800 flex items-center gap-1 transition-colors"
        >
          ← Back to Projects
        </Link>
      </div>

      <PageHeader
        title={project.name}
        description={
          project.description ||
          "Manage your email templates and campaigns for this project."
        }
        actions={
          <div className="flex items-center gap-3">
            <EditProjectDialog project={project} providers={providers} />
            <CreateTemplateDialog projectId={projectId} />
          </div>
        }
      />

      <TemplatesList templates={templates} projectId={project.id} />
    </main>
  );
}
