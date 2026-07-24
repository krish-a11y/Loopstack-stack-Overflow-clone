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

// Markdown Preview (read-only rendering of markdown content)
export const MarkdownPreview = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default.Markdown),
  {
    ssr: false,
  },
);

export default RTE;
