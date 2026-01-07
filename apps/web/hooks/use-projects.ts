import { useState, useEffect, useCallback } from "react";
import { Project } from "@senlo/core";
import { listProjects } from "../app/(app)/projects/actions";

/**
 * Hook for loading and managing projects data
 *
 * @returns Object with projects data, loading state, error state, and refetch function
 */
export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await listProjects();

      if (result.success) {
        setProjects(result.data);
      } else {
        setError(result.error.message);
        setProjects([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load projects");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const refetch = useCallback(() => {
    loadProjects();
  }, [loadProjects]);

  // Optimistic updates
  const addProjectOptimistic = useCallback((newProject: Project) => {
    setProjects(prev => [...prev, newProject]);
  }, []);

  const updateProjectOptimistic = useCallback((projectId: number, updates: Partial<Project>) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === projectId ? { ...project, ...updates } : project
      )
    );
  }, []);

  const removeProjectOptimistic = useCallback((projectId: number) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
  }, []);

  return {
    projects,
    loading,
    error,
    refetch,
    // Optimistic update methods
    addProjectOptimistic,
    updateProjectOptimistic,
    removeProjectOptimistic,
  };
}




