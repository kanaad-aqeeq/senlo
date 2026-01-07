/**
 * Common alignment options used across multiple block types
 */
export const ALIGN_OPTIONS = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
] as const;

export const DEFAULT_PADDING = {
  top: 10,
  right: 0,
  bottom: 10,
  left: 24,
};

export const DEFAULT_COLOR = "#000000";
