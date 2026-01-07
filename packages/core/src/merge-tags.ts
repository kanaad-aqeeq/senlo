export interface MergeTag {
  label: string;
  value: string;
  category: "contact" | "project" | "campaign" | "custom";
}

export const STANDARD_MERGE_TAGS: MergeTag[] = [
  { label: "First Name", value: "{{contact.first_name}}", category: "contact" },
  { label: "Last Name", value: "{{contact.last_name}}", category: "contact" },
  { label: "Email", value: "{{contact.email}}", category: "contact" },
  { label: "Project Name", value: "{{project.name}}", category: "project" },
  { label: "Campaign Name", value: "{{campaign.name}}", category: "campaign" },
  { label: "Unsubscribe URL", value: "{{unsubscribe_url}}", category: "campaign" },
];

export function replaceMergeTags(
  text: string,
  data: {
    contact?: Record<string, any>;
    project?: { name: string };
    campaign?: { name: string; id?: number };
    unsubscribeUrl?: string;
    custom?: Record<string, any>;
  }
): string {
  if (!text) return text;

  return text.replace(/\{\{(.*?)\}\}/g, (match, tag) => {
    const rawTag = tag.trim();

    if (rawTag === "unsubscribe_url") {
      return data.unsubscribeUrl || "[[Unsubscribe Link]]";
    }

    // Check custom tags first (flat structure)
    if (data.custom && rawTag in data.custom) {
      return String(data.custom[rawTag]);
    }

    const parts = rawTag.split(".");
    const context = parts[0];
    const key = parts.slice(1).join(".");

    if (context === "contact" && data.contact) {
      return data.contact[key] || match;
    }
    if (context === "project" && data.project) {
      return (data.project as any)[key] || match;
    }
    if (context === "campaign" && data.campaign) {
      return (data.campaign as any)[key] || match;
    }

    return match;
  });
}
