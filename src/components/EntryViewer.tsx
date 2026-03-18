import { motion } from "framer-motion";
import { Pencil, X, Trash2 } from "lucide-react";
import { formatEntryDate, type JournalEntry } from "@/lib/journal";

interface EntryViewerProps {
  entry: JournalEntry;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export default function EntryViewer({ entry, onEdit, onDelete, onClose }: EntryViewerProps) {
  const { day, date } = formatEntryDate(entry.createdAt);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-lg p-6 md:p-10 shadow-[var(--shadow-journal)]"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col">
          <span className="text-xs font-body font-medium tracking-widest uppercase text-primary/80">
            {day}
          </span>
          <span className="text-xs font-body text-muted-foreground mt-0.5">
            {date}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onDelete}
            className="p-2 rounded-md text-muted-foreground hover:text-destructive transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground font-body font-medium text-sm hover:opacity-90 transition-opacity"
          >
            <Pencil className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-muted-foreground hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
        {entry.title}
      </h2>

      <div className="w-16 h-px bg-primary/30 mb-6" />

      <p className="font-body text-base md:text-lg leading-relaxed text-foreground whitespace-pre-wrap">
        {entry.content || "No content"}
      </p>
    </motion.div>
  );
}
