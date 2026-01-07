import { PageHeader, Button } from "@senlo/ui";
import { Plus } from "lucide-react";
import Link from "next/link";
import { CampaignsList } from "apps/web/components/campaigns-list";

export default function CampaignsPage() {
  return (
    <main className="max-w-6xl mx-auto py-10 px-8">
      <PageHeader
        title="Campaigns"
        description="Monitor and manage all your email campaigns in one place."
        actions={
          <Link href="/campaigns/new">
            <Button>
              <Plus size={16} />
              New Campaign
            </Button>
          </Link>
        }
      />

      <CampaignsList showFilters={true} />
    </main>
  );
}
