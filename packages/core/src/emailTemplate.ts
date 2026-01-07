import type { EmailDesignDocument } from "./emailDesign";

export type EmailTemplateStatus = "draft" | "published";

export interface EmailTemplate {
  id: number;
  projectId: number;
  name: string;
  subject: string;
  html: string;
  designJson: EmailDesignDocument | null;
  createdAt: Date;
  updatedAt: Date;
  status: EmailTemplateStatus;
}

export interface CreateEmailTemplateInput {
  projectId: number;
  name: string;
  subject: string;
  html: string;
  designJson: EmailDesignDocument | null;
}

export interface UpdateEmailTemplateInput {
  id: number;
  name?: string;
  subject?: string;
  html?: string;
  designJson?: EmailDesignDocument | null;
  status?: EmailTemplateStatus;
}
