export interface HTMLValidationError {
  message: string;
  type: "error" | "warning";
}

export function validateHTML(html: string): HTMLValidationError[] {
  const errors: HTMLValidationError[] = [];

  // 1. Check for <script> tags
  if (/<script/i.test(html) || /javascript:/i.test(html) || /on\w+=/.test(html)) {
    errors.push({
      message: "Scripts and event handlers are not allowed for security reasons.",
      type: "error",
    });
  }

  // 2. Check for unclosed tags
  const stack: string[] = [];
  const tagRegex = /<(\/?[a-z1-6]+)(?:\s+[^>]*?)?>/gi;
  let match;

  const selfClosingTags = new Set([
    "br",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "area",
    "base",
    "col",
    "embed",
    "param",
    "source",
    "track",
    "wbr",
  ]);

  while ((match = tagRegex.exec(html)) !== null) {
    const fullTag = match[0];
    const tagName = match[1].toLowerCase();

    if (tagName.startsWith("/")) {
      // Closing tag
      const closingName = tagName.substring(1);
      if (stack.length === 0) {
        errors.push({
          message: `Closing tag </${closingName}> has no matching opening tag.`,
          type: "warning",
        });
      } else {
        const lastOpened = stack.pop();
        if (lastOpened !== closingName) {
          errors.push({
            message: `Tag <${lastOpened}> was closed with </${closingName}>.`,
            type: "warning",
          });
        }
      }
    } else {
      // Opening tag
      if (!selfClosingTags.has(tagName) && !fullTag.endsWith("/>")) {
        stack.push(tagName);
      }
    }
  }

  while (stack.length > 0) {
    const unclosed = stack.pop();
    errors.push({
      message: `Tag <${unclosed}> is not closed.`,
      type: "warning",
    });
  }

  return errors;
}





