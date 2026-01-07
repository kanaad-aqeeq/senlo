"use client";

import { PageHeader, Card, Badge, Button } from "@senlo/ui";
import { Cloud, Trash2, CheckCircle2, Circle } from "lucide-react";
import { AddProviderDialog } from "./add-provider-dialog";
import { 
  useProviders, 
  useDeleteProvider, 
  useToggleProvider 
} from "apps/web/queries/providers";

export default function ProvidersPage() {
  const {
    data: providers = [],
    isLoading,
    error,
    refetch,
  } = useProviders();

  const { mutate: deleteProvider } = useDeleteProvider();
  const { mutate: toggleProvider } = useToggleProvider();

  const handleDelete = (providerId: number) => {
    if (!confirm("Are you sure you want to delete this provider?")) return;

    deleteProvider(providerId, {
      onError: () => {
        alert("Failed to delete provider. Please try again.");
      }
    });
  };

  const handleToggle = (providerId: number, isActive: boolean) => {
    toggleProvider({ providerId, isActive }, {
      onError: () => {
        alert("Failed to update provider status. Please try again.");
      }
    });
  };

  if (isLoading) {
    return (
      <main className="max-w-6xl mx-auto py-10 px-8">
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-6xl mx-auto py-10 px-8">
        <div className="text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              !
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Failed to load providers
            </h1>
            <p className="text-gray-600">{error.message}</p>
            <Button onClick={() => refetch()} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto py-10 px-8">
      <PageHeader
        title="Email Providers"
        description="Manage your email sending services and API keys."
        actions={<AddProviderDialog />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.length === 0 ? (
          <Card className="col-span-full py-20 text-center border-dashed border-2">
            <Cloud size={48} className="mx-auto text-zinc-300 mb-4" />
            <h3 className="text-lg font-semibold text-zinc-900">
              No providers configured
            </h3>
            <p className="text-zinc-500 max-w-sm mx-auto mt-2">
              Add your first email provider to start sending campaigns.
            </p>
          </Card>
        ) : (
          providers.map((provider) => (
            <Card key={provider.id} className="p-6 flex flex-col h-full group">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 bg-zinc-100 rounded-lg text-zinc-900">
                  <Cloud size={24} />
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={provider.isActive ? "success" : "outline"}>
                    {provider.isActive ? "Active" : "Inactive"}
                  </Badge>
                  <button
                    onClick={() => handleDelete(provider.id)}
                    className="text-zinc-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <h3 className="font-bold text-lg text-zinc-900">
                {provider.name}
              </h3>
              <p className="text-sm text-zinc-500 mt-1 mb-6">
                Type:{" "}
                <span className="font-medium text-zinc-700">
                  {provider.type}
                </span>
              </p>

              <div className="mt-auto pt-4 border-t border-zinc-100 flex items-center justify-between">
                <div className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">
                  Added{" "}
                  {new Date(provider.createdAt).toLocaleDateString("en-GB")}
                </div>
                <button
                  onClick={() => handleToggle(provider.id, !provider.isActive)}
                  className={`flex items-center gap-1.5 text-xs font-semibold ${
                    provider.isActive ? "text-zinc-400" : "text-blue-600"
                  } hover:underline`}
                >
                  {provider.isActive ? (
                    <>
                      <Circle size={14} />
                      Deactivate
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={14} />
                      Set as active
                    </>
                  )}
                </button>
              </div>
            </Card>
          ))
        )}
      </div>
    </main>
  );
}
