const HISTORY_KEY = 'utm-history';
const MAX_HISTORY = 10;

export interface HistoryItem {
  slug: string;
  name: string;
  viewedAt: number;
}

export function getHistory(): HistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
}

export function addToHistory(slug: string, name: string): void {
  const current = getHistory().filter((h) => h.slug !== slug);
  const next: HistoryItem[] = [{ slug, name, viewedAt: Date.now() }, ...current].slice(
    0,
    MAX_HISTORY
  );
  localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent('historyUpdate'));
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
  window.dispatchEvent(new CustomEvent('historyUpdate'));
}
