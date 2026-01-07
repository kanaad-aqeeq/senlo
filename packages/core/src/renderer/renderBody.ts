import { EmailDesignDocument, RowBlock } from "../emailDesign";
import { RenderContext } from "./types";
import { renderRow } from "./renderRow";

export function renderBody(rows: RowBlock[], design: EmailDesignDocument, context: RenderContext): string {
  const contentWidth = design.settings.contentWidth || 600;

  return `
    <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color:${design.settings.backgroundColor || "#ffffff"};">
      <tr>
        <td align="center">
          <table class="senlo-full-width" width="${contentWidth}" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:${contentWidth}px; margin: 0 auto; max-width: 100%;">
            <tr>
              <td align="left" style="font-size: 0;">
                ${rows.map((row) => renderRow(row, context)).join("")}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}









