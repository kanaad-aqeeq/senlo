"use client";

import styles from "./sidebar-section.module.css";
import { cn } from "@senlo/ui";

type SidebarSectionVariant = "rows" | "content";

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
  variant: SidebarSectionVariant;
}

export const SidebarSection = ({
  title,
  children,
  variant,
}: SidebarSectionProps) => {
  return (
    <div className={styles.section}>
      <div className={styles.sectionTitle}>{title}</div>
      <div
        className={cn(styles.grid, variant === "content" && styles.gridContent)}
      >
        {children}
      </div>
    </div>
  );
};
