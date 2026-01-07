"use client";

import React, { memo } from "react";
import styles from "./props-manager.module.css";
import { useEditorStore } from "../../state/editor.store";
import { useShallow } from "zustand/react/shallow";
import { HeadingSection } from "./components/sections/heading-section";
import { ParagraphSection } from "./components/sections/paragraph-section";
import { ButtonSection } from "./components/sections/button-section";
import { ImageSection } from "./components/sections/image-section";
import { SpacerSection } from "./components/sections/spacer-section";
import { ListSection } from "./components/sections/list-section";
import { DividerSection } from "./components/sections/divider-section";
import { ProductLineSection } from "./components/sections/product-line-section";
import { SocialsSection } from "./components/sections/socials-section";
import { UnknownSection } from "./components/sections/unknown-section";
import { GlobalSection } from "./components/sections/global-section";
import { RowSection } from "./components/sections/row-section";

export const PropsManager = () => {
  // Selection info (kind, id, type) is enough to decide which section to show.
  // We use useShallow to only re-render if these basic properties change.
  const selectionInfo = useEditorStore(
    useShallow((s) => {
      if (!s.selection) return null;

      const kind = s.selection.kind;
      const id = s.selection.id;

      if (kind === "row") {
        const row = s.design.rows.find((r) => r.id === id);
        return row ? { kind, id, type: "row" } : null;
      }

      if (kind === "block") {
        for (const row of s.design.rows) {
          for (const column of row.columns) {
            const block = column.blocks.find((b) => b.id === id);
            if (block) return { kind, id, type: block.type };
          }
        }
      }
      return null;
    })
  );

  if (!selectionInfo) {
    return (
      <aside className={styles.panel}>
        <div className={styles.content}>
          <GlobalSection />
        </div>
      </aside>
    );
  }

  return (
    <aside className={styles.panel}>
      <div className={styles.content}>
        <SectionRenderer 
          kind={selectionInfo.kind as any} 
          id={selectionInfo.id} 
          type={selectionInfo.type} 
        />
      </div>
    </aside>
  );
};

interface SectionRendererProps {
  kind: "row" | "block" | "column";
  id: string;
  type: string;
}

const SectionRenderer = memo(({ kind, id, type }: SectionRendererProps) => {
  // This component fetches the actual block/row data.
  // Since it's memoized, it only re-renders if kind, id or type changes.
  const element = useEditorStore((s) => {
    if (kind === "row") {
      return s.design.rows.find((r) => r.id === id) || null;
    }
    if (kind === "block") {
      for (const row of s.design.rows) {
        for (const column of row.columns) {
          const block = column.blocks.find((b) => b.id === id);
          if (block) return block;
        }
      }
    }
    return null;
  });

  if (!element) return null;

  if (kind === "row") {
    return <RowSection row={element as any} />;
  }

  const block = element as any;
  switch (type) {
    case "heading":
      return <HeadingSection block={block} />;
    case "paragraph":
      return <ParagraphSection block={block} />;
    case "button":
      return <ButtonSection block={block} />;
    case "image":
      return <ImageSection block={block} />;
    case "spacer":
      return <SpacerSection block={block} />;
    case "list":
      return <ListSection block={block} />;
    case "divider":
      return <DividerSection block={block} />;
    case "product-line":
      return <ProductLineSection block={block} />;
    case "socials":
      return <SocialsSection block={block} />;
    default:
      return <UnknownSection />;
  }
});
