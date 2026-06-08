'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, Trash2, ExternalLink } from 'lucide-react';
import { dummyTherapists } from '@/data/dummy-therapists';

const initialFavorites = dummyTherapists.filter((t) => t.isFeatured);

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(initialFavorites);

  const remove = (id: number) => setFavorites((prev) => prev.filter((t) => t.id !== id));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-cream">お気に入り</h1>
          <p className="text-mist text-xs mt-1">{favorites.length}件のセラピストが登録されています</p>
        </div>
        <Link href="/therapists" className="btn-secondary text-xs px-4 py-2">セラピストを探す</Link>
      </div>

      {favorites.length > 0 ? (
        <div className="space-y-3">
          {favorites.map((t) => (
            <div key={t.id} className="card-luxury flex items-center gap-4 px-5 py-4">
              {t.image && (
                <Link href={`/therapists/${t.slug}`}>
                  <img src={t.image} alt={t.name} className="w-12 h-16 object-cover object-top flex-shrink-0 hover:opacity-80 transition-opacity" />
                </Link>
              )}
              <div className="flex-1 min-w-0">
                <Link href={`/therapists/${t.slug}`} className="text-cream text-sm hover:text-gold transition-colors">{t.name}</Link>
                <p className="text-mist text-[10px] mt-0.5">{t.areas.slice(0, 3).join('・')}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {t.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="tag-pill text-[10px]">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link href={`/therapists/${t.slug}`} className="p-2 text-mist hover:text-cream transition-colors">
                  <ExternalLink size={14} />
                </Link>
                <button
                  onClick={() => remove(t.id)}
                  className="p-2 text-mist hover:text-wine transition-colors"
                  aria-label="お気に入りから削除"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card-luxury p-12 text-center">
          <Heart size={32} className="text-border mx-auto mb-4" strokeWidth={1} />
          <p className="text-stone text-sm mb-2">お気に入りに登録したセラピストはいません</p>
          <p className="text-mist text-xs mb-6">気になるセラピストをハートボタンで保存できます</p>
          <Link href="/therapists" className="btn-primary text-xs px-6 py-2.5">セラピストを探す</Link>
        </div>
      )}
    </div>
  );
}
