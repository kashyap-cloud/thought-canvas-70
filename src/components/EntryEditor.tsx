import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, X, Feather } from "lucide-react";
import type { JournalEntry } from "@/lib/journal";

interface EntryEditorProps {
  entry?: JournalEntry | null;
  onSave: (title: string, content: string) => void;
  onCancel: () => void;
}

export default function EntryEditor({ entry, onSave, onCancel }: EntryEditorProps) {
  const [title, setTitle] = useState(entry?.title ?? "");
  const [content, setContent] = useState(entry?.content ?? "");

  useEffect(() => {
    setTitle(entry?.title ?? "");
    setContent(entry?.content ?? "");
  }, [entry]);

  const handleSave = () => {
    if (!title.trim() && !content.trim()) return;
    onSave(title.trim() || "Untitled", content);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-lg p-6 md:p-10 shadow-[var(--shadow-journal)]"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Feather className="w-4 h-4" />
          <span className="text-sm font-body tracking-wide uppercase">
            {entry ? "Editing entry" : "New entry"}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="p-2 rounded-md text-muted-foreground hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground font-body font-medium text-sm hover:opacity-90 transition-opacity"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Give your thoughts a title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-transparent font-display text-2xl md:text-3xl font-semibold text-foreground placeholder:text-muted-foreground/50 outline-none mb-4 border-none"
        autoFocus
      />

      <div className="w-16 h-px bg-primary/30 mb-6" />

      <textarea
        placeholder="Pour your heart out..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full bg-transparent font-body text-base md:text-lg leading-relaxed text-foreground placeholder:text-muted-foreground/40 outline-none resize-none min-h-[300px] border-none"
      />
    </motion.div>
  );
}
