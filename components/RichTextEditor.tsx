"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import {
  FaBold,
  FaItalic,
  FaListOl,
  FaListUl,
  FaUnderline,
} from "react-icons/fa";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { IconType } from "react-icons";
import { useEditorState } from "@tiptap/react"; // ✅ hook tiptap v2.6+
import type { Level } from "@tiptap/extension-heading";

interface ToolbarButtonProps {
  onClick: () => boolean;
  isActive: boolean | undefined;
  icon: IconType;
  label: string;
}

function ToolbarButton({
  onClick,
  isActive,
  icon: Icon,
  label,
}: ToolbarButtonProps) {
  return (
    <Button
      variant={isActive ? "outline" : "ghost"}
      size="icon"
      title={label}
      onClick={onClick}
      type="button"
    >
      <Icon />
    </Button>
  );
}

interface RichTextEditorProps {
  value?: string;
  onChange?: (content: string) => void; // 👈 callback
}

export default function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none min-h-[250px] border-input focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 w-full rounded-md border bg-transparent px-3 py-2 shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    immediatelyRender: false,
    onUpdate({ editor }) {
      const html = editor.getHTML();
      onChange?.(html);
    },
  });

  // ✅ track only what you need
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isBold: editor?.isActive("bold"),
      isItalic: editor?.isActive("italic"),
      isUnderline: editor?.isActive("underline"),
      isBulletList: editor?.isActive("bulletList"),
      isOrderedList: editor?.isActive("orderedList"),
      headingLevel:
        [1, 2, 3, 4, 5, 6].find((lvl) =>
          editor?.isActive("heading", { level: lvl })
        ) || 0,
    }),
  });

  if (!editor) return null;

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex items-center gap-2 border-b pb-2 mb-2">
        <Select
         
          value={editorState?.headingLevel.toString()}
          onValueChange={(value) => {
            const level = Number(value) as Level;
            console.log(level);
            if (level.toString() === "0") {
              editor.chain().focus().setParagraph().run();
            } else {
              editor.chain().focus().toggleHeading({ level }).run();
            }
          }}
        >
          <SelectTrigger type="button" className="w-[60px]">
            <SelectValue >
              {editorState?.headingLevel === 0
                ? "P"
                : `H${editorState?.headingLevel}`}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Paragraph</SelectItem>
            {[1, 2, 3, 4, 5, 6].map((level) => (
              <SelectItem key={level} value={level.toString()}>
                H{level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Buttons */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editorState?.isBold}
          icon={FaBold}
          label="Bold"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editorState?.isItalic}
          icon={FaItalic}
          label="Italic"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editorState?.isUnderline}
          icon={FaUnderline}
          label="Underline"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editorState?.isBulletList}
          icon={FaListUl}
          label="Bullet List"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editorState?.isOrderedList}
          icon={FaListOl}
          label="Ordered List"
        />
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className="tiptap" />
    </div>
  );
}
