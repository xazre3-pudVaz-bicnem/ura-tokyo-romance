'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BarChart2, X, ShieldCheck, Star, Heart, Check, ArrowLeft } from 'lucide-react';
import { getCompareList, removeFromCompare, clearCompare } from '@/lib/compare';
import { dummyTherapists, BADGE_LABELS } from '@/data/dummy-therapists';
import type { Therapist } from '@/data/dummy-therapists';

export default function ComparePage() {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    setSlugs(getCompareList());
    const handler = (e: Event) => {
      const custom = e as CustomEvent;
      setSlugs(custom.detail?.list ?? getCompareList());
    };
    window.addEventListener('compareUpdate', handler);
    return () => window.removeEventListener('compareUpdate', handler);
  }, []);

  const therapists = slugs
    .map((slug) => dummyTherapists.find((t) => t.slug === slug))
    .filter(Boolean) as Therapist[];

  const rows: { label: string; key: keyof Therapist | 'minPrice' | 'badgeList' }[] = [
    { label: '年齢', key: 'age' },
    { label: '身長', key: 'height' },
    { label: '活動エリア', key: 'areas' },
    { label: '最低料金（60分〜）', key: 'minPrice' },
    { label: 'お気に入り数', key: 'favoriteCount' },
    { label: '口コミ数', key: 'reviewCount' },
    { label: '評価', key: 'rating' },
    { label: '本人確認', key: 'verifiedId' },
    { label: '即日相談', key: 'consultAvailable' },
    { label: '今日会える', key: 'availableToday' },
    { label: 'バッジ', key: 'badgeList' },
    { label: '出勤日', key: 'scheduleNote' },
  ];

  function getValue(t: Therapist, key: keyof Therapist | 'minPrice' | 'badgeList'): React.ReactNode {
    if (key === 'minPrice') {
      const min = Math.min(...t.plans.map((p) => p.price));
      return <span className="text-gold font-display text-lg">¥{min.toLocaleString()}</span>;
    }
    if (key === 'badgeList') {
      return (
        <div className="flex flex-col gap-1">
          {t.badges.map((b) => (
            <span key={b} className="text-[10px] text-gold border border-gold/30 px-2 py-0.5 inline-flex items-center gap-1">
              <Check size={9} />
              {BADGE_LABELS[b] ?? b}
            </span>
          ))}
        </div>
      );
    }
    if (key === 'verifiedId' || key === 'consultAvailable' || key === 'availableToday') {
      const val = t[key] as boolean;
      return val ? (
        <span className="text-gold flex items-center gap-1"><Check size={14} /> あり</span>
      ) : (
        <span className="text-mist">—</span>
      );
    }
    if (key === 'areas') {
      return <span className="text-stone text-xs">{(t.areas as string[]).join(' / ')}</span>;
    }
    if (key === 'age') return <span>{t.age}歳</span>;
    if (key === 'height') return <span>{t.height}cm</span>;
    if (key === 'rating') return <span className="flex items-center gap-1"><Star size={12} className="text-gold fill-gold" />{t.rating}</span>;
    const val = t[key as keyof Therapist];
    return <span>{String(val ?? '—')}</span>;
  }

  if (therapists.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-5">
        <div className="max-w-2xl mx-auto text-center">
          <BarChart2 size={48} className="text-mist mx-auto mb-6" strokeWidth={1} />
          <h1 className="font-display text-3xl text-cream mb-4">比較リストが空です</h1>
          <p className="text-stone mb-8">セラピスト一覧で「比較に追加」ボタンを押してセラピストを追加してください。最大3名まで同時に比較できます。</p>
          <Link href="/therapists" className="btn-primary">セラピストを探す</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/therapists" className="flex items-center gap-2 text-stone text-xs hover:text-cream transition-colors mb-4">
              <ArrowLeft size={14} />
              セラピスト一覧に戻る
            </Link>
            <h1 className="font-display text-3xl text-cream">セラピスト比較</h1>
            <p className="text-stone text-sm mt-1">{therapists.length}名のセラピストを比較中</p>
          </div>
          <button
            onClick={() => clearCompare()}
            className="btn-secondary text-xs py-2"
          >
            比較リストをクリア
          </button>
        </div>

        {/* Therapist header row */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="w-32 p-4 text-left text-mist text-xs tracking-widest border-b border-border" />
                {therapists.map((t) => (
                  <th key={t.slug} className="p-4 border-b border-border">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-20 h-28 bg-elevated border border-border flex items-center justify-center">
                        <span className="text-2xl font-display text-stone/40">{t.name[0]}</span>
                      </div>
                      <Link
                        href={`/therapists/${t.slug}`}
                        className="font-display text-lg text-cream hover:text-gold transition-colors"
                      >
                        {t.name}
                      </Link>
                      <p className="text-stone text-xs">{t.age}歳 / {t.height}cm</p>
                      {t.verifiedId && (
                        <div className="flex items-center gap-1">
                          <ShieldCheck size={11} className="text-gold" />
                          <span className="text-gold text-[10px]">本人確認済</span>
                        </div>
                      )}
                      <button
                        onClick={() => removeFromCompare(t.slug)}
                        className="text-mist text-xs hover:text-wine transition-colors flex items-center gap-1 mt-1"
                      >
                        <X size={12} />
                        削除
                      </button>
                    </div>
                  </th>
                ))}
                {therapists.length < 3 && (
                  <th className="p-4 border-b border-border">
                    <div className="flex flex-col items-center justify-center h-full gap-2 opacity-40">
                      <div className="w-20 h-28 bg-elevated border border-dashed border-border flex items-center justify-center">
                        <span className="text-mist text-xs">+</span>
                      </div>
                      <Link href="/therapists" className="text-xs text-gold hover:underline">追加する</Link>
                    </div>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {rows.map(({ label, key }) => (
                <tr key={label} className="border-b border-border/50">
                  <td className="p-4 text-stone text-xs tracking-widest whitespace-nowrap">{label}</td>
                  {therapists.map((t) => (
                    <td key={t.slug} className="p-4 text-center text-cream text-sm">
                      {getValue(t, key)}
                    </td>
                  ))}
                  {therapists.length < 3 && <td />}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tags comparison */}
        <div className="mt-8 card-luxury p-6">
          <p className="text-gold text-xs tracking-widest mb-4">タグ比較</p>
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${therapists.length}, 1fr)` }}>
            {therapists.map((t) => (
              <div key={t.slug}>
                <p className="text-stone text-xs mb-2">{t.name}</p>
                <div className="flex flex-wrap gap-1.5">
                  {t.tags.map((tag) => (
                    <span key={tag} className="tag-pill text-[10px]">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-stone text-sm mb-4">気になるセラピストに相談してみましょう</p>
          <div className="flex flex-wrap justify-center gap-3">
            {therapists.map((t) => (
              <Link
                key={t.slug}
                href={`/therapists/${t.slug}/consult`}
                className="btn-primary text-sm py-3"
              >
                {t.name}に相談する
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
