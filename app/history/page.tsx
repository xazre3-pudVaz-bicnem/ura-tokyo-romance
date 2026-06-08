'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, Trash2, ArrowRight } from 'lucide-react';
import TherapistCard from '@/components/ui/TherapistCard';
import { getHistory, clearHistory } from '@/lib/history';
import type { HistoryItem } from '@/lib/history';
import { dummyTherapists } from '@/data/dummy-therapists';
import type { Therapist } from '@/data/dummy-therapists';

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'たった今';
  if (mins < 60) return `${mins}分前`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}時間前`;
  return `${Math.floor(hours / 24)}日前`;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setHistory(getHistory());
    const handler = () => setHistory(getHistory());
    window.addEventListener('historyUpdate', handler);
    return () => window.removeEventListener('historyUpdate', handler);
  }, []);

  const withTherapist = history
    .map((item) => ({
      item,
      therapist: dummyTherapists.find((t) => t.slug === item.slug) as Therapist | undefined,
    }))
    .filter((x) => x.therapist);

  if (!mounted) return null;

  return (
    <div className="min-h-screen pt-32 pb-20 px-5">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-gold text-[10px] tracking-[0.3em] mb-2">History</p>
            <h1 className="font-display text-4xl text-cream">閲覧履歴</h1>
            {history.length > 0 && (
              <p className="text-stone text-sm mt-1">最近見た{history.length}名のセラピスト</p>
            )}
          </div>
          {history.length > 0 && (
            <button
              onClick={() => clearHistory()}
              className="flex items-center gap-2 text-mist text-xs hover:text-wine transition-colors"
            >
              <Trash2 size={13} />
              履歴を削除
            </button>
          )}
        </div>

        {withTherapist.length === 0 ? (
          <div className="text-center py-20">
            <Clock size={48} className="text-mist mx-auto mb-6" strokeWidth={1} />
            <h2 className="font-display text-2xl text-cream mb-3">閲覧履歴がありません</h2>
            <p className="text-stone text-sm mb-8">
              セラピストのプロフィールを見ると、ここに履歴が表示されます。
            </p>
            <Link href="/therapists" className="btn-primary">セラピストを探す</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {withTherapist.map(({ item, therapist }) => therapist && (
              <div key={item.slug} className="card-luxury p-4 flex items-center gap-4">
                {/* Mini thumbnail */}
                <div className="w-16 h-20 bg-elevated border border-border flex-shrink-0 flex items-center justify-center">
                  <span className="text-xl font-display text-stone/40">{therapist.name[0]}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-display text-lg text-cream">{therapist.name}</p>
                  <p className="text-stone text-xs">{therapist.age}歳 / {therapist.height}cm</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {therapist.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="tag-pill text-[10px]">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <div className="flex items-center gap-1 text-mist">
                    <Clock size={11} />
                    <span className="text-[10px]">{timeAgo(item.viewedAt)}</span>
                  </div>
                  <Link
                    href={`/therapists/${therapist.slug}`}
                    className="flex items-center gap-1 text-gold text-xs hover:text-gold-light transition-colors"
                  >
                    見る <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/therapists" className="btn-secondary">セラピスト一覧へ</Link>
        </div>
      </div>
    </div>
  );
}
