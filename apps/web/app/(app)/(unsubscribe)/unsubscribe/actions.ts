"use server";

import { decodeUnsubscribeToken } from "@senlo/core";
import { ContactRepository } from "@senlo/db";
import { CampaignRepository } from "@senlo/db";
import { logger } from "apps/web/lib/logger";

export async function unsubscribeAction(token: string) {
  const data = decodeUnsubscribeToken(token);
  if (!data) {
    return { success: false, error: "Invalid token" };
  }

  const contactRepo = new ContactRepository();
  const campaignRepo = new CampaignRepository();

  try {
    const contact = await contactRepo.findById(data.contactId);
    if (!contact) {
      return { success: false, error: "Contact not found" };
    }

    if (contact.unsubscribed) {
      return { success: true, alreadyUnsubscribed: true };
    }

    await contactRepo.unsubscribe(data.contactId);

    await campaignRepo.logEvent({
      campaignId: data.campaignId,
      contactId: data.contactId,
      email: contact.email,
      type: "UNSUBSCRIBE",
    });

    return { success: true };
  } catch (error) {
    logger.error("Unsubscribe action failed", {
      token: token.substring(0, 10) + "...", // Don't log full token
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return { success: false, error: "An error occurred" };
  }
}
