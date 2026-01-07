import { PageHeader } from "@senlo/ui";

export default function ProjectsLoading() {
  return (
    <main className="max-w-6xl mx-auto py-10 px-8">
      <PageHeader
        title="Projects"
        description="Manage your projects, templates, and email campaigns."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-5 animate-pulse">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-gray-200 rounded-lg" />
              <div className="w-12 h-5 bg-gray-200 rounded" />
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-6 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-full" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded w-20" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}



