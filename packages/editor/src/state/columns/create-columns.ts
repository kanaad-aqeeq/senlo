import { nanoid } from "nanoid";

import type { ColumnBlock, ColumnId } from "@senlo/core";
import { LayoutPreset } from "@senlo/editor/types/layout-preset";

export function createColumns(preset: LayoutPreset): ColumnBlock[] {
  switch (preset) {
    case "1col":
      return [createColumn(100)];

    case "2col-25-75":
      return [createColumn(25), createColumn(75)];

    case "2col-75-25":
      return [createColumn(75), createColumn(25)];

    case "2col-50-50":
      return [createColumn(50), createColumn(50)];

    case "2col-33-67":
      return [createColumn(33.33), createColumn(66.67)];

    case "2col-67-33":
      return [createColumn(66.67), createColumn(33.33)];

    case "3col":
      return [createColumn(33.33), createColumn(33.33), createColumn(33.34)];
  }
}

function createColumn(width: number): ColumnBlock {
  return {
    id: nanoid() as ColumnId,
    width,
    blocks: [],
  };
}
