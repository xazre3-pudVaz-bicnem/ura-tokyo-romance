'use client';

import { useEffect } from 'react';
import { addToHistory } from '@/lib/history';

export default function HistoryTracker({ slug, name }: { slug: string; name: string }) {
  useEffect(() => {
    addToHistory(slug, name);
  }, [slug, name]);

  return null;
}
