"use client"

import { useEffect, useState } from "react";
import type { Editor, JSONContent } from "@tiptap/react";

export function useEditorJson(editor: Editor | null) {
  const [json, setJson] = useState<JSONContent | null>(null);

  useEffect(() => {
    if (!editor) return;

    setJson(editor.getJSON());

    editor.on("update", () => {
      setJson(editor.getJSON());
    });

    return () => {
      editor.off("update");
    };
  }, [editor]);

  return json;
}
