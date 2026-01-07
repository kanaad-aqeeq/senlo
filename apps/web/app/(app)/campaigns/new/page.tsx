import { getWizardData } from "../actions";
import { CampaignWizard } from "./campaign-wizard";

export const dynamic = "force-dynamic";

export default async function NewCampaignPage() {
  const result = await getWizardData();

  if (!result.success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              !
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Failed to load wizard data
            </h1>
            <p className="text-gray-600">
              We could not load the data needed to create a campaign. Please try
              again.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <CampaignWizard projects={result.data.projects} />;
}
