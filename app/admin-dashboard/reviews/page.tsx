'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, Star } from 'lucide-react';

interface Review {
  id: string;
  therapistName: string;
  therapistSlug: string;
  date: string;
  ratings: {
    safety: number;
    cleanliness: number;
    conversation: number;
    time: number;
    firstTime: number;
    overall: number;
  };
  comment: string;
  status: 'pending' | 'published' | 'rejected';
}

const CRITERIA_LABELS = {
  safety: '安心感',
  cleanliness: '清潔感',
  conversation: '会話',
  time: '時間の過ごしやすさ',
  firstTime: '初回向き',
  overall: '総合評価',
};

const dummyReviews: Review[] = [
  {
    id: 'rev-001',
    therapistName: '蓮',
    therapistSlug: 'ren',
    date: '2026-06-06T15:30:00',
    ratings: { safety: 5, cleanliness: 5, conversation: 4, time: 5, firstTime: 5, overall: 5 },
    comment: '初めての利用でとても緊張していましたが、穏やかに話を聞いてくださり、リラックスできました。また利用したいと思います。',
    status: 'pending',
  },
  {
    id: 'rev-002',
    therapistName: '蒼',
    therapistSlug: 'ao',
    date: '2026-06-05T18:00:00',
    ratings: { safety: 4, cleanliness: 5, conversation: 5, time: 4, firstTime: 4, overall: 4 },
    comment: '会話がとても楽しかったです。気を遣ってくださる方で、安心して過ごせました。',
    status: 'pending',
  },
  {
    id: 'rev-003',
    therapistName: '玲央',
    therapistSlug: 'reo',
    date: '2026-06-04T14:00:00',
    ratings: { safety: 5, cleanliness: 5, conversation: 4, time: 5, firstTime: 3, overall: 5 },
    comment: '大人な雰囲気で、一緒にいるだけで癒されました。また予約したいです。',
    status: 'published',
  },
];

function StarRating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={10} className={i <= value ? 'text-gold fill-gold' : 'text-mist'} />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(dummyReviews);
  const [filter, setFilter] = useState<'all' | 'pending' | 'published' | 'rejected'>('pending');

  const approve = (id: string) =>
    setReviews((prev) => prev.map((r) => r.id === id ? { ...r, status: 'published' as const } : r));
  const reject = (id: string) =>
    setReviews((prev) => prev.map((r) => r.id === id ? { ...r, status: 'rejected' as const } : r));

  const filtered = reviews.filter((r) => filter === 'all' || r.status === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-cream">口コミ管理</h1>
          <p className="text-mist text-xs mt-1">利用者からの口コミを審査・公開</p>
        </div>
        <span className="text-amber-400 text-xs">{reviews.filter(r => r.status === 'pending').length}件 審査待ち</span>
      </div>

      <div className="bg-gold/10 border border-gold/30 p-4 mb-5">
        <p className="text-gold text-[10px] tracking-widest mb-1">口コミ機能について</p>
        <p className="text-stone text-xs">口コミ機能はグランドオープン（2026年8月1日）後に提供開始します。現在は管理者のみプレビューできます。</p>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-5">
        {(['all', 'pending', 'published', 'rejected'] as const).map((s) => {
          const labels = { all: 'すべて', pending: '審査待ち', published: '公開中', rejected: '非掲載' };
          const count = s === 'all' ? reviews.length : reviews.filter(r => r.status === s).length;
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`text-[10px] px-3 py-1.5 border transition-all ${
                filter === s ? 'border-gold/50 text-gold bg-gold/5' : 'border-border text-mist hover:text-stone'
              }`}
            >
              {labels[s]} ({count})
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        {filtered.map((review) => (
          <div key={review.id} className="bg-surface border border-border p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gold text-sm">{review.therapistName}</p>
                <p className="text-mist text-[10px]">
                  {new Date(review.date).toLocaleString('ja-JP', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <span className={`text-[10px] border px-2 py-0.5 ${
                review.status === 'pending' ? 'border-amber-400/30 bg-amber-400/10 text-amber-400' :
                review.status === 'published' ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-400' :
                'border-wine/30 bg-wine/10 text-wine'
              }`}>
                {review.status === 'pending' ? '審査待ち' : review.status === 'published' ? '公開中' : '非掲載'}
              </span>
            </div>

            {/* 6 criteria ratings */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
              {(Object.entries(CRITERIA_LABELS) as [keyof typeof CRITERIA_LABELS, string][]).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-mist text-[10px]">{label}</span>
                  <StarRating value={review.ratings[key]} />
                </div>
              ))}
            </div>

            <p className="text-stone text-xs leading-relaxed border-l-2 border-border pl-3 mb-4">
              {review.comment}
            </p>

            {review.status === 'pending' && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => approve(review.id)}
                  className="flex items-center gap-1.5 text-emerald-400 text-xs border border-emerald-400/30 px-4 py-1.5 hover:bg-emerald-400/10 transition-colors"
                >
                  <CheckCircle size={12} />
                  承認・公開
                </button>
                <button
                  onClick={() => reject(review.id)}
                  className="flex items-center gap-1.5 text-wine text-xs border border-wine/30 px-4 py-1.5 hover:bg-wine/10 transition-colors"
                >
                  <XCircle size={12} />
                  非掲載
                </button>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="bg-surface border border-border p-10 text-center">
            <p className="text-stone text-sm">該当する口コミはありません</p>
          </div>
        )}
      </div>
    </div>
  );
}
