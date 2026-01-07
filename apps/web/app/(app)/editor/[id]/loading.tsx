export default function EditorLoading() {
  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Sidebar skeleton */}
      <div className="w-64 border-r border-gray-200 bg-white p-4 animate-pulse">
        <div className="space-y-4">
          <div className="h-10 bg-gray-200 rounded" />
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-8 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header skeleton */}
        <div className="border-b border-gray-200 bg-white p-4 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-8 bg-gray-200 rounded w-32" />
              <div className="h-6 bg-gray-200 rounded w-48" />
            </div>
            <div className="flex gap-2">
              <div className="h-8 bg-gray-200 rounded w-20" />
              <div className="h-8 bg-gray-200 rounded w-16" />
              <div className="h-8 bg-gray-200 rounded w-24" />
            </div>
          </div>
        </div>

        <div className="flex-1 flex">
          {/* Properties panel skeleton */}
          <div className="w-80 border-r border-gray-200 bg-white p-4 animate-pulse">
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-24" />
              <div className="space-y-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-20" />
                    <div className="h-8 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Canvas skeleton */}
          <div className="flex-1 bg-white p-8 animate-pulse">
            <div className="max-w-2xl mx-auto">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                <div className="space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                  <div className="h-12 bg-gray-200 rounded w-32 mx-auto mt-6" />
                </div>
              </div>
            </div>
          </div>

          {/* Right sidebar skeleton */}
          <div className="w-64 border-l border-gray-200 bg-white p-4 animate-pulse">
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-16" />
              <div className="grid grid-cols-2 gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="aspect-square bg-gray-200 rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



