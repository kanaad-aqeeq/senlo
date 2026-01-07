import React from "react";
import { cn } from "../../lib/cn";
import styles from "./select.module.css";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

/**
 * A styled native select dropdown component.
 *
 * @example
 * ```tsx
 * <Select value={status} onChange={(e) => setStatus(e.target.value)}>
 *   <option value="draft">Draft</option>
 *   <option value="published">Published</option>
 * </Select>
 * ```
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select ref={ref} className={cn(styles.select, className)} {...props}>
        {children}
      </select>
    );
  }
);

Select.displayName = "Select";
