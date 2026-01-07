import { EmailProvider } from "../../domain";
import { IMailer } from "../../ports";
import { ResendMailer } from "./resendMailer";
import { MailgunMailer } from "./mailgunMailer";

export class MailerFactory {
  static create(provider: EmailProvider): IMailer {
    switch (provider.type) {
      case "RESEND": {
        const apiKey = provider.config?.apiKey;
        if (!apiKey) {
          throw new Error("Resend API key is missing in provider config");
        }
        return new ResendMailer(apiKey);
      }

      case "MAILGUN": {
        const { apiKey, domain, region } = provider.config || {};
        if (!apiKey || !domain) {
          throw new Error(
            "Mailgun API key and domain are required in provider config"
          );
        }
        return new MailgunMailer({ apiKey, domain, region });
      }

      default:
        throw new Error(
          `Unsupported email provider type: ${(provider as any).type}`
        );
    }
  }
}

export { ResendMailer } from "./resendMailer";
export { MailgunMailer } from "./mailgunMailer";
export type { MailgunConfig } from "./mailgunMailer";
