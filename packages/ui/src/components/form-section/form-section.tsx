import React from "react";
import { cn } from "../../lib/cn";
import styles from "./form-section.module.css";

export interface FormSectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Section title */
  title?: string;
  /** Form fields within this section */
  children: React.ReactNode;
  /** Optional action element in the header */
  headerAction?: React.ReactNode;
}

/**
 * A section container for grouping related form fields.
 * Includes optional title and visual separation from other sections.
 *
 * @example
 * ```tsx
 * <FormSection title="Personal Information">
 *   <FormField label="Name">
 *     <Input />
 *   </FormField>
 *   <FormField label="Email">
 *     <Input type="email" />
 *   </FormField>
 * </FormSection>
 * ```
 */
export const FormSection = React.forwardRef<HTMLElement, FormSectionProps>(
  ({ title, className, children, headerAction, ...props }, ref) => {
    return (
      <section ref={ref} className={cn(styles.section, className)} {...props}>
        {title && (
          <div className={styles.header}>
            <h3 className={styles.title}>{title}</h3>
            {headerAction && <div>{headerAction}</div>}
          </div>
        )}
        <div className={styles.content}>{children}</div>
      </section>
    );
  }
);

FormSection.displayName = "FormSection";
