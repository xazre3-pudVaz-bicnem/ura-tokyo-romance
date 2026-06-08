'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, BarChart2 } from 'lucide-react';
import { getCompareList, removeFromCompare } from '@/lib/compare';
import { dummyTherapists } from '@/data/dummy-therapists';

export default function CompareBar() {
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    setList(getCompareList());
    const handler = (e: Event) => {
      const custom = e as CustomEvent;
      setList(custom.detail?.list ?? getCompareList());
    };
    window.addEventListener('compareUpdate', handler);
    return () => window.removeEventListener('compareUpdate', handler);
  }, []);

  if (list.length === 0) return null;

  const therapists = list
    .map((slug) => dummyTherapists.find((t) => t.slug === slug))
    .filter(Boolean);

  return (
    <div className="fixed bottom-16 lg:bottom-0 left-0 right-0 z-40 bg-base/98 backdrop-blur-xl border-t border-gold/30 shadow-lg shadow-black/40">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2 text-gold flex-shrink-0">
          <BarChart2 size={15} strokeWidth={1.5} />
          <span className="text-xs tracking-widest">比較中</span>
        </div>

        <div className="flex items-center gap-2 flex-1 overflow-x-auto">
          {therapists.map((t) => t && (
            <div
              key={t.slug}
              className="flex items-center gap-2 bg-elevated border border-border px-3 py-1.5 flex-shrink-0"
            >
              <span className="text-cream text-xs">{t.name}</span>
              <button
                onClick={() => removeFromCompare(t.slug)}
                className="text-mist hover:text-cream transition-colors"
                aria-label={`${t.name}を比較から削除`}
              >
                <X size={12} />
              </button>
            </div>
          ))}
          {list.length < 3 && (
            <div className="flex items-center gap-1 border border-dashed border-border/50 px-3 py-1.5 flex-shrink-0">
              <span className="text-mist text-xs">{3 - list.length}名追加可能</span>
            </div>
          )}
        </div>

        <Link
          href="/compare"
          className="btn-primary text-xs py-2 px-4 flex-shrink-0 whitespace-nowrap"
        >
          比較する
        </Link>
      </div>
    </div>
  );
}
