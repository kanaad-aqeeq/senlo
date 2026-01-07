import React from "react";
import { cn } from "../../lib/cn";

import "./input.css";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * A styled text input component.
 *
 * @example
 * ```tsx
 * <Input placeholder="Enter your email" type="email" />
 * ```
 *
 * @example
 * ```tsx
 * <Input value={name} onChange={(e) => setName(e.target.value)} />
 * ```
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn("sl-input", className)}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
