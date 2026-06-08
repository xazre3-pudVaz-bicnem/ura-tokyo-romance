'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Trash2 } from 'lucide-react';
import TherapistCard from '@/components/ui/TherapistCard';
import SectionTitle from '@/components/ui/SectionTitle';
import { getFavorites, clearFavorites } from '@/lib/favorites';
import { dummyTherapists } from '@/data/dummy-therapists';
import type { Therapist } from '@/data/dummy-therapists';

export default function FavoritesPage() {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSlugs(getFavorites());
    const handler = () => setSlugs(getFavorites());
    window.addEventListener('favoritesUpdate', handler);
    return () => window.removeEventListener('favoritesUpdate', handler);
  }, []);

  const favorites = slugs
    .map((slug) => dummyTherapists.find((t) => t.slug === slug))
    .filter(Boolean) as Therapist[];

  const recommended = dummyTherapists
    .filter((t) => t.isFeatured)
    .slice(0, 4);

  if (!mounted) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-elevated w-48" />
            <div className="h-4 bg-elevated w-32" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-5">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-gold text-[10px] tracking-[0.3em] mb-2">Favorites</p>
            <h1 className="font-display text-4xl text-cream">お気に入り</h1>
            {favorites.length > 0 && (
              <p className="text-stone text-sm mt-1">{favorites.length}名のセラピスト</p>
            )}
          </div>
          {favorites.length > 0 && (
            <button
              onClick={() => clearFavorites()}
              className="flex items-center gap-2 text-mist text-xs hover:text-wine transition-colors"
            >
              <Trash2 size={13} />
              すべて削除
            </button>
          )}
        </div>

        {favorites.length === 0 ? (
          /* Empty state */
          <div className="text-center py-20 mb-16">
            <Heart size={48} className="text-mist mx-auto mb-6" strokeWidth={1} />
            <h2 className="font-display text-2xl text-cream mb-3">お気に入りがありません</h2>
            <p className="text-stone text-sm mb-8 leading-relaxed">
              セラピストのプロフィールにある<br />
              ハートボタンでお気に入りに追加できます。
            </p>
            <Link href="/therapists" className="btn-primary">セラピストを探す</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {favorites.map((t) => (
              <TherapistCard key={t.id} therapist={t} />
            ))}
          </div>
        )}

        {/* Recommended */}
        <div className="border-t border-border pt-12">
          <SectionTitle
            en="Recommended"
            ja="こちらもおすすめ"
            description="本人確認済みの人気セラピストです。"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {recommended.map((t) => (
              <TherapistCard key={t.id} therapist={t} />
            ))}
          </div>
          <div className="text-center">
            <Link href="/therapists" className="btn-secondary">全セラピストを見る</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
