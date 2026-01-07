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

async function main() {
  console.log("Seeding database...");

  // Insert project
  const [project] = await db
    .insert(projects)
    .values({
      name: "Example Project",
      description: "A second example project created via seed script",
    })
    .returning();

  console.log(`Created project: ${project.name} (ID: ${project.id})`);

  // Insert template
  const [template] = await db
    .insert(emailTemplates)
    .values({
      projectId: project.id,
      name: "Order Confirmation",
      subject: "Your order is confirmed",
      html: ORDER_CONFIRMATION_TEMPLATE_HTML,
      designJson: ORDER_CONFIRMATION_TEMPLATE_DESIGN_JSON,
      status: "draft",
    })
    .returning();

  await db
    .insert(emailTemplates)
    .values({
      projectId: project.id,
      name: "Welcome to Senlo",
      subject: "Welcome to Senlo — start building emails in minutes",
      html: WELCOME_TO_SENLO_TEMPLATE_HTML,
      designJson: WELCOME_TO_SENLO_TEMPLATE_DESIGN_JSON,
      status: "draft",
    })
    .returning();

  await db
    .insert(emailTemplates)
    .values({
      projectId: project.id,
      name: "Personalization",
      subject: "Welcome to Senlo — start building emails in minutes",
      html: PERSONALIZATION_TEMPLATE_HTML,
      designJson: PERSONALIZATION_TEMPLATE_DESIGN_JSON,
      status: "draft",
    })
    .returning();

  const [transitionalEmail] = await db
    .insert(emailTemplates)
    .values({
      projectId: project.id,
      name: "Transactional",
      subject: "Your message from Example Project",
      html: TRANSACTIONAL_TEMPLATE_HTML,
      designJson: TRANSACTIONAL_TEMPLATE_DESIGN_JSON,
      status: "draft",
    })
    .returning();

  await db.insert(campaigns).values({
    projectId: project.id,
    templateId: transitionalEmail.id,
    name: "Transactional Email",
    type: "TRIGGERED",
    status: "DRAFT",
    fromName: "Igor",
    fromEmail: "hello@frontendly.dev",
    subject: "Transactional email",
    variablesSchema: {
      status: "placeholder for status",
      custom_note: "placeholder for custom_note",
      reference_id: 1,
    },
  });

  console.log(`Created template: ${template.name} (ID: ${template.id})`);

  console.log("Seeding completed successfully!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seeding failed:");
  console.error(err);
  process.exit(1);
});
