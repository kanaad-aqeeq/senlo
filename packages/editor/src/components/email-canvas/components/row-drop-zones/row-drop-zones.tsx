"use client";

import { useDroppable } from "@dnd-kit/core";
import { useEditorStore } from "../../../../state/editor.store";
import { DropIndicator } from "../drop-indicator/drop-indicator";
import { RowId } from "@senlo/core";
import styles from "./row-drop-zones.module.css";

interface RowDropZonesProps {
  rowId: RowId;
}

export const RowDropZones = ({ rowId }: RowDropZonesProps) => {
  const design = useEditorStore((s) => s.design);

  const rowIndex = design.rows.findIndex((row) => row.id === rowId);

  const { isOver: isOverTop, setNodeRef: setTopRef } = useDroppable({
    id: `row-drop-zone-before-${rowId}`,
    data: {
      type: "row-drop-zone",
      position: rowIndex,
    },
  });

  const { isOver: isOverBottom, setNodeRef: setBottomRef } = useDroppable({
    id: `row-drop-zone-after-${rowId}`,
    data: {
      type: "row-drop-zone",
      position: rowIndex + 1,
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
