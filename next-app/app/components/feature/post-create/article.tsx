"use client";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
export default function Article() {
  const editor = useCreateBlockNote()
  return (
    <>
      <BlockNoteView editor={editor} />
    </>
  );
}