"use client";

import styles from "./row-view-menu.module.css";
import { Trash2, Copy, ArrowUp, ArrowDown } from "lucide-react";
import { useEditorStore } from "../../../../state/editor.store";
import type { RowId } from "@senlo/core";

interface RowViewMenuProps {
  rowId: RowId;
}

export const RowViewMenu = ({ rowId }: RowViewMenuProps) => {
  const removeRow = useEditorStore((s) => s.removeRow);
  const duplicateRow = useEditorStore((s) => s.duplicateRow);
  const moveRow = useEditorStore((s) => s.moveRow);
  const rows = useEditorStore((s) => s.design.rows);

  const rowIndex = rows.findIndex((r) => r.id === rowId);
  const isFirst = rowIndex === 0;
  const isLast = rowIndex === rows.length - 1;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeRow(rowId);
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    duplicateRow(rowId);
  };

  const handleMoveUp = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isFirst) moveRow(rowId, "up");
  };

  const handleMoveDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLast) moveRow(rowId, "down");
  };

  return (
    <div className={styles.menu}>
      <button
        className={styles.deleteButton}
        onClick={handleDelete}
        title="Delete row"
      >
        <Trash2 size={22} />
      </button>
      <button
        className={styles.actionButton}
        onClick={handleDuplicate}
        title="Duplicate row"
      >
        <Copy size={22} />
      </button>
      {!isLast && (
        <button
          className={styles.actionButton}
          onClick={handleMoveDown}
          title="Move down"
        >
          <ArrowDown size={22} />
        </button>
      )}
      {!isFirst && (
        <button
          className={styles.actionButton}
          onClick={handleMoveUp}
          title="Move up"
        >
          <ArrowUp size={22} />
        </button>
      )}
    </div>
  );
};
