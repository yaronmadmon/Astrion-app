export type HistoryItem = {
  id: string;
  prompt: string;
  createdAt: string;
};

export const STORAGE_KEY = "astrion.history.v1";
export const HISTORY_EVENT = "astrion:history";

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function readHistory(): HistoryItem[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(Boolean) as HistoryItem[];
  } catch {
    return [];
  }
}

export function writeHistory(items: HistoryItem[]): void {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  // Notify same-tab listeners.
  window.dispatchEvent(new Event(HISTORY_EVENT));
}

export function addHistoryItem(item: HistoryItem, maxItems = 50): HistoryItem[] {
  const current = readHistory();
  const next = [item, ...current].slice(0, maxItems);
  writeHistory(next);
  return next;
}

