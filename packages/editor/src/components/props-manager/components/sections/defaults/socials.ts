export const DEFAULT_SOCIALS_ALIGN = "center";
export const DEFAULT_SOCIALS_SIZE = 32;
export const DEFAULT_SOCIALS_SPACING = 10;

export const DEFAULT_SOCIALS_PADDING = {
  top: 10,
  right: 0,
  bottom: 10,
  left: 0,
};

export const DEFAULT_SOCIALS_LINKS = [
  { type: "facebook" as const, url: "", icon: "/facebook.png" },
  { type: "twitter" as const, url: "", icon: "/twitter.png" },
  { type: "instagram" as const, url: "", icon: "/instagram.png" },
];

export const SOCIAL_LABELS: Record<string, string> = {
  facebook: "Facebook",
  twitter: "Twitter",
  instagram: "Instagram",
  youtube: "YouTube",
  discord: "Discord",
  github: "GitHub",
  reddit: "Reddit",
} as const;

export const SOCIAL_ICONS: Record<string, string> = {
  facebook: "/facebook.png",
  twitter: "/twitter.png",
  instagram: "/instagram.png",
  youtube: "/youtube.png",
  discord: "/discord.png",
  github: "/github.png",
  reddit: "/reddit.png",
} as const;