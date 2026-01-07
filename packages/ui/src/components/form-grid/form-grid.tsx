import React from "react";
import { cn } from "../../lib/cn";
import styles from "./form-grid.module.css";

export interface FormGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns in the grid (default: 1) */
  cols?: number;
  /** Form fields to arrange in the grid */
  children: React.ReactNode;
}

/**
 * A responsive grid layout for form fields.
 *
 * @example
 * ```tsx
 * <FormGrid cols={2}>
 *   <FormField label="First Name">
 *     <Input />
 *   </FormField>
 *   <FormField label="Last Name">
 *     <Input />
 *   </FormField>
 * </FormGrid>
 * ```
 */
export const FormGrid = React.forwardRef<HTMLDivElement, FormGridProps>(
  ({ cols = 1, className, children, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(styles.formGrid, className)}
        style={{ "--form-grid-cols": cols, ...style } as React.CSSProperties}
        {...props}
      >
        {children}
      </div>
    );
  }
);

FormGrid.displayName = "FormGrid";
