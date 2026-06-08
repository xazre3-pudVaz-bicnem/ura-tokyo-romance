'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { getHistory } from '@/lib/history';
import type { HistoryItem } from '@/lib/history';
import { dummyTherapists } from '@/data/dummy-therapists';
import type { Therapist } from '@/data/dummy-therapists';

export default function RecentlyViewedSection() {
  const [items, setItems] = useState<{ item: HistoryItem; therapist: Therapist }[]>([]);

  useEffect(() => {
    const history = getHistory();
    const withTherapist = history
      .map((item) => ({
        item,
        therapist: dummyTherapists.find((t) => t.slug === item.slug),
      }))
      .filter((x): x is { item: HistoryItem; therapist: Therapist } => !!x.therapist)
      .slice(0, 5);
    setItems(withTherapist);

    const handler = () => {
      const h = getHistory();
      const wt = h
        .map((i) => ({ item: i, therapist: dummyTherapists.find((t) => t.slug === i.slug) }))
        .filter((x): x is { item: HistoryItem; therapist: Therapist } => !!x.therapist)
        .slice(0, 5);
      setItems(wt);
    };
    window.addEventListener('historyUpdate', handler);
    return () => window.removeEventListener('historyUpdate', handler);
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="section-py px-5 bg-surface">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-gold" strokeWidth={1.5} />
            <p className="text-cream text-sm">最近見たセラピスト</p>
          </div>
          <Link href="/history" className="text-gold text-xs hover:underline flex items-center gap-1">
            履歴を見る <ArrowRight size={11} />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {items.map(({ item, therapist }) => (
            <Link
              key={item.slug}
              href={`/therapists/${therapist.slug}`}
              className="flex-shrink-0 card-luxury p-3 w-28 text-center group"
            >
              <div className="w-full aspect-[3/4] bg-elevated border border-border flex items-center justify-center mb-2">
                <span className="text-xl font-display text-stone/40">{therapist.name[0]}</span>
              </div>
              <p className="text-cream text-xs truncate">{therapist.name}</p>
              <p className="text-mist text-[10px]">{therapist.age}歳</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
