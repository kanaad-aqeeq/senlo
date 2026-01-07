"use client";

import styles from "./sidebar.module.css";

import { PaletteItem } from "./components/palette-item/palette-item";
import { SidebarSection } from "./components/sidebar-section/sidebar-section";
import { useEditorStore } from "../../state/editor.store";
import { cn } from "@senlo/ui";
import { ContentItem } from "./components/content-item/content-item";

export const Sidebar = () => {
  const activeTab = useEditorStore((s) => s.activeSidebarTab);
  const setActiveTab = useEditorStore((s) => s.setActiveSidebarTab);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.tabs}>
        <button
          className={cn(styles.tab, activeTab === "rows" && styles.tabActive)}
          onClick={() => setActiveTab("rows")}
        >
          ROWS
        </button>
        <button
          className={cn(
            styles.tab,
            activeTab === "content" && styles.tabActive
          )}
          onClick={() => setActiveTab("content")}
        >
          CONTENT
        </button>
      </div>

      {activeTab === "rows" && (
        <SidebarSection title="Layout" variant="rows">
          <PaletteItem preset="1col" />
          <PaletteItem preset="2col-25-75" />
          <PaletteItem preset="2col-75-25" />
          <PaletteItem preset="2col-50-50" />
          <PaletteItem preset="2col-33-67" />
          <PaletteItem preset="2col-67-33" />
          <PaletteItem preset="3col" />
        </SidebarSection>
      )}

      {activeTab === "content" && (
        <SidebarSection title="Content" variant="content">
          <ContentItem blockType="heading" label="Heading" />
          <ContentItem blockType="paragraph" label="Paragraph" />
          <ContentItem blockType="button" label="Button" />
          <ContentItem blockType="image" label="Image" />
          <ContentItem blockType="list" label="List" />
          <ContentItem blockType="divider" label="Divider" />
          <ContentItem blockType="spacer" label="Spacer" />
          <ContentItem blockType="product-line" label="Product Line" />
          <ContentItem blockType="socials" label="Socials" />
        </SidebarSection>
      )}
    </aside>
  );
};
