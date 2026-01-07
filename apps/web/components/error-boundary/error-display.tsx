"use client";

import { AlertCircle, X } from "lucide-react";
import { Button } from "@senlo/ui";
import { AppError } from "apps/web/lib/errors";

interface ErrorDisplayProps {
  error: AppError | string | null;
  onDismiss?: () => void;
  className?: string;
}

/**
 * Component for displaying application errors in a user-friendly way
 */
export function ErrorDisplay({ error, onDismiss, className = "" }: ErrorDisplayProps) {
  if (!error) return null;

  const isAppError = (err: AppError | string): err is AppError => {
    return typeof err === 'object' && err !== null && 'code' in err && 'message' in err;
  };

  const getErrorTitle = (error: AppError | string): string => {
    if (isAppError(error)) {
      switch (error.code) {
        case 'VALIDATION_ERROR':
          return 'Validation Error';
        case 'NOT_FOUND':
          return 'Not Found';
        case 'UNAUTHORIZED':
          return 'Access Denied';
        case 'FORBIDDEN':
          return 'Forbidden';
        case 'DUPLICATE_ENTRY':
          return 'Duplicate Entry';
        case 'EXTERNAL_SERVICE_ERROR':
          return 'Service Unavailable';
        case 'DATABASE_ERROR':
          return 'Database Error';
        default:
          return 'Error';
      }
    }
    return 'Error';
  };

  const getErrorVariant = (error: AppError | string): 'destructive' | 'warning' | 'default' => {
    if (isAppError(error)) {
      switch (error.code) {
        case 'VALIDATION_ERROR':
        case 'NOT_FOUND':
        case 'DUPLICATE_ENTRY':
          return 'warning';
        case 'UNAUTHORIZED':
        case 'FORBIDDEN':
          return 'destructive';
        case 'EXTERNAL_SERVICE_ERROR':
        case 'DATABASE_ERROR':
          return 'destructive';
        default:
          return 'destructive';
      }
    }
    return 'destructive';
  };

  const getErrorMessage = (error: AppError | string): string => {
    return isAppError(error) ? error.message : error;
  };

  const getErrorDetails = (error: AppError | string) => {
    return isAppError(error) ? error.details : null;
  };

  return (
    <div className={`rounded-lg border p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <AlertCircle size={20} className="text-red-500" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900">
            {getErrorTitle(error)}
          </h3>

          <p className="mt-1 text-sm text-gray-700">
            {getErrorMessage(error)}
          </p>

          {getErrorDetails(error) && Object.keys(getErrorDetails(error)!).length > 0 && (
            <details className="mt-2">
              <summary className="cursor-pointer text-xs text-gray-500 hover:text-gray-700">
                Show details
              </summary>
              <pre className="mt-2 text-xs bg-gray-50 p-2 rounded overflow-auto max-h-32">
                {JSON.stringify(getErrorDetails(error), null, 2)}
              </pre>
            </details>
          )}
        </div>

        {onDismiss && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="flex-shrink-0 p-1"
          >
            <X size={16} />
          </Button>
        )}
      </div>
    </div>
  );
}

/**
 * Inline error display for forms
 */
export function InlineError({ error, className = "" }: { error?: string | null; className?: string }) {
  if (!error) return null;

  return (
    <p className={`text-sm text-red-600 flex items-center gap-1 ${className}`}>
      <AlertCircle size={14} />
      {error}
    </p>
  );
}

/**
 * Toast-style error notification (placeholder for future toast system)
 */
export function ErrorToast({ error, onClose }: { error: AppError; onClose: () => void }) {
  return (
    <div className="fixed bottom-4 right-4 max-w-sm bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg z-50">
      <div className="flex items-start gap-3">
        <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />

        <div className="flex-1">
          <h4 className="text-sm font-medium text-red-900">
            {error.code.replace(/_/g, ' ')}
          </h4>
          <p className="text-sm text-red-700 mt-1">
            {error.message}
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="flex-shrink-0 p-1 text-red-500 hover:text-red-700"
        >
          <X size={16} />
        </Button>
      </div>
    </div>
  );
}


