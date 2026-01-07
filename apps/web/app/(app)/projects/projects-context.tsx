"use client";

import { createContext, useContext, ReactNode } from "react";
import { useProjects, useCreateProject, useDeleteProject } from "apps/web/queries";

interface ProjectsContextType {
  // Query data  
  projects: NonNullable<ReturnType<typeof useProjects>["data"]>;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  
  // Mutations
  createProject: ReturnType<typeof useCreateProject>["mutate"];
  deleteProject: ReturnType<typeof useDeleteProject>["mutate"];
  isCreating: boolean;
  isDeleting: boolean;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const { 
    data: projectsData, 
    isLoading, 
    error,
    refetch 
  } = useProjects();
  
  // Ensure projects is always an array
  const projects = projectsData || [];


  const { 
    mutate: createProject,
    isPending: isCreating
  } = useCreateProject();

  const {
    mutate: deleteProject,
    isPending: isDeleting
  } = useDeleteProject();

  return (
    <ProjectsContext.Provider value={{ 
      projects, 
      isLoading, 
      error: error?.message || null, 
      refetch,
      createProject,
      deleteProject,
      isCreating,
      isDeleting
    }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjectsContext() {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error("useProjectsContext must be used within a ProjectsProvider");
  }
  return context;
}




