import React from "react";
import { cn } from "../../lib/cn";

import "./button.css";

/** Available button style variants */
export type ButtonVariant =
  | "default"
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "link";

/** Available button sizes */
export type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The visual style variant of the button */
  variant?: ButtonVariant;
  /** The size of the button */
  size?: ButtonSize;
}

/**
 * A versatile button component with multiple variants and sizes.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="lg">
 *   Click me
 * </Button>
 * ```
 *
 * @example
 * ```tsx
 * <Button variant="destructive" onClick={handleDelete}>
 *   Delete
 * </Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        type={type}
        ref={ref}
        className={cn(
          "sl-btn",
          `sl-btn--${variant}`,
          `sl-btn--${size}`,
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
