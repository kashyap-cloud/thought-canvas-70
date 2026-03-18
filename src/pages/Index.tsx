import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, BookOpen, Search } from "lucide-react";
import { getEntries, saveEntries, createEntry, type JournalEntry } from "@/lib/journal";
import EntryEditor from "@/components/EntryEditor";
import EntryViewer from "@/components/EntryViewer";
import EntryCard from "@/components/EntryCard";

export default function Index() {
  const [entries, setEntries] = useState<JournalEntry[]>(getEntries);
  const [editing, setEditing] = useState<JournalEntry | null>(null);
  const [viewing, setViewing] = useState<JournalEntry | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return entries
      .filter((e) => e.title.toLowerCase().includes(q) || e.content.toLowerCase().includes(q))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [entries, search]);

  const persist = (next: JournalEntry[]) => {
    setEntries(next);
    saveEntries(next);
  };

  const handleNew = () => {
    setEditing(null);
    setViewing(null);
    setIsNew(true);
  };

  const handleSave = (title: string, content: string) => {
    if (isNew) {
      const entry = createEntry(title, content);
      persist([entry, ...entries]);
    } else if (editing) {
      persist(
        entries.map((e) =>
          e.id === editing.id
            ? { ...e, title, content, updatedAt: new Date().toISOString() }
            : e
        )
      );
    }
    setEditing(null);
    setViewing(null);
    setIsNew(false);
  };

  const handleDelete = (id: string) => {
    persist(entries.filter((e) => e.id !== id));
  };

  const showEditor = isNew || editing;
  const showViewer = viewing && !showEditor;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/60">
        <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 flex items-end justify-between">
          <div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2.5 mb-1"
            >
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="font-body text-xs tracking-[0.25em] uppercase text-muted-foreground">
                Personal Journal
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-3xl md:text-4xl font-bold text-foreground italic"
            >
              My Thoughts
            </motion.h1>
          </div>

          {!showEditor && !showViewer && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={handleNew}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-body font-medium text-sm hover:opacity-90 transition-opacity shadow-md"
            >
              <Plus className="w-4 h-4" />
              Write
            </motion.button>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        <AnimatePresence mode="wait">
          {showEditor ? (
            <EntryEditor
              key="editor"
              entry={editing}
              onSave={handleSave}
              onCancel={() => { setEditing(null); setIsNew(false); }}
            />
          ) : showViewer ? (
            <EntryViewer
              key="viewer"
              entry={viewing}
              onEdit={() => { setEditing(viewing); setViewing(null); }}
              onDelete={() => { handleDelete(viewing.id); setViewing(null); }}
              onClose={() => setViewing(null)}
            />
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {entries.length > 0 && (
                <div className="relative mb-8">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search your entries..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-card border border-border font-body text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-1 focus:ring-primary/30 transition-shadow"
                  />
                </div>
              )}

              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <BookOpen className="w-12 h-12 text-muted-foreground/30 mb-4" />
                  <p className="font-display text-xl text-muted-foreground/60 italic mb-2">
                    {entries.length === 0 ? "Your journal awaits" : "No entries found"}
                  </p>
                  <p className="font-body text-sm text-muted-foreground/40">
                    {entries.length === 0
                      ? "Start writing to capture your thoughts"
                      : "Try a different search term"}
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {filtered.map((entry, i) => (
                    <EntryCard
                      key={entry.id}
                      entry={entry}
                      index={i}
                      onEdit={(e) => setViewing(e)}
                      onDelete={handleDelete}
                    />
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
