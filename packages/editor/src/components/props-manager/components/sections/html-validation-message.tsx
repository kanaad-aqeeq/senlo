import { HTMLValidationError } from "@senlo/core";
import { AlertCircle, AlertTriangle } from "lucide-react";

interface HTMLValidationMessageProps {
  errors: HTMLValidationError[];
}

export const HTMLValidationMessage = ({ errors }: HTMLValidationMessageProps) => {
  if (errors.length === 0) return null;

  return (
    <div className="mt-2 space-y-1">
      {errors.map((error, idx) => (
        <div
          key={idx}
          className={`flex items-center gap-1.5 text-xs font-medium ${
            error.type === "error" ? "text-red-500" : "text-amber-500"
          }`}
        >
          {error.type === "error" ? (
            <AlertCircle size={12} className="shrink-0" />
          ) : (
            <AlertTriangle size={12} className="shrink-0" />
          )}
          <span>{error.message}</span>
        </div>
      ))}
    </div>
  );
};





