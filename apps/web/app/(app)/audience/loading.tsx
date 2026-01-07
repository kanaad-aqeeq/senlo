import { PageHeader } from "@senlo/ui";

export default function AudienceLoading() {
  return (
    <main className="max-w-6xl mx-auto py-10 px-8">
      <div className="animate-pulse">
        <PageHeader
          title="Audience"
          description="Manage your contacts and recipient lists across projects."
          actions={
            <div className="flex items-center gap-3">
              <div className="h-9 w-32 bg-gray-200 rounded" />
              <div className="h-9 w-24 bg-gray-200 rounded" />
              <div className="h-9 w-32 bg-gray-200 rounded" />
              <div className="h-9 w-24 bg-gray-200 rounded" />
            </div>
          }
        />

        <div className="flex items-center gap-6 border-b border-gray-100 mb-8">
          <div className="pb-4">
            <div className="h-5 bg-gray-200 rounded w-28 mb-2" />
            <div className="w-full h-0.5 bg-gray-200" />
          </div>
          <div className="pb-4">
            <div className="h-5 bg-gray-200 rounded w-12 mb-2" />
          </div>
        </div>

        <div className="py-20 text-center">
          <div className="mx-auto w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4" />
          <p className="text-gray-600">Loading audience data...</p>
        </div>
      </div>
    </main>
  );
}

