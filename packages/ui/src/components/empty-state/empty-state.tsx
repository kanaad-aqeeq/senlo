import React from "react";
import { cn } from "../../lib/cn";
import styles from "./empty-state.module.css";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Icon to display above the title */
  icon?: React.ReactNode;
  /** The empty state title */
  title: string;
  /** Optional description text */
  description?: string;
  /** Optional action button */
  action?: React.ReactNode;
}

/**
 * A placeholder component for empty lists or states.
 * Use when there's no data to display.
 *
 * @example
 * ```tsx
 * <EmptyState
 *   icon={<InboxIcon />}
 *   title="No emails yet"
 *   description="Create your first email template to get started."
 *   action={<Button>Create Template</Button>}
 * />
 * ```
 */
export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon, title, description, action, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(styles.container, className)} {...props}>
        {icon && <div className={styles.icon} aria-hidden="true">{icon}</div>}
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
        {action && <div className={styles.actions}>{action}</div>}
      </div>
    );
  }
);

EmptyState.displayName = "EmptyState";
