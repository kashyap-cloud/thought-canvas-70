import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import { formatEntryDate, type JournalEntry } from "@/lib/journal";

interface EntryCardProps {
  entry: JournalEntry;
  onEdit: (entry: JournalEntry) => void;
  onDelete: (id: string) => void;
  index: number;
}

export default function EntryCard({ entry, onEdit, onDelete, index }: EntryCardProps) {
  const { day, date } = formatEntryDate(entry.createdAt);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="group bg-card rounded-lg p-5 md:p-6 shadow-[var(--shadow-entry)] hover:shadow-[var(--shadow-journal)] transition-shadow duration-300 cursor-pointer"
      onClick={() => onEdit(entry)}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex flex-col">
          <span className="text-xs font-body font-medium tracking-widest uppercase text-primary/80">
            {day}
          </span>
          <span className="text-xs font-body text-muted-foreground mt-0.5">
            {date}
          </span>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(entry); }}
            className="p-1.5 rounded text-muted-foreground hover:text-primary transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(entry.id); }}
            className="p-1.5 rounded text-muted-foreground hover:text-destructive transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <h3 className="font-display text-lg font-semibold text-foreground mb-2 line-clamp-1">
        {entry.title}
      </h3>

      <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-3">
        {entry.content || "No content"}
      </p>
    </motion.div>
  );
}
