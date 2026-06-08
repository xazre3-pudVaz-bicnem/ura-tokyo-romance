'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, UserPlus, MapPin, ChevronDown, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

const areaOptions = [
  { value: '', label: 'エリアを選ぶ' },
  { value: '渋谷・代官山', label: '渋谷・代官山・中目黒' },
  { value: '新宿', label: '新宿・歌舞伎町・大久保' },
  { value: '池袋', label: '池袋・高田馬場' },
  { value: '銀座', label: '銀座・日本橋・新橋' },
  { value: '六本木', label: '六本木・赤坂・麻布十番' },
  { value: '恵比寿', label: '恵比寿・目黒・五反田' },
  { value: '表参道', label: '表参道・青山・原宿' },
  { value: '品川', label: '品川・大崎・天王洲' },
  { value: '上野', label: '上野・秋葉原・浅草' },
  { value: '吉祥寺', label: '吉祥寺・中野・荻窪' },
];

const ageOptions = [
  { value: '', label: '年齢' },
  { value: '20s', label: '20代' },
  { value: '30s', label: '30代' },
  { value: '40s', label: '40代以上' },
];

const moodOptions = [
  { value: '', label: '雰囲気' },
  { value: 'gentle', label: '穏やか・癒し系' },
  { value: 'cool', label: 'クール・知的' },
  { value: 'playful', label: '明るい・楽しい' },
  { value: 'mature', label: '大人・落ち着き' },
];

const quickAreas = ['渋谷', '新宿', '銀座', '六本木', '恵比寿', '表参道'];

type DropdownKey = 'area' | 'age' | 'mood' | null;

export default function Hero() {
  const router = useRouter();
  const heroRef = useRef<HTMLElement>(null);

  const [area, setArea] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [mood, setMood] = useState('');
  const [todayOnly, setTodayOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);

  const toggleDropdown = useCallback((key: DropdownKey) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  }, []);

  // Close all dropdowns on outside click
  useEffect(() => {
    const close = () => setOpenDropdown(null);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (area) params.set('area', area);
    if (todayOnly) params.set('today', '1');
    if (verifiedOnly) params.set('verified', '1');
    if (ageGroup) params.set('age', ageGroup);
    if (mood) params.set('mood', mood);
    router.push(`/therapists${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col overflow-hidden bg-base"
    >
      {/* ── Background Image ── */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-therapists-bg.png"
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover hero-photo"
        />

        {/* Overlay 1: Base dark veil */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Overlay 2: Left-side gradient — text readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(108deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.65) 38%, rgba(0,0,0,0.28) 62%, rgba(0,0,0,0.10) 100%)',
          }}
        />

        {/* Overlay 3: Bottom gradient — blends into next section */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.8) 10%, rgba(8,8,8,0.3) 32%, transparent 52%)',
          }}
        />

        {/* Overlay 4: Top gradient — header legibility */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(8,8,8,0.55) 0%, transparent 22%)',
          }}
        />

        {/* Overlay 5: Wine red glow — brand atmosphere */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 12% 78%, rgba(139,26,26,0.25) 0%, transparent 60%)',
          }}
        />

        {/* Overlay 6: Gold shimmer — luxury warmth */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 40% 30% at 72% 18%, rgba(201,160,96,0.08) 0%, transparent 55%)',
          }}
        />
      </div>

      {/* ── Hero Content ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center w-full max-w-6xl mx-auto px-5 sm:px-8 md:px-12 pt-32 pb-28">
        <div className="max-w-[560px]">

          {/* Grand Open label */}
          <div
            className="inline-flex items-center gap-3 mb-7 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.15s' }}
          >
            <span className="block w-7 h-px bg-gold/55" />
            <span className="text-gold text-[10px] tracking-[0.38em] uppercase font-sans">
              2026年8月1日 Grand Open
            </span>
            <span className="block w-7 h-px bg-gold/55" />
          </div>

          {/* Site name */}
          <h1
            className="font-display text-[clamp(2.8rem,7.5vw,5rem)] text-cream leading-[1.06] tracking-[0.05em] mb-4 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.32s' }}
          >
            裏東京ロマンス
          </h1>

          {/* Tagline */}
          <p
            className="font-sans text-[clamp(0.82rem,1.6vw,0.97rem)] text-stone/90 tracking-[0.1em] leading-relaxed mb-2 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.52s' }}
          >
            東京の女風セラピストを探す・比較する・相談する。
          </p>
          <p
            className="font-sans text-[clamp(0.72rem,1.3vw,0.82rem)] text-stone/50 tracking-[0.06em] leading-relaxed mb-10 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.58s' }}
          >
            本人確認済みの掲載セラピストを、あなたのペースで選ぼう。
          </p>

          {/* ── Search Card ── */}
          <div
            className="opacity-0 animate-fade-up"
            style={{ animationDelay: '0.70s' }}
          >
            <div
              className="border border-white/[0.12] p-5 md:p-6 mb-3.5 shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
              style={{
                background: 'rgba(8,8,8,0.72)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              {/* Row 1: エリア | 年齢 | 雰囲気 */}
              <div className="flex flex-col sm:flex-row gap-2 mb-3">

                {/* エリア dropdown */}
                <div
                  className="relative flex-1"
                  onClick={(e) => { e.stopPropagation(); toggleDropdown('area'); }}
                >
                  <MapPin
                    size={12}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gold pointer-events-none z-10"
                    strokeWidth={1.8}
                  />
                  <button
                    type="button"
                    className="w-full bg-white/[0.04] border border-white/[0.12] text-xs pl-7.5 pr-7 py-3 text-left focus:outline-none focus:border-gold/50 transition-colors hover:border-white/20 flex items-center"
                    style={{ paddingLeft: '1.875rem' }}
                  >
                    <span className={area ? 'text-cream' : 'text-stone/65'}>
                      {areaOptions.find((o) => o.value === area)?.label ?? 'エリアを選ぶ'}
                    </span>
                  </button>
                  <ChevronDown
                    size={11}
                    className={`absolute right-2.5 top-1/2 -translate-y-1/2 text-stone/45 pointer-events-none transition-transform duration-200 ${openDropdown === 'area' ? 'rotate-180' : ''}`}
                  />
                  {openDropdown === 'area' && (
                    <div
                      className="absolute top-full left-0 right-0 z-50 border border-gold/20 shadow-2xl mt-0.5 max-h-64 overflow-y-auto"
                      style={{ background: 'rgba(14,13,13,0.98)', backdropFilter: 'blur(20px)' }}
                    >
                      {areaOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setArea(opt.value); setOpenDropdown(null); }}
                          className={`w-full text-left px-4 py-2.5 text-xs transition-colors hover:bg-white/[0.05] ${
                            area === opt.value ? 'text-gold' : opt.value === '' ? 'text-stone/55' : 'text-cream/90'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* 年齢 dropdown */}
                <div
                  className="relative sm:w-[130px]"
                  onClick={(e) => { e.stopPropagation(); toggleDropdown('age'); }}
                >
                  <button
                    type="button"
                    className="w-full bg-white/[0.04] border border-white/[0.12] text-xs px-3 py-3 text-left focus:outline-none focus:border-gold/50 transition-colors hover:border-white/20 flex items-center justify-between"
                  >
                    <span className={ageGroup ? 'text-cream' : 'text-stone/65'}>
                      {ageOptions.find((o) => o.value === ageGroup)?.label ?? '年齢'}
                    </span>
                    <ChevronDown
                      size={11}
                      className={`text-stone/45 flex-shrink-0 ml-1 transition-transform duration-200 ${openDropdown === 'age' ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openDropdown === 'age' && (
                    <div
                      className="absolute top-full left-0 right-0 z-50 border border-gold/20 shadow-2xl mt-0.5"
                      style={{ background: 'rgba(14,13,13,0.98)', backdropFilter: 'blur(20px)' }}
                    >
                      {ageOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setAgeGroup(opt.value); setOpenDropdown(null); }}
                          className={`w-full text-left px-3 py-2.5 text-xs transition-colors hover:bg-white/[0.05] ${
                            ageGroup === opt.value ? 'text-gold' : opt.value === '' ? 'text-stone/55' : 'text-cream/90'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* 雰囲気 dropdown */}
                <div
                  className="relative sm:w-[148px]"
                  onClick={(e) => { e.stopPropagation(); toggleDropdown('mood'); }}
                >
                  <button
                    type="button"
                    className="w-full bg-white/[0.04] border border-white/[0.12] text-xs px-3 py-3 text-left focus:outline-none focus:border-gold/50 transition-colors hover:border-white/20 flex items-center justify-between"
                  >
                    <span className={mood ? 'text-cream' : 'text-stone/65'}>
                      {moodOptions.find((o) => o.value === mood)?.label ?? '雰囲気'}
                    </span>
                    <ChevronDown
                      size={11}
                      className={`text-stone/45 flex-shrink-0 ml-1 transition-transform duration-200 ${openDropdown === 'mood' ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openDropdown === 'mood' && (
                    <div
                      className="absolute top-full left-0 right-0 z-50 border border-gold/20 shadow-2xl mt-0.5"
                      style={{ background: 'rgba(14,13,13,0.98)', backdropFilter: 'blur(20px)' }}
                    >
                      {moodOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setMood(opt.value); setOpenDropdown(null); }}
                          className={`w-full text-left px-3 py-2.5 text-xs transition-colors hover:bg-white/[0.05] ${
                            mood === opt.value ? 'text-gold' : opt.value === '' ? 'text-stone/55' : 'text-cream/90'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Row 2: Toggles + Search button */}
              <div className="flex flex-wrap items-center gap-2">
                {/* 今日会える toggle */}
                <button
                  type="button"
                  onClick={() => setTodayOnly(!todayOnly)}
                  className={`flex items-center gap-1.5 text-[11px] tracking-wide px-3.5 py-2 border transition-all duration-200 ${
                    todayOnly
                      ? 'border-gold/70 bg-gold/10 text-gold'
                      : 'border-white/[0.14] text-stone/65 hover:border-white/25 hover:text-cream/80'
                  }`}
                >
                  <Clock size={11} strokeWidth={1.6} />
                  今日会える
                </button>

                {/* 本人確認済み toggle */}
                <button
                  type="button"
                  onClick={() => setVerifiedOnly(!verifiedOnly)}
                  className={`flex items-center gap-1.5 text-[11px] tracking-wide px-3.5 py-2 border transition-all duration-200 ${
                    verifiedOnly
                      ? 'border-gold/70 bg-gold/10 text-gold'
                      : 'border-white/[0.14] text-stone/65 hover:border-white/25 hover:text-cream/80'
                  }`}
                >
                  <ShieldCheck size={11} strokeWidth={1.6} />
                  本人確認済み
                </button>

                <div className="flex-1" />

                {/* Search button */}
                <button
                  onClick={handleSearch}
                  className="flex items-center gap-2 bg-gold text-base font-sans text-xs font-medium tracking-[0.16em] px-7 py-2.5 hover:bg-gold-light active:bg-gold-dark transition-colors whitespace-nowrap"
                >
                  <Search size={13} strokeWidth={2.2} />
                  セラピストを探す
                </button>
              </div>
            </div>

            {/* Quick area links */}
            <div className="flex flex-wrap items-center gap-1.5 mb-8">
              <span className="text-white/35 text-[10px] tracking-wider mr-0.5">人気：</span>
              {quickAreas.map((a) => (
                <Link
                  key={a}
                  href={`/therapists?area=${encodeURIComponent(a)}`}
                  className="text-[11px] text-white/45 border border-white/[0.10] px-2.5 py-0.5 hover:border-gold/40 hover:text-cream/75 transition-all duration-200"
                >
                  {a}
                </Link>
              ))}
              <Link
                href="/area"
                className="text-[11px] text-gold/50 hover:text-gold/80 transition-colors ml-1"
              >
                全エリア →
              </Link>
            </div>
          </div>

          {/* ── Secondary CTAs ── */}
          <div
            className="flex flex-col xs:flex-row items-start gap-3 mb-10 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.90s' }}
          >
            <Link
              href="/today"
              className="btn-secondary text-xs py-[11px] px-7 flex items-center gap-2 whitespace-nowrap"
            >
              <Clock size={13} strokeWidth={1.5} />
              今日会えるセラピストを見る
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 text-gold/75 text-xs tracking-widest hover:text-gold transition-all duration-200 group py-[11px]"
            >
              <UserPlus size={13} strokeWidth={1.5} />
              セラピストとして登録する
              <ArrowRight
                size={12}
                strokeWidth={1.5}
                className="opacity-50 group-hover:opacity-90 group-hover:translate-x-0.5 transition-all"
              />
            </Link>
          </div>

          {/* Trust badges */}
          <div
            className="flex flex-wrap items-center gap-x-5 gap-y-1.5 opacity-0 animate-fade-in"
            style={{ animationDelay: '1.10s' }}
          >
            {[
              '本人確認済セラピストのみ掲載',
              '18歳未満利用禁止',
              '運営審査あり',
              'サポート窓口完備',
            ].map((badge) => (
              <div key={badge} className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-gold/45 flex-shrink-0" />
                <span className="text-white/42 text-[10px] tracking-wide" style={{ color: 'rgba(255,255,255,0.42)' }}>
                  {badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-25 pointer-events-none">
        <span className="text-[9px] text-stone/60 tracking-[0.32em]">SCROLL</span>
        <div className="w-px h-10 bg-gradient-to-b from-stone/50 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
