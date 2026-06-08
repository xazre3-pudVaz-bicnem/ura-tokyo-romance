import Link from 'next/link';
import { clsx } from 'clsx';
import { MapPin, ShieldCheck } from 'lucide-react';
import type { Therapist } from '@/data/dummy-therapists';
import { AUTH_LEVEL_LABELS, AUTH_LEVEL_COLORS } from '@/data/dummy-therapists';
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
  const areas = therapist.areas.slice(0, 2).join('・');

  return (
    <div className={clsx('relative group flex flex-col', className)}>
      {/* ── Photo ── */}
      <Link href={`/therapists/${therapist.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-elevated">
          {therapist.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={therapist.image}
              alt={therapist.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="img-placeholder w-full h-full flex-col gap-2">
              <span className="text-3xl font-display text-stone/40">{therapist.name[0]}</span>
              <span className="text-[10px] text-stone/40 tracking-widest">PHOTO</span>
            </div>
          )}

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-base/90 via-base/10 to-transparent" />

          {/* Top-left: Rank / badge / NEW */}
          {rank && (
            <div className="absolute top-3 left-3 bg-gold text-base text-[10px] font-sans font-medium px-2.5 py-1 tracking-widest">
              No.{rank}
            </div>
          )}
          {!rank && badge && (
            <div className="absolute top-3 left-3 bg-wine text-cream text-[10px] tracking-widest px-2.5 py-1">
              {badge}
            </div>
          )}
          {!rank && !badge && therapist.isNew && (
            <div className="absolute top-3 left-3 border border-gold text-gold text-[10px] tracking-widest px-2.5 py-1">
              NEW
            </div>
          )}

          {/* Top-right: 今日会える / 本人確認 */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
            {therapist.availableToday && (
              <div className="flex items-center gap-1 bg-emerald-600/90 backdrop-blur-sm px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse flex-shrink-0" />
                <span className="text-[9px] text-white tracking-wide">今日会える</span>
              </div>
            )}
            {therapist.verifiedId && (
              <div className="flex items-center gap-1 bg-base/80 backdrop-blur-sm px-2 py-0.5 rounded-full">
                <ShieldCheck size={9} className="text-gold" />
                <span className="text-[9px] text-gold tracking-wide">本人確認済</span>
              </div>
            )}
          </div>

          {/* Bottom: Name + basic info */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <p className="font-display text-xl text-cream tracking-wider leading-tight">{therapist.name}</p>
            <p className="text-stone/80 text-[11px] mt-0.5">{therapist.age}歳 / {therapist.height}cm</p>
            {areas && (
              <div className="flex items-center gap-1 mt-1">
                <MapPin size={9} className="text-gold/60 flex-shrink-0" />
                <span className="text-stone/60 text-[10px] truncate">{areas}</span>
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* ── Card Body ── */}
      <div className="flex-1 flex flex-col bg-surface border border-t-0 border-border p-3.5">
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-2.5">
          {therapist.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag-pill">{tag}</span>
          ))}
        </div>

        {/* Auth level */}
        {therapist.authLevel >= 1 && (
          <div className="mb-2.5">
            <span className={`text-[9px] tracking-widest ${AUTH_LEVEL_COLORS[therapist.authLevel]}`}>
              ✓ {AUTH_LEVEL_LABELS[therapist.authLevel]}
            </span>
          </div>
        )}

        {/* Price */}
        {minPrice > 0 && (
          <p className="text-xs mb-3">
            <span className="text-stone/70 text-[10px] mr-1">60分〜</span>
            <span className="text-gold">¥{minPrice.toLocaleString()}</span>
          </p>
        )}

        <div className="flex-1" />

        {/* Action area */}
        {showActions && (
          <div className="space-y-2 mt-2">
            {/* Compare / Favorite icons */}
            <div className="flex items-center gap-1.5">
              <CompareButton slug={therapist.slug} name={therapist.name} size="sm" />
              <FavoriteButton slug={therapist.slug} name={therapist.name} size="sm" />
            </div>
            {/* Primary CTAs */}
            <div className="grid grid-cols-2 gap-1.5">
              <Link
                href={`/therapists/${therapist.slug}#availability`}
                className="flex items-center justify-center text-[10px] tracking-wide py-2 border border-border text-stone hover:border-gold/50 hover:text-cream transition-all duration-200"
              >
                空き状況を見る
              </Link>
              <Link
                href={`/therapists/${therapist.slug}`}
                className="flex items-center justify-center text-[10px] tracking-wide py-2 bg-wine/80 text-cream hover:bg-wine transition-all duration-200"
              >
                相談する
              </Link>
            </div>
          </div>
        )}
        {!showActions && (
          <Link
            href={`/therapists/${therapist.slug}`}
            className="mt-2 flex items-center gap-1 text-gold text-[10px] tracking-widest group-hover:tracking-[0.2em] transition-all duration-300"
          >
            プロフィールを見る
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        )}
      </div>
    </div>
  );
}
