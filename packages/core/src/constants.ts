import { EmailDesignDocument, emailDesignVersion } from "./emailDesign";

export const EMPTY_EMAIL_DESIGN: EmailDesignDocument = {
  version: emailDesignVersion,
  rows: [],
  settings: {
    backgroundColor: "#f9fafb",
    contentWidth: 600,
    fontFamily: "Arial, sans-serif",
    textColor: "#111827",
  },
};
