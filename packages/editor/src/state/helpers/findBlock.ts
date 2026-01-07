import type { EmailDesignDocument, ContentBlock, ColumnBlock, RowBlock, ContentBlockId } from "@senlo/core";

export interface BlockSearchResult {
  block: ContentBlock;
  column: ColumnBlock;
  row: RowBlock;
  blockIndex: number;
}

/**
 * Finds a block by ID within an email design document.
 * Returns the block along with its parent column, row, and index position.
 * 
 * @param design - The email design document to search in
 * @param blockId - The ID of the block to find
 * @returns Block search result or null if not found
 */
export function findBlock(design: EmailDesignDocument, blockId: ContentBlockId): BlockSearchResult | null {
  for (const row of design.rows) {
    for (const column of row.columns) {
      const blockIndex = column.blocks.findIndex((b) => b.id === blockId);
      if (blockIndex !== -1) {
        const block = column.blocks[blockIndex];
        return { block, column, row, blockIndex };
      }
    }
  }
  return null;
}

/**
 * Finds a block by ID and returns only the block instance.
 * Useful when you only need the block data without context.
 * 
 * @param design - The email design document to search in
 * @param blockId - The ID of the block to find
 * @returns The block instance or null if not found
 */
export function findBlockOnly(design: EmailDesignDocument, blockId: ContentBlockId): ContentBlock | null {
  const result = findBlock(design, blockId);
  return result ? result.block : null;
}