import { Suspense } from "react";
import { EditorLayout } from "@senlo/editor";
import { EmailDesignDocument, emailDesignVersion } from "@senlo/core";

const BLANK_EDITOR_TEMPLATE: EmailDesignDocument = {
  version: emailDesignVersion,
  rows: [],
  settings: {
    backgroundColor: "#ffffff",
    contentWidth: 600,
    fontFamily: "Arial, sans-serif",
    textColor: "#111827",
  },
};

export default function HomePage() {
  const templateId = 3;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading editor...
        </div>
      }
    >
      <EditorLayout
        initialDesign={BLANK_EDITOR_TEMPLATE}
        templateId={templateId}
        projectId={templateId}
        templateName="Blank Template"
        templateSubject="Untitled"
        headerVariant="minimal"
      />
    </Suspense>
  );
}
