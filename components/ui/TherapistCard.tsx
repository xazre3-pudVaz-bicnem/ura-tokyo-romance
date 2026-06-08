import Link from 'next/link';
import Image from 'next/image';
import { clsx } from 'clsx';
import { Star, Heart, ShieldCheck } from 'lucide-react';
import type { Therapist } from '@/data/dummy-therapists';
import FavoriteButton from './FavoriteButton';
import CompareButton from './CompareButton';

interface TherapistCardProps {
  therapist: Therapist;
  rank?: number;
  badge?: string;
  className?: string;
  showActions?: boolean;
}

export default function TherapistCard({
  therapist,
  rank,
  badge,
  className,
  showActions = true,
}: TherapistCardProps) {
  const minPrice = therapist.plans.length > 0 ? Math.min(...therapist.plans.map((p) => p.price)) : 0;

  return (
    <div className={clsx('relative group', className)}>
      <Link href={`/therapists/${therapist.slug}`} className="block">
        <div className="card-luxury overflow-hidden">
          {/* Image area */}
          <div className="relative aspect-[3/4] overflow-hidden">
            {therapist.image ? (
              <Image
                src={therapist.image}
                alt={therapist.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            ) : (
              <div className="img-placeholder w-full h-full flex-col gap-2">
                <span className="text-3xl font-display text-stone/40">{therapist.name[0]}</span>
                <span className="text-[10px] text-stone/40 tracking-widest">PHOTO</span>
              </div>
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-base/80 via-transparent to-transparent" />

            {/* Rank badge */}
            {rank && (
              <div className="absolute top-3 left-3 bg-gold text-base text-[10px] font-sans font-medium px-2.5 py-1 tracking-widest">
                No.{rank}
              </div>
            )}

            {/* Custom badge */}
            {!rank && badge && (
              <div className="absolute top-3 left-3 bg-wine text-cream text-[10px] font-sans tracking-widest px-2.5 py-1">
                {badge}
              </div>
            )}

            {/* New badge */}
            {therapist.isNew && !badge && !rank && (
              <div className="absolute top-3 left-3 border border-gold text-gold text-[10px] tracking-widest px-2.5 py-1">
                NEW
              </div>
            )}

            {/* Today available */}
            {therapist.availableToday && (
              <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
                <div className="flex items-center gap-1 bg-wine/90 backdrop-blur-sm px-2 py-0.5 rounded-full">
                  <span className="text-[9px] text-cream tracking-wide">今日会える</span>
                </div>
              </div>
            )}

            {/* Badges row when no availableToday */}
            {!therapist.availableToday && (
              <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
                {therapist.verifiedId && (
                  <div className="flex items-center gap-1 bg-base/80 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    <ShieldCheck size={10} className="text-gold" />
                    <span className="text-[9px] text-gold tracking-wide">本人確認済</span>
                  </div>
                )}
                {therapist.consultAvailable && (
                  <div className="flex items-center gap-1 bg-stone/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    <span className="text-[9px] text-cream tracking-wide">即日相談可</span>
                  </div>
                )}
              </div>
            )}

            {/* Name on image */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="font-display text-xl text-cream tracking-wider">{therapist.name}</p>
              <p className="text-stone text-xs mt-0.5">{therapist.age}歳 / {therapist.height}cm</p>
            </div>
          </div>

          {/* Card body */}
          <div className="p-4">
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {therapist.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="tag-pill">{tag}</span>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-1">
                <Star size={11} className="text-gold fill-gold" />
                <span className="text-stone text-[11px]">{therapist.reviewCount}件</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart size={11} className="text-wine" />
                <span className="text-stone text-[11px]">{therapist.favoriteCount}</span>
              </div>
            </div>

            {/* Price */}
            {minPrice > 0 && (
              <p className="text-gold text-xs mb-3">
                <span className="text-stone text-[10px] mr-1">60分〜</span>
                ¥{minPrice.toLocaleString()}
              </p>
            )}

            {/* CTA */}
            <div className="mt-2 flex items-center gap-2">
              <span className="text-gold text-[10px] tracking-widest group-hover:tracking-[0.2em] transition-all duration-300">
                プロフィールを見る
              </span>
              <span className="text-gold text-xs transition-transform duration-300 group-hover:translate-x-1">→</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Action buttons overlay */}
      {showActions && (
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {!rank && !badge && !therapist.isNew && (
            <div />
          )}
        </div>
      )}
      {showActions && (
        <div className="absolute bottom-[calc(3.5rem+0.75rem)] right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <CompareButton slug={therapist.slug} name={therapist.name} size="sm" />
          <FavoriteButton slug={therapist.slug} name={therapist.name} size="sm" />
        </div>
      )}
    </div>
  );
}
