import type { Campaign, CampaignStatus } from "../domain";
import type {
  ICampaignRepository,
  IEmailTemplateRepository,
  RecipientListRepository,
} from "../ports";

export class CampaignService {
  constructor(
    private readonly campaigns: ICampaignRepository,
    private readonly templates: IEmailTemplateRepository,
    private readonly lists: RecipientListRepository
  ) {}

  async createCampaign(input: Omit<Campaign, "id" | "createdAt" | "updatedAt" | "status">): Promise<Campaign> {
    const template = await this.templates.findById(input.templateId);

    if (!template || template.projectId !== input.projectId) {
      throw new Error("Template does not belong to project");
    }

    return this.campaigns.create({
      ...input,
      status: "DRAFT",
    });
  }

  async updateStatus(id: number, status: CampaignStatus): Promise<Campaign> {
    const campaign = await this.campaigns.update(id, { status });
    if (!campaign) throw new Error("Campaign not found");
    return campaign;
  }
}
