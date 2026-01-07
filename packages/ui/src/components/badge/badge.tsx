import React from "react";
import { cn } from "../../lib/cn";
import styles from "./badge.module.css";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** The visual style variant of the badge */
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "success"
    | "warning"
    | "error";
}

/**
 * A small status indicator component.
 * Use to highlight status, categories, or counts.
 *
 * @example
 * ```tsx
 * <Badge variant="success">Active</Badge>
 * ```
 *
 * @example
 * ```tsx
 * <Badge variant="error">Failed</Badge>
 * ```
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant = "default", className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(styles.badge, styles[variant], className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
