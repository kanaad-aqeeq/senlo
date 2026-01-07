import type { EmailDesignDocument, ColumnBlock, RowBlock, ColumnId } from "@senlo/core";

export interface ColumnSearchResult {
  column: ColumnBlock;
  row: RowBlock;
  columnIndex: number;
}

/**
 * Finds a column by ID within an email design document.
 * Returns the column along with its parent row and index position.
 * 
 * @param design - The email design document to search in
 * @param columnId - The ID of the column to find
 * @returns Column search result or null if not found
 */
export function findColumn(design: EmailDesignDocument, columnId: ColumnId): ColumnSearchResult | null {
  for (const row of design.rows) {
    const columnIndex = row.columns.findIndex((col) => col.id === columnId);
    if (columnIndex !== -1) {
      const column = row.columns[columnIndex];
      return { column, row, columnIndex };
    }
  }
  return null;
}

/**
 * Finds a column by ID and returns only the column instance.
 * Useful when you only need the column data without context.
 * 
 * @param design - The email design document to search in
 * @param columnId - The ID of the column to find
 * @returns The column instance or null if not found
 */
export function findColumnOnly(design: EmailDesignDocument, columnId: ColumnId): ColumnBlock | null {
  const result = findColumn(design, columnId);
  return result ? result.column : null;
}