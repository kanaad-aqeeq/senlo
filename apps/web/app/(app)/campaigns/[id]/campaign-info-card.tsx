"use client";

import { useState } from "react";
import {
  Card,
  Badge,
  Button,
  Dialog,
  FormField,
  Input,
  Textarea,
  JsonEditor,
} from "@senlo/ui";
import {
  Info,
  User,
  Mail,
  FileText,
  ArrowRight,
  Settings2,
  Save,
  X,
} from "lucide-react";
import Link from "next/link";
import { Campaign, Project, EmailTemplate } from "@senlo/core";
import { updateCampaignAction } from "../actions";
import { logger } from "apps/web/lib/logger";

interface CampaignInfoCardProps {
  campaign: Campaign;
  project: Project;
  template: EmailTemplate;
}

export function CampaignInfoCard({
  campaign,
  project,
  template,
}: CampaignInfoCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: campaign.name,
    description: campaign.description || "",
    fromName: campaign.fromName || "",
    fromEmail: campaign.fromEmail || "",
    subject: campaign.subject || "",
    variablesSchema: JSON.stringify(campaign.variablesSchema || {}, null, 2),
  });

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, value)
      );
      const result = await updateCampaignAction(campaign.id, data);
      if ('success' in result && result.success) {
        setIsEditing(false);
      } else if ('error' in result && result.error) {
        // Handle Zod validation errors
        const fieldErrors = result.error.fieldErrors;
        let errorMessage = 'Validation failed';

        if (fieldErrors) {
          if ('name' in fieldErrors && fieldErrors.name?.[0]) {
            errorMessage = fieldErrors.name[0];
          } else if ('fromEmail' in fieldErrors && fieldErrors.fromEmail?.[0]) {
            errorMessage = fieldErrors.fromEmail[0];
          } else if ('general' in fieldErrors && fieldErrors.general?.[0]) {
            errorMessage = fieldErrors.general[0];
          }
        }

        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      logger.error("Failed to update campaign from info card", {
        campaignId: campaign.id,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Card className="p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Info size={20} strokeWidth={2.5} className="text-zinc-400" />
            Campaign Info
          </h3>
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0 text-zinc-400 hover:text-blue-600"
            onClick={() => setIsEditing(true)}
          >
            <Settings2 size={20} />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase text-zinc-400">
              Project
            </label>
            <div className="flex items-center gap-2 text-sm">
              <Badge variant="outline" className="font-normal">
                {project.name}
              </Badge>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase text-zinc-400">
              Sender
            </label>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm text-zinc-600">
                <User size={14} />
                {campaign.fromName || "Default Sender"}
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-600">
                <Mail size={14} />
                {campaign.fromEmail || "hello@senlo.io"}
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase text-zinc-400">
              Content
            </label>
            <div className="space-y-2">
              <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-100">
                <div className="text-xs text-zinc-400 mb-1">Subject</div>
                <div className="text-sm font-medium text-zinc-900">
                  {campaign.subject || template.subject}
                </div>
              </div>
              <Link
                href={`/editor/${template.id}?campaignId=${campaign.id}`}
                className="flex items-center justify-between p-3 border border-zinc-100 rounded-lg hover:bg-zinc-50 transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-blue-600" />
                  <span className="text-sm font-medium">{template.name}</span>
                </div>
                <ArrowRight
                  size={14}
                  className="text-zinc-300 group-hover:text-zinc-900 transition-colors"
                />
              </Link>
            </div>
          </div>
        </div>
      </Card>

      <Dialog
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        title="Edit Campaign Settings"
        className="max-w-2xl"
        footer={
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => setIsEditing(false)}
              disabled={isSaving}
            >
              <X size={16} className="mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
              <Save size={16} className="ml-2" />
            </Button>
          </div>
        }
      >
        <div className="space-y-5 py-2">
          <FormField label="Campaign Name" required>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="From Name">
              <Input
                value={formData.fromName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, fromName: e.target.value }))
                }
                placeholder="e.g. Igor from Senlo"
              />
            </FormField>
            <FormField label="From Email">
              <Input
                value={formData.fromEmail}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    fromEmail: e.target.value,
                  }))
                }
                placeholder="e.g. hello@senlo.io"
              />
            </FormField>
          </div>

          <FormField label="Email Subject">
            <Input
              value={formData.subject}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, subject: e.target.value }))
              }
              placeholder="Leave empty to use template subject"
            />
          </FormField>

          <FormField label="Description">
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows={2}
            />
          </FormField>

          {campaign.type === "TRIGGERED" && (
            <FormField
              label="Sample JSON Data (Variables)"
              hint="Defines variables available in the editor"
            >
              <JsonEditor
                value={formData.variablesSchema}
                onChange={(val) =>
                  setFormData((prev) => ({ ...prev, variablesSchema: val }))
                }
                height="180px"
              />
            </FormField>
          )}
        </div>
      </Dialog>
    </>
  );
}
