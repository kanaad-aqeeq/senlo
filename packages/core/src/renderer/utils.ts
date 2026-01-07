export function renderPadding(padding?: any): string {
  if (!padding) return "0px 0px 0px 0px";
  return `${padding.top || 0}px ${padding.right || 0}px ${padding.bottom || 0}px ${padding.left || 0}px`;
}









