import React from "react";
import { cn } from "../../lib/cn";
import styles from "./label.module.css";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

/**
 * A styled label component for form inputs.
 *
 * @example
 * ```tsx
 * <Label htmlFor="email">Email Address</Label>
 * <Input id="email" type="email" />
 * ```
 */
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return <label ref={ref} className={cn(styles.label, className)} {...props} />;
  }
);

Label.displayName = "Label";
