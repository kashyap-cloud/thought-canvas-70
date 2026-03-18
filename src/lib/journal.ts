export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  createdAt: string; // ISO string
  updatedAt: string;
}

const STORAGE_KEY = 'journal-entries';

export function getEntries(): JournalEntry[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveEntries(entries: JournalEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function createEntry(title: string, content: string): JournalEntry {
  const now = new Date().toISOString();
  return { id: crypto.randomUUID(), title, content, createdAt: now, updatedAt: now };
}

export function formatEntryDate(iso: string) {
  const d = new Date(iso);
  const day = d.toLocaleDateString('en-US', { weekday: 'long' });
  const date = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  return { day, date };
}
