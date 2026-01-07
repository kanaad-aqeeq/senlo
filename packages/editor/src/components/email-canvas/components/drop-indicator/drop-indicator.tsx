"use client";

import styles from "./drop-indicator.module.css";
import { cn } from "@senlo/ui";

interface DropIndicatorProps {
  isVisible: boolean;
  className?: string;
}

export const DropIndicator = ({ isVisible, className }: DropIndicatorProps) => {
  if (!isVisible) return null;

  return <div className={cn(styles.indicator, className)} />;
};