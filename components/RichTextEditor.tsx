"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import Strike from "@tiptap/extension-strike";
import {
  FaBold,
  FaItalic,
  FaListOl,
  FaListUl,
  FaUnderline,
  FaLink,
  FaCode,
  FaStrikethrough,
  FaQuoteRight,
  FaUnlink,
} from "react-icons/fa";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEditorState } from "@tiptap/react";
import type { IconType } from "react-icons";
import type { Level } from "@tiptap/extension-heading";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { RiCodeBlock } from "react-icons/ri";
import { Separator } from "./ui/separator";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

interface ToolbarButtonProps {
  onClick: () => boolean | undefined | void;
  isActive: boolean | undefined;
  icon: IconType;
  label: string;
  className?: string;
}

function ToolbarButton({
  onClick,
  isActive,
  icon: Icon,
  label,
  className = "",
}: ToolbarButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={isActive ? "outline" : "ghost"}
          size="icon"
          onClick={onClick}
          type="button"
          className={className}
        >
          <Icon />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top">{label}</TooltipContent>
    </Tooltip>
  );
}

interface RichTextEditorProps {
  value?: string;
  onChange?: (content: string) => void;
}

export default function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: true,
        linkOnPaste: true,
      }),
      CodeBlock,
      Code,
      Strike,
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none min-h-[250px] border-input focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 w-full rounded-md border bg-transparent px-3 py-2 shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    immediatelyRender: false,
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
  });

  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isBold: editor?.isActive("bold"),
      isItalic: editor?.isActive("italic"),
      isUnderline: editor?.isActive("underline"),
      isBlockquote: editor?.isActive("blockquote"),
      isBulletList: editor?.isActive("bulletList"),
      isOrderedList: editor?.isActive("orderedList"),
      isCode: editor?.isActive("code"),
      isStrike: editor?.isActive("strike"),
      isCodeBlock: editor?.isActive("codeBlock"),
      isLink: editor?.isActive("link"),
      headingLevel:
        [1, 2, 3, 4, 5, 6].find((lvl) =>
          editor?.isActive("heading", { level: lvl })
        ) || 0,
    }),
  });

  if (!editor) return null;

  const handleOpenLinkDialog = () => {
    const previousUrl = editor.getAttributes("link").href || "";
    const { from, to } = editor.state.selection;
    const text = editor.state.doc.textBetween(from, to, "");

    setLinkUrl(previousUrl);
    setLinkText(text);
    setIsLinkDialogOpen(true);
  };

  const handleSetLink = () => {
    if (!linkUrl) {
      editor.chain().focus().unsetLink().run();
      setIsLinkDialogOpen(false);
      return;
    }

    const url = linkUrl.startsWith("http") ? linkUrl : `https://${linkUrl}`;

    if (linkText && !editor.state.selection.empty) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } else if (linkText) {
      editor
        .chain()
        .focus()
        .insertContent(`<a href="${url}">${linkText}</a>`)
        .run();
    } else {
      editor.chain().focus().setLink({ href: url }).run();
    }

    setIsLinkDialogOpen(false);
    setLinkUrl("");
    setLinkText("");
  };

  const handleRemoveLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex items-center gap-1 sm:gap-2 border-b pb-2 mb-2 flex-wrap">
        {/* Heading selector */}
        <Select
          value={editorState?.headingLevel.toString()}
          onValueChange={(value) => {
            const level = Number(value) as Level;
            if (level.toString() === "0")
              editor.chain().focus().setParagraph().run();
            else editor.chain().focus().toggleHeading({ level }).run();
          }}
        >
          <SelectTrigger type="button" className="w-[60px] h-9">
            <SelectValue>
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

        {/* Primary formatting buttons - always visible */}
        <div className="flex items-center gap-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editorState?.isBold}
            icon={FaBold}
            label="Bold"
            className="h-9 w-9"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editorState?.isItalic}
            icon={FaItalic}
            label="Italic"
            className="h-9 w-9"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editorState?.isUnderline}
            icon={FaUnderline}
            label="Underline"
            className="h-9 w-9"
          />
        </div>

        <Separator orientation="vertical" className="h-6 hidden sm:block" />

        {/* List buttons - visible on tablet and up */}
        <div className="hidden sm:flex items-center gap-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editorState?.isBulletList}
            icon={FaListUl}
            label="Bullet List"
            className="h-9 w-9"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editorState?.isOrderedList}
            icon={FaListOl}
            label="Ordered List"
            className="h-9 w-9"
          />
        </div>

        <Separator orientation="vertical" className="h-6 hidden md:block" />

        {/* Additional formatting - visible on desktop */}
        <div className="hidden md:flex items-center gap-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editorState?.isBlockquote}
            icon={FaQuoteRight}
            label="Blockquote"
            className="h-9 w-9"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editorState?.isStrike}
            icon={FaStrikethrough}
            label="Strike"
            className="h-9 w-9"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            isActive={editorState?.isCode}
            icon={FaCode}
            label="Inline Code"
            className="h-9 w-9"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            isActive={editorState?.isCodeBlock}
            icon={RiCodeBlock}
            label="Code Block"
            className="h-9 w-9"
          />
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Link button - always visible */}
        <div className="flex items-center gap-1">
          <ToolbarButton
            onClick={handleOpenLinkDialog}
            isActive={editorState?.isLink}
            icon={FaLink}
            label="Add Link"
            className="h-9 w-9"
          />
          {editorState?.isLink && (
            <ToolbarButton
              onClick={handleRemoveLink}
              isActive={false}
              icon={FaUnlink}
              label="Remove Link"
              className="h-9 w-9"
            />
          )}
        </div>

        {/* More options dropdown for mobile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 md:hidden ml-auto"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="sm:hidden"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <FaListUl className="mr-2 h-4 w-4" />
              Bullet List
            </DropdownMenuItem>
            <DropdownMenuItem
              className="sm:hidden"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <FaListOl className="mr-2 h-4 w-4" />
              Ordered List
            </DropdownMenuItem>
            <DropdownMenuItem
              className="md:hidden"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
              <FaQuoteRight className="mr-2 h-4 w-4" />
              Blockquote
            </DropdownMenuItem>
            <DropdownMenuItem
              className="md:hidden"
              onClick={() => editor.chain().focus().toggleStrike().run()}
            >
              <FaStrikethrough className="mr-2 h-4 w-4" />
              Strikethrough
            </DropdownMenuItem>
            <DropdownMenuItem
              className="md:hidden"
              onClick={() => editor.chain().focus().toggleCode().run()}
            >
              <FaCode className="mr-2 h-4 w-4" />
              Inline Code
            </DropdownMenuItem>
            <DropdownMenuItem
              className="md:hidden"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            >
              <RiCodeBlock className="mr-2 h-4 w-4" />
              Code Block
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <EditorContent editor={editor} className="tiptap break-all" />

      {/* Link Dialog */}
      <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Link</DialogTitle>
            <DialogDescription>
              Enter the URL and optional text for your link
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="link-url">URL</Label>
              <Input
                id="link-url"
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSetLink();
                  }
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="link-text">Link Text (optional)</Label>
              <Input
                id="link-text"
                placeholder="Click here"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSetLink();
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsLinkDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleSetLink}>
              Add Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}