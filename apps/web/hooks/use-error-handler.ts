"use client";

import { useCallback, useState } from "react";
import { AppError } from "../lib/errors";

/**
 * Hook for managing error state in components
 */
export function useErrorHandler() {
  const [error, setError] = useState<AppError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleError = useCallback((error: unknown) => {
    if (error instanceof AppError) {
      setError(error);
    } else {
      // Convert unknown errors to AppError
      const appError = new AppError(
        "UNKNOWN_ERROR",
        error instanceof Error ? error.message : "An unexpected error occurred",
        { originalError: error instanceof Error ? error.stack : String(error) }
      );
      setError(appError);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const executeAsync = useCallback(
    async <T>(
      operation: () => Promise<T>,
      options: {
        showError?: boolean;
        onSuccess?: (result: T) => void;
        onError?: (error: AppError) => void;
      } = {}
    ): Promise<T | null> => {
      const { showError = true, onSuccess, onError } = options;

      setIsLoading(true);
      clearError();

      try {
        const result = await operation();
        onSuccess?.(result);
        return result;
      } catch (error) {
        const appError =
          error instanceof AppError
            ? error
            : new AppError(
                "UNKNOWN_ERROR",
                error instanceof Error ? error.message : "Operation failed",
                {
                  originalError:
                    error instanceof Error ? error.stack : String(error),
                }
              );

        if (showError) {
          setError(appError);
        }

        onError?.(appError);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [clearError]
  );

  return {
    error,
    isLoading,
    handleError,
    clearError,
    executeAsync,
  };
}

/**
 * Hook for managing toast notifications (placeholder for future implementation)
 */
export function useToast() {
  const showToast = useCallback(
    (message: string, type: "success" | "error" | "warning") => {
      // Placeholder for toast implementation
      console.log(`[${type.toUpperCase()}] ${message}`);
    },
    []
  );

  return { showToast };
}

/**
 * Hook for handling form submissions with error handling
 */
export function useFormHandler() {
  const { error, isLoading, executeAsync, clearError } = useErrorHandler();
  const { showToast } = useToast();

  const submitForm = useCallback(
    async <T>(
      formData: FormData,
      submitAction: (data: FormData) => Promise<T>,
      options: {
        successMessage?: string;
        onSuccess?: (result: T) => void;
      } = {}
    ): Promise<T | null> => {
      return executeAsync(() => submitAction(formData), {
        onSuccess: (result) => {
          if (options.successMessage) {
            showToast(options.successMessage, "success");
          }
          options.onSuccess?.(result);
        },
        onError: (error) => {
          showToast(error.message, "error");
        },
      });
    },
    [executeAsync, showToast]
  );

  return {
    error,
    isLoading,
    submitForm,
    clearError,
  };
}




