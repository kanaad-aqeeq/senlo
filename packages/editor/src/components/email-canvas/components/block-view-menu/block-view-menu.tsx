"use client";

import styles from "./block-view-menu.module.css";
import { Trash2, Copy } from "lucide-react";
import { useEditorStore } from "../../../../state/editor.store";
import type { ContentBlockId, ColumnId } from "@senlo/core";

interface BlockViewMenuProps {
  blockId: ContentBlockId;
  columnId: ColumnId;
}

export const BlockViewMenu = ({ blockId, columnId }: BlockViewMenuProps) => {
  const removeBlockFromColumn = useEditorStore((s) => s.removeBlockFromColumn);
  const duplicateBlock = useEditorStore((s) => s.duplicateBlock);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeBlockFromColumn(blockId, columnId);
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    duplicateBlock(blockId, columnId);
  };

  return (
    <div className={styles.menu}>
      <button
        className={styles.deleteButton}
        onClick={handleDelete}
        title="Delete block"
      >
        <Trash2 size={14} />
      </button>
      <button
        className={styles.actionButton}
        onClick={handleDuplicate}
        title="Duplicate block"
      >
        <Copy size={14} />
      </button>
    </div>
  );
};
