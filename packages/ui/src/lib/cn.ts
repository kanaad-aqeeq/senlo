/**
 * Utility function for conditionally joining class names.
 * Filters out falsy values (undefined, null, false, empty strings).
 *
 * @param classes - Class names to join
 * @returns Space-separated string of class names
 *
 * @example
 * ```tsx
 * cn("btn", isPrimary && "btn--primary", className)
 * // Returns "btn btn--primary custom-class" (if conditions are true)
 * ```
 */
export function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}
