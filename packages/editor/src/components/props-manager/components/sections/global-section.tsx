"use client";

import { useGlobalSettingsForm } from "../../../../hooks/use-global-settings-form";
import { FormSection, FormField, Input, Select, ColorPicker } from "@senlo/ui";
import { Controller } from "react-hook-form";

export const GlobalSection = () => {
  const { register, control, errors } = useGlobalSettingsForm();

  return (
    <FormSection title="Global Settings">
      <FormField label="Background Color" error={errors.backgroundColor?.message}>
        <Controller
          name="backgroundColor"
          control={control}
          render={({ field }) => (
            <ColorPicker 
              value={field.value} 
              onChange={field.onChange} 
            />
          )}
        />
      </FormField>

      <FormField label="Content Width (px)" error={errors.contentWidth?.message}>
        <Input 
          type="number"
          {...register("contentWidth", { valueAsNumber: true })} 
          placeholder="600" 
        />
      </FormField>

      <FormField label="Default Font Family" error={errors.fontFamily?.message}>
        <Select {...register("fontFamily")}>
          <option value="Arial, sans-serif">Arial</option>
          <option value="'Helvetica Neue', Helvetica, sans-serif">Helvetica</option>
          <option value="'Times New Roman', Times, serif">Times New Roman</option>
          <option value="Georgia, serif">Georgia</option>
          <option value="'Courier New', Courier, monospace">Courier New</option>
        </Select>
      </FormField>

      <FormField label="Default Text Color" error={errors.textColor?.message}>
        <Input 
          {...register("textColor")} 
          placeholder="#111827" 
        />
      </FormField>
    </FormSection>
  );
};
