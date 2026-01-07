import { useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * Universal hook for data refresh patterns
 * Provides consistent refresh logic across the application
 */
export function useDataRefresh() {
  const router = useRouter();

  /**
   * Refresh data using multiple strategies for maximum reliability
   * 1. Execute provided refetch function (for hooks/state updates)
   * 2. Router refresh (for server components revalidation)
   */
  const refreshData = useCallback(
    (refetchFn?: () => void | Promise<void>) => {
      // Execute custom refetch function if provided
      if (refetchFn) {
        const result = refetchFn();
        if (result && typeof result.then === "function") {
          // Handle async refetch
          result.then(() => {
            router.refresh();
          }).catch(() => {
            // If refetch fails, still try router refresh
            router.refresh();
          });
        } else {
          // Handle sync refetch
          router.refresh();
        }
      } else {
        // Only router refresh if no custom function provided
        router.refresh();
      }
    },
    [router]
  );

  /**
   * Optimistic update wrapper
   * Updates UI immediately, then refreshes data
   */
  const withOptimisticUpdate = useCallback(
    <T>(
      optimisticUpdateFn: () => void,
      asyncAction: () => Promise<T>,
      refetchFn?: () => void | Promise<void>
    ): Promise<T> => {
      // Apply optimistic update immediately
      optimisticUpdateFn();

      // Execute the async action
      return asyncAction()
        .then((result) => {
          // Success: refresh data to sync with server
          refreshData(refetchFn);
          return result;
        })
        .catch((error) => {
          // Error: refresh data to revert optimistic update
          refreshData(refetchFn);
          throw error;
        });
    },
    [refreshData]
  );

  return {
    refreshData,
    withOptimisticUpdate,
  };
}

/**
 * Hook for mutation operations with automatic refresh
 * Standardizes the pattern: mutate -> refresh data
 */
export function useMutation<T extends any[], R>(
  mutationFn: (...args: T) => Promise<R>,
  refetchFn?: () => void | Promise<void>
) {
  const { refreshData } = useDataRefresh();

  const mutate = useCallback(
    async (...args: T): Promise<R> => {
      try {
        const result = await mutationFn(...args);
        refreshData(refetchFn);
        return result;
      } catch (error) {
        // Still refresh on error to ensure data consistency
        refreshData(refetchFn);
        throw error;
      }
    },
    [mutationFn, refetchFn, refreshData]
  );

  return { mutate };
}