const COMPARE_KEY = 'utm-compare';
export const MAX_COMPARE = 3;

export function getCompareList(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(COMPARE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function isInCompare(slug: string): boolean {
  return getCompareList().includes(slug);
}

export function addToCompare(slug: string): { success: boolean; reason?: string } {
  const current = getCompareList();
  if (current.includes(slug)) return { success: false, reason: 'already_added' };
  if (current.length >= MAX_COMPARE) return { success: false, reason: 'max_reached' };
  const next = [...current, slug];
  localStorage.setItem(COMPARE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent('compareUpdate', { detail: { list: next } }));
  return { success: true };
}

export function removeFromCompare(slug: string): void {
  const next = getCompareList().filter((s) => s !== slug);
  localStorage.setItem(COMPARE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent('compareUpdate', { detail: { list: next } }));
}

export function clearCompare(): void {
  localStorage.removeItem(COMPARE_KEY);
  window.dispatchEvent(new CustomEvent('compareUpdate', { detail: { list: [] } }));
}

export function toggleCompare(slug: string): { added: boolean; reason?: string } {
  if (isInCompare(slug)) {
    removeFromCompare(slug);
    return { added: false };
  }
  const result = addToCompare(slug);
  return { added: result.success, reason: result.reason };
}
