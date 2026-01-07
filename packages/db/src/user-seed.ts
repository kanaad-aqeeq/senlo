import { db } from "./client";
import { projects, emailTemplates, campaigns } from "./schema";
import {
  ORDER_CONFIRMATION_TEMPLATE_DESIGN_JSON,
  ORDER_CONFIRMATION_TEMPLATE_HTML,
} from "./seeds/order-confirmation-template";
import {
  PERSONALIZATION_TEMPLATE_DESIGN_JSON,
  PERSONALIZATION_TEMPLATE_HTML,
} from "./seeds/personalization-template";
import {
  TRANSACTIONAL_TEMPLATE_DESIGN_JSON,
  TRANSACTIONAL_TEMPLATE_HTML,
} from "./seeds/transactional-template";
import {
  WELCOME_TO_SENLO_TEMPLATE_DESIGN_JSON,
  WELCOME_TO_SENLO_TEMPLATE_HTML,
} from "./seeds/welcome-to-senlo-template";

/**
 * Seeds initial data for a newly registered user.
 * This is used for the demo mode to provide users with example data.
 * @param userId - The ID of the newly created user
 */
export async function seedUserData(userId: string) {
  // Insert project
  const [project] = await db
    .insert(projects)
    .values({
      userId,
      name: "Example Project",
      description: "This is your first example project. You can manage your email templates here.",
    })
    .returning();

  // Insert templates
  await db.insert(emailTemplates).values([
    {
      projectId: project.id,
      name: "Order Confirmation",
      subject: "Your order is confirmed",
      html: ORDER_CONFIRMATION_TEMPLATE_HTML,
      designJson: ORDER_CONFIRMATION_TEMPLATE_DESIGN_JSON,
      status: "draft",
    },
    {
      projectId: project.id,
      name: "Welcome to Senlo",
      subject: "Welcome to Senlo — start building emails in minutes",
      html: WELCOME_TO_SENLO_TEMPLATE_HTML,
      designJson: WELCOME_TO_SENLO_TEMPLATE_DESIGN_JSON,
      status: "draft",
    },
    {
      projectId: project.id,
      name: "Personalization",
      subject: "Personalize your emails with dynamic data",
      html: PERSONALIZATION_TEMPLATE_HTML,
      designJson: PERSONALIZATION_TEMPLATE_DESIGN_JSON,
      status: "draft",
    },
  ]);

  // Insert transactional template
  const [transitionalEmail] = await db
    .insert(emailTemplates)
    .values({
      projectId: project.id,
      name: "Transactional",
      subject: "Your transactional email update",
      html: TRANSACTIONAL_TEMPLATE_HTML,
      designJson: TRANSACTIONAL_TEMPLATE_DESIGN_JSON,
      status: "draft",
    })
    .returning();

  // Insert campaign
  await db.insert(campaigns).values({
    projectId: project.id,
    templateId: transitionalEmail.id,
    name: "Transactional Email",
    type: "TRIGGERED",
    status: "DRAFT",
    fromName: "Senlo Team",
    fromEmail: "onboarding@senlo.io",
    subject: "Transactional email notification",
    variablesSchema: {
      status: "string",
      custom_note: "string",
      reference_id: "number",
    },
  });

  return project;
}

