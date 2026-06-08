const FAVORITES_KEY = 'utm-favorites';

export function getFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
  } catch {
    return [];
  }
}

export function isFavorited(slug: string): boolean {
  return getFavorites().includes(slug);
}

export function toggleFavorite(slug: string): boolean {
  const current = getFavorites();
  let next: string[];
  let added: boolean;
  if (current.includes(slug)) {
    next = current.filter((s) => s !== slug);
    added = false;
  } else {
    next = [...current, slug];
    added = true;
  }
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent('favoritesUpdate', { detail: { slug, added } }));
  return added;
}

export function clearFavorites(): void {
  localStorage.removeItem(FAVORITES_KEY);
  window.dispatchEvent(new CustomEvent('favoritesUpdate'));
}
