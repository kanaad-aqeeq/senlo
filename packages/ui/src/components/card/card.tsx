import React from "react";
import { cn } from "../../lib/cn";

import "./card.css";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * A container component with a subtle border and background.
 * Use for grouping related content.
 *
 * @example
 * ```tsx
 * <Card>
 *   <h2>Card Title</h2>
 *   <p>Card content goes here</p>
 * </Card>
 * ```
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("sl-card", className)} {...props} />;
  }
);

Card.displayName = "Card";
