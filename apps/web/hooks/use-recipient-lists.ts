import { useState, useEffect, useCallback } from "react";
import { RecipientList } from "@senlo/core";
import { listProjectLists } from "../app/(app)/audience/actions";

export interface UseRecipientListsOptions {
  projectId?: number;
  enabled?: boolean;
}

/**
 * Hook for loading and managing recipient lists
 */
export function useRecipientLists(options: UseRecipientListsOptions = {}) {
  const { projectId, enabled = true } = options;

  const [lists, setLists] = useState<RecipientList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadLists = useCallback(async () => {
    if (!enabled || !projectId) {
      setLists([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result = await listProjectLists(projectId);

      if (result.success) {
        setLists(result.data);
      } else {
        setError(result.error.message);
        setLists([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load lists");
      setLists([]);
    } finally {
      setLoading(false);
    }
  }, [enabled, projectId]);

  useEffect(() => {
    loadLists();
  }, [loadLists]);

  const refetch = useCallback(() => {
    loadLists();
  }, [loadLists]);

  // Optimistic updates
  const addListOptimistic = useCallback((newList: RecipientList) => {
    setLists(prev => [...prev, newList]);
  }, []);

  const updateListOptimistic = useCallback((listId: number, updates: Partial<RecipientList>) => {
    setLists(prev => 
      prev.map(list => 
        list.id === listId ? { ...list, ...updates } : list
      )
    );
  }, []);

  const removeListOptimistic = useCallback((listId: number) => {
    setLists(prev => prev.filter(list => list.id !== listId));
  }, []);

  return {
    lists,
    loading,
    error,
    refetch,
    // Optimistic update methods
    addListOptimistic,
    updateListOptimistic,
    removeListOptimistic,
  };
}