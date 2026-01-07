"use client";

import { useDroppable } from "@dnd-kit/core";
import { useEditorStore } from "../../../../state/editor.store";
import { DropIndicator } from "../drop-indicator/drop-indicator";
import { ContentBlockId, ColumnId } from "@senlo/core";
import styles from "./block-drop-zones.module.css";

interface BlockDropZonesProps {
  blockId: ContentBlockId;
  columnId: ColumnId;
}

export const BlockDropZones = ({ blockId, columnId }: BlockDropZonesProps) => {
  const design = useEditorStore((s) => s.design);

  // Find the block position within the column
  let blockIndex = -1;
  for (const row of design.rows) {
    const column = row.columns.find((col) => col.id === columnId);
    if (column) {
      blockIndex = column.blocks.findIndex((block) => block.id === blockId);
      break;
    }
  }

  const { isOver: isOverTop, setNodeRef: setTopRef } = useDroppable({
    id: `block-drop-zone-before-${blockId}`,
    data: {
      type: "block-drop-zone",
      columnId,
      position: blockIndex,
    },
  });

  const { isOver: isOverBottom, setNodeRef: setBottomRef } = useDroppable({
    id: `block-drop-zone-after-${blockId}`,
    data: {
      type: "block-drop-zone",
      columnId,
      position: blockIndex + 1,
    },
  });

  return (
    <>
      <div ref={setTopRef} className={styles.dropZoneTop}>
        {isOverTop && (
          <div className={styles.indicatorTop}>
            <DropIndicator isVisible={true} />
          </div>
        )}
      </div>

      <div ref={setBottomRef} className={styles.dropZoneBottom}>
        {isOverBottom && (
          <div className={styles.indicatorBottom}>
            <DropIndicator isVisible={true} />
          </div>
        )}
      </div>
    </>
  );
};