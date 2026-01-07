"use client";

import React, { memo } from "react";
import { useBlockForm } from "../../../../hooks/use-block-form";
import { dividerSchema } from "../../../../schemas/block-schemas";
import {
  FormSection,
  FormField,
  ToggleGroup,
  ColorPicker,
  PaddingControl,
  FormGrid,
  Select,
  Slider,
} from "@senlo/ui";
import { DividerBlock } from "@senlo/core";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";
import { Controller } from "react-hook-form";
import { DEFAULT_COLOR } from "./defaults/common";
import {
  DEFAULT_DIVIDER_COLOR,
  DEFAULT_DIVIDER_WIDTH,
  DEFAULT_DIVIDER_ALIGN,
  DEFAULT_DIVIDER_BORDER_WIDTH,
  DEFAULT_DIVIDER_BORDER_STYLE,
  DEFAULT_DIVIDER_PADDING,
} from "./defaults/divider";

interface DividerSectionProps {
  block: DividerBlock;
}

export const DividerSection = memo(({ block }: DividerSectionProps) => {
  const { control, errors } = useBlockForm({
    block,
    schema: dividerSchema,
  });

  const alignOptions = [
    { value: "left", icon: <AlignLeft size={16} />, label: "Left" },
    { value: "center", icon: <AlignCenter size={16} />, label: "Center" },
    { value: "right", icon: <AlignRight size={16} />, label: "Right" },
  ];

  return (
    <FormSection title="Divider Settings">
      <FormGrid cols={2}>
        <FormField label="Line Color" error={errors.color?.message as string}>
          <Controller
            name="color"
            control={control}
            render={({ field }) => (
              <ColorPicker
                value={field.value ?? DEFAULT_DIVIDER_COLOR}
                onChange={field.onChange}
                defaultValue={DEFAULT_DIVIDER_COLOR}
              />
            )}
          />
        </FormField>

        <FormField label="Alignment" error={errors.align?.message as string}>
          <Controller
            name="align"
            control={control}
            render={({ field }) => (
              <ToggleGroup
                value={field.value ?? DEFAULT_DIVIDER_ALIGN}
                options={alignOptions}
                onChange={field.onChange}
              />
            )}
          />
        </FormField>
      </FormGrid>

      <Controller
        name="width"
        control={control}
        render={({ field }) => (
          <Slider
            label="Width"
            unit="%"
            min={1}
            max={100}
            value={field.value ?? DEFAULT_DIVIDER_WIDTH}
            onChange={field.onChange}
          />
        )}
      />

      <FormGrid cols={2}>
        <FormField
          label="Line Thickness"
          error={errors.borderWidth?.message as string}
        >
          <Controller
            name="borderWidth"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                value={field.value ?? DEFAULT_DIVIDER_BORDER_WIDTH}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 8, 10].map((v) => (
                  <option key={v} value={v}>
                    {v}px
                  </option>
                ))}
              </Select>
            )}
          />
        </FormField>

        <FormField
          label="Line Style"
          error={errors.borderStyle?.message as string}
        >
          <Controller
            name="borderStyle"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                value={field.value ?? DEFAULT_DIVIDER_BORDER_STYLE}
              >
                <option value="solid">Solid</option>
                <option value="dashed">Dashed</option>
                <option value="dotted">Dotted</option>
              </Select>
            )}
          />
        </FormField>
      </FormGrid>

      <FormSection title="Spacing">
        <Controller
          name="padding"
          control={control}
          render={({ field }) => (
            <PaddingControl
              value={field.value ?? DEFAULT_DIVIDER_PADDING}
              onChange={field.onChange}
            />
          )}
        />
      </FormSection>
    </FormSection>
  );
});




