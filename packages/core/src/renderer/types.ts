import { EmailDesignDocument } from "../emailDesign";

export interface EmailRenderer {
  render(design: EmailDesignDocument): string;
}

export type RenderContext = {
  // To store shared state during rendering (e.g. unique classes for media queries)
  responsiveStyles: string[];
};









