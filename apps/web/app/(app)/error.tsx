"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center p-8 text-center space-y-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            Something went wrong
          </h1>
          <p className="text-gray-600">Refresh or try again.</p>
          <button
            onClick={reset}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Retry
          </button>
        </div>
      </body>
    </html>
  );
}
