"use client";

import React from "react";
import styles from "./palette-item.module.css";

import { useDraggable } from "@dnd-kit/core";

import { LayoutPreset } from "../../../../types/layout-preset";

interface PaletteItemProps {
  preset: LayoutPreset;
}

export const PaletteItem = React.memo<PaletteItemProps>(({ preset }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${preset}`,
    data: {
      type: "row",
      data: preset,
    },
  });

  const style = {
    opacity: isDragging ? 0.3 : 1,
  };

  const renderPreview = () => {
    switch (preset) {
      case "1col":
        return <div className={styles.previewCol} style={{ width: "100%" }} />;

      case "2col-25-75":
        return (
          <>
            <div
              className={styles.previewCol}
              style={{ flex: "0 0 calc(25% - 1px)" }}
            />
            <div
              className={styles.previewCol}
              style={{ flex: "0 0 calc(75% - 1px)" }}
            />
          </>
        );

      case "2col-75-25":
        return (
          <>
            <div
              className={styles.previewCol}
              style={{ flex: "0 0 calc(75% - 1px)" }}
            />
            <div
              className={styles.previewCol}
              style={{ flex: "0 0 calc(25% - 1px)" }}
            />
          </>
        );

      case "2col-50-50":
        return (
          <>
            <div
              className={styles.previewCol}
              style={{ flex: "0 0 calc(50% - 1px)" }}
            />
            <div
              className={styles.previewCol}
              style={{ flex: "0 0 calc(50% - 1px)" }}
            />
          </>
        );

      case "2col-33-67":
        return (
          <>
            <div
              className={styles.previewCol}
              style={{ flex: "0 0 calc(33.33% - 1px)" }}
            />
            <div
              className={styles.previewCol}
              style={{ flex: "0 0 calc(66.67% - 1px)" }}
            />
          </>
        );

      case "2col-67-33":
        return (
          <>
            <div
              className={styles.previewCol}
              style={{ flex: "0 0 calc(66.67% - 1px)" }}
            />
            <div
              className={styles.previewCol}
              style={{ flex: "0 0 calc(33.33% - 1px)" }}
            />
          </>
        );

      case "3col":
        return (
          <>
            <div
              className={styles.previewCol}
              style={{ flex: "0 0 calc(33.33% - 1.33px)" }}
            />
            <div
              className={styles.previewCol}
              style={{ flex: "0 0 calc(33.33% - 1.33px)" }}
            />
            <div
              className={styles.previewCol}
              style={{ flex: "0 0 calc(33.34% - 1.33px)" }}
            />
          </>
        );
    }
  };

  return (
    <button
      ref={setNodeRef}
      type="button"
      className={styles.item}
      style={style}
      {...listeners}
      {...attributes}
      disabled={isDragging}
    >
      <div className={styles.preview}>{renderPreview()}</div>
    </button>
  );
});

PaletteItem.displayName = "PaletteItem";
