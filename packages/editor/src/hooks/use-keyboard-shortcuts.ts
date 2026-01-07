import { useEffect } from "react";
import { useEditorStore } from "../state/editor.store";

export const useKeyboardShortcuts = () => {
  const undo = useEditorStore((s) => s.undo);
  const redo = useEditorStore((s) => s.redo);
  const canUndo = useEditorStore((s) => s.canUndo);
  const canRedo = useEditorStore((s) => s.canRedo);
  const selection = useEditorStore((s) => s.selection);
  const design = useEditorStore((s) => s.design);
  const removeRow = useEditorStore((s) => s.removeRow);
  const removeBlockFromColumn = useEditorStore((s) => s.removeBlockFromColumn);
  const duplicateRow = useEditorStore((s) => s.duplicateRow);
  const duplicateBlock = useEditorStore((s) => s.duplicateBlock);
  const clearSelection = useEditorStore((s) => s.clearSelection);
  const selectNext = useEditorStore((s) => s.selectNext);
  const selectPrevious = useEditorStore((s) => s.selectPrevious);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if user is typing in an input or textarea
      const target = event.target as HTMLElement;
      const isTyping = 
        target.tagName === "INPUT" || 
        target.tagName === "TEXTAREA" || 
        target.isContentEditable;

      if (isTyping) {
        // Even when typing, Escape should blur the input and clear selection
        if (event.key === "Escape") {
          target.blur();
          clearSelection();
        }
        return;
      }

      const isModKey = event.metaKey || event.ctrlKey;
      const isShift = event.shiftKey;

      // Escape: Clear Selection
      if (event.key === "Escape") {
        clearSelection();
        return;
      }

      // Undo: Cmd/Ctrl + Z
      if (isModKey && event.key.toLowerCase() === "z" && !isShift) {
        if (canUndo) {
          event.preventDefault();
          undo();
        }
        return;
      }

      // Redo: Cmd/Ctrl + Shift + Z or Cmd/Ctrl + Y
      if (
        (isModKey && isShift && event.key.toLowerCase() === "z") ||
        (isModKey && event.key.toLowerCase() === "y")
      ) {
        if (canRedo) {
          event.preventDefault();
          redo();
        }
        return;
      }

      // Delete / Backspace
      if (event.key === "Delete" || event.key === "Backspace") {
        if (!selection) return;

        if (selection.kind === "row") {
          event.preventDefault();
          removeRow(selection.id);
        } else if (selection.kind === "block") {
          // Find columnId for the selected block
          for (const row of design.rows) {
            for (const column of row.columns) {
              if (column.blocks.some(b => b.id === selection.id)) {
                event.preventDefault();
                removeBlockFromColumn(selection.id, column.id);
                return;
              }
            }
          }
        }
        return;
      }

      // Arrow Keys Navigation
      if (event.key === "ArrowDown") {
        event.preventDefault();
        selectNext();
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        selectPrevious();
        return;
      }

      // Duplicate: Cmd/Ctrl + D
      if (isModKey && event.key.toLowerCase() === "d") {
        if (!selection) return;

        if (selection.kind === "row") {
          event.preventDefault();
          duplicateRow(selection.id);
        } else if (selection.kind === "block") {
          // Find columnId for the selected block
          for (const row of design.rows) {
            for (const column of row.columns) {
              if (column.blocks.some(b => b.id === selection.id)) {
                event.preventDefault();
                duplicateBlock(selection.id, column.id);
                return;
              }
            }
          }
        }
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    undo, 
    redo, 
    canUndo, 
    canRedo, 
    selection, 
    design, 
    removeRow, 
    removeBlockFromColumn, 
    duplicateRow, 
    duplicateBlock,
    clearSelection,
    selectNext,
    selectPrevious
  ]);
};











