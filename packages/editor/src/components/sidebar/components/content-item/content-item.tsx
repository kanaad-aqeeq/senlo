"use client";

import React from "react";
import styles from "./content-item.module.css";

import { useDraggable } from "@dnd-kit/core";
import { Heading, AlignLeft, MousePointerClick, Image, Minus, List, SquareSplitVertical, Package, Share2 } from "lucide-react";
import { ContentBlockType } from "@senlo/core";

interface ContentItemProps {
  blockType: ContentBlockType;
  label: string;
}

export const ContentItem = React.memo<ContentItemProps>(({ blockType, label }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${blockType}`,
    data: {
      type: "content",
      data: blockType,
      label: label,
    },
  });

  const getIcon = () => {
    switch (blockType) {
      case "heading":
        return <Heading size={24} />;
      case "paragraph":
        return <AlignLeft size={24} />;
      case "button":
        return <MousePointerClick size={24} />;
      case "image":
        return <Image size={24} />;
      case "spacer":
        return <Minus size={24} />;
      case "list":
        return <List size={24} />;
      case "divider":
        return <SquareSplitVertical size={24} />;
      case "product-line":
        return <Package size={24} />;
      case "socials":
        return <Share2 size={24} />;
    }
  };

  return (
    <button
      ref={setNodeRef}
      type="button"
      className={styles.contentCard}
      style={{ opacity: isDragging ? 0.3 : 1 }}
      {...listeners}
      {...attributes}
      disabled={isDragging}
    >
      <div className={styles.iconContainer}>{getIcon()}</div>
      <div className={styles.contentLabel}>{label}</div>
    </button>
  );
});

ContentItem.displayName = "ContentItem";
