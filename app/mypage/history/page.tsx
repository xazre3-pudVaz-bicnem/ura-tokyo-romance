'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Clock, Trash2, X } from 'lucide-react';
import { dummyTherapists } from '@/data/dummy-therapists';

const viewedAt = ['2時間前', '昨日', '昨日', '3日前', '4日前', '1週間前'];
const initialHistory = dummyTherapists.slice(0, 6).map((t, i) => ({
  ...t,
  viewedAt: viewedAt[i] ?? '1週間前',
}));

export default function HistoryPage() {
  const [history, setHistory] = useState(initialHistory);

  const remove = (id: number) => setHistory((prev) => prev.filter((t) => t.id !== id));
  const clearAll = () => setHistory([]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-cream">閲覧履歴</h1>
          <p className="text-mist text-xs mt-1">{history.length}件の履歴があります</p>
        </div>
        {history.length > 0 && (
          <button onClick={clearAll} className="flex items-center gap-1.5 text-mist text-xs hover:text-wine transition-colors">
            <Trash2 size={12} />
            すべて削除
          </button>
        )}
      </div>

      {history.length > 0 ? (
        <div className="space-y-3">
          {history.map((t) => (
            <div key={t.id} className="card-luxury flex items-center gap-4 px-5 py-4">
              {t.image && (
                <Link href={`/therapists/${t.slug}`}>
                  <img src={t.image} alt={t.name} className="w-12 h-16 object-cover object-top flex-shrink-0 hover:opacity-80 transition-opacity" />
                </Link>
              )}
              <div className="flex-1 min-w-0">
                <Link href={`/therapists/${t.slug}`} className="text-cream text-sm hover:text-gold transition-colors">{t.name}</Link>
                <p className="text-mist text-[10px] mt-0.5">{t.areas.slice(0, 3).join('・')}</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <Clock size={10} className="text-mist" />
                  <span className="text-mist text-[10px]">{t.viewedAt}に閲覧</span>
                </div>
              </div>
              <button
                onClick={() => remove(t.id)}
                className="p-2 text-mist hover:text-wine transition-colors flex-shrink-0"
                aria-label="履歴から削除"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="card-luxury p-12 text-center">
          <Clock size={32} className="text-border mx-auto mb-4" strokeWidth={1} />
          <p className="text-stone text-sm mb-2">閲覧履歴はありません</p>
          <p className="text-mist text-xs mb-6">セラピストのプロフィールを見ると履歴に記録されます</p>
          <Link href="/therapists" className="btn-primary text-xs px-6 py-2.5">セラピストを探す</Link>
        </div>
      )}
    </div>
  );
}
