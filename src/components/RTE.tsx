"use client";

import dynamic from "next/dynamic";
import type { MDEditorProps } from "@uiw/react-md-editor";

// Load editor only at runtime to avoid SSR issues
const RTE = dynamic<MDEditorProps>(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  {
    ssr: false,
  },
);

// Markdown Preview
export const MarkdownPreview = dynamic(
  () =>
    import("@uiw/react-md-editor").then((mod) => {
      return () => null;
    }),
  {
    ssr: false,
  },
);

export default RTE;
