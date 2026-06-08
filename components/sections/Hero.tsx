'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Search, UserPlus, MapPin, ChevronDown, Clock } from 'lucide-react';

const areaOptions = [
  { value: '', label: 'エリアを選ぶ' },
  { value: '渋谷・代官山', label: '渋谷・代官山・中目黒' },
  { value: '新宿', label: '新宿・大久保' },
  { value: '池袋', label: '池袋・高田馬場' },
  { value: '銀座', label: '銀座・日本橋・新橋' },
  { value: '六本木', label: '六本木・赤坂・麻布' },
  { value: '恵比寿', label: '恵比寿・目黒・五反田' },
  { value: '表参道', label: '表参道・青山・原宿' },
  { value: '品川', label: '品川・大崎・天王洲' },
];

const quickAreas = ['渋谷', '新宿', '銀座', '池袋', '六本木', '恵比寿', '表参道'];

export default function Hero() {
  const router = useRouter();
  const heroRef = useRef<HTMLElement>(null);
  const [area, setArea] = useState('');
  const [todayOnly, setTodayOnly] = useState(false);
  const [consultOnly, setConsultOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 16;
      const y = (e.clientY / window.innerHeight - 0.5) * 16;
      el.style.setProperty('--parallax-x', `${x}px`);
      el.style.setProperty('--parallax-y', `${y}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (area) params.set('area', area);
    if (todayOnly) params.set('today', '1');
    if (consultOnly) params.set('consult', '1');
    if (verifiedOnly) params.set('verified', '1');
    router.push(`/therapists${params.toString() ? `?${params.toString()}` : ''}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-base pb-10"
      style={{ '--parallax-x': '0px', '--parallax-y': '0px' } as React.CSSProperties}
    >
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-base via-[#0C0808] to-base" />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 90% 60% at 50% 40%, rgba(139,26,26,0.09) 0%, transparent 70%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 48px, rgba(201,160,96,0.6) 48px, rgba(201,160,96,0.6) 49px)' }}
        />
        <div
          className="absolute top-1/3 left-1/4 w-[700px] h-[700px] rounded-full border border-gold/[0.04]"
          style={{ transform: 'translate(calc(-50% + var(--parallax-x)), calc(-50% + var(--parallax-y)))' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full border border-wine/[0.07]"
          style={{ transform: 'translate(calc(50% + var(--parallax-x)), calc(50% + var(--parallax-y)))' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-5 pt-28 text-center">

        {/* Grand Open badge */}
        <div className="inline-flex items-center gap-3 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <span className="block w-8 h-px bg-gold/50" />
          <span className="text-gold text-[10px] tracking-[0.4em] uppercase font-sans">2026年8月1日 Grand Open — 先行登録受付中</span>
          <span className="block w-8 h-px bg-gold/50" />
        </div>

        {/* Main title */}
        <h1
          className="font-display text-[clamp(2.8rem,10vw,6.5rem)] text-cream leading-[1.05] tracking-[0.05em] mb-5 opacity-0 animate-fade-up"
          style={{ animationDelay: '0.4s' }}
        >
          裏東京ロマンス
        </h1>

        {/* Subtitle */}
        <p
          className="font-sans text-[clamp(0.85rem,2vw,1.1rem)] text-stone tracking-[0.12em] mb-10 opacity-0 animate-fade-up"
          style={{ animationDelay: '0.65s' }}
        >
          東京の女風セラピストを、探す・比較する・相談する。
        </p>

        {/* ── Search Card ── */}
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: '0.85s' }}>
          <div className="bg-[#111010]/95 backdrop-blur-md border border-gold/20 p-5 md:p-7 mb-5 text-left shadow-2xl">

            {/* Row 1: エリア + 検索ボタン */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              {/* エリア custom dropdown */}
              <div className="relative flex-1">
                <MapPin size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold pointer-events-none z-10" />
                <button
                  type="button"
                  onClick={() => setShowDropdown(!showDropdown)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-base border border-border text-sm pl-9 pr-9 py-3.5 text-left focus:outline-none focus:border-gold transition-colors flex items-center"
                >
                  <span className={area ? 'text-cream' : 'text-stone'}>
                    {area || 'エリアを選ぶ'}
                  </span>
                </button>
                <ChevronDown
                  size={13}
                  className={`absolute right-3.5 top-1/2 -translate-y-1/2 text-stone transition-transform pointer-events-none ${showDropdown ? 'rotate-180' : ''}`}
                />
                {showDropdown && (
                  <div className="absolute top-full left-0 right-0 z-50 bg-elevated border border-gold/20 shadow-2xl mt-1">
                    {areaOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => { setArea(opt.value); setShowDropdown(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-surface ${
                          area === opt.value ? 'text-gold' : opt.value === '' ? 'text-stone' : 'text-cream'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search button */}
              <button
                onClick={handleSearch}
                className="flex items-center justify-center gap-2 bg-gold text-base font-sans text-sm font-medium tracking-[0.15em] px-8 py-3.5 hover:bg-gold/85 transition-colors whitespace-nowrap flex-shrink-0"
              >
                <Search size={15} strokeWidth={2} />
                セラピストを探す
              </button>
            </div>

            {/* Row 2: Quick filters */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-mist text-[10px] tracking-widest mr-1">条件：</span>
              {[
                { label: '今日会える', state: todayOnly, setState: setTodayOnly, icon: Clock },
                { label: '即日相談可', state: consultOnly, setState: setConsultOnly, icon: null },
                { label: '本人確認済み', state: verifiedOnly, setState: setVerifiedOnly, icon: null },
              ].map(({ label, state, setState }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setState(!state)}
                  className={`text-[11px] tracking-wide px-3.5 py-1.5 border transition-all duration-200 ${
                    state
                      ? 'border-gold bg-gold/10 text-gold'
                      : 'border-border/70 text-stone hover:border-gold/50 hover:text-cream'
                  }`}
                >
                  {state && <span className="mr-0.5">✓</span>}{label}
                </button>
              ))}
              <Link
                href="/search"
                className="text-[11px] tracking-wide px-3.5 py-1.5 border border-border/50 text-mist hover:border-gold/50 hover:text-stone transition-all duration-200 ml-auto"
              >
                詳細条件 →
              </Link>
            </div>
          </div>

          {/* Area quick links */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mb-8">
            <span className="text-mist text-[10px] tracking-wider mr-1">人気エリア：</span>
            {quickAreas.map((a) => (
              <Link
                key={a}
                href={`/therapists?area=${encodeURIComponent(a)}`}
                className="text-[11px] text-stone/70 border border-border/40 px-3 py-1 hover:border-gold/50 hover:text-cream transition-all duration-200"
              >
                {a}
              </Link>
            ))}
            <Link href="/area" className="text-[11px] text-gold/60 hover:text-gold transition-colors ml-1">
              全エリア →
            </Link>
          </div>
        </div>

        {/* Secondary CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 opacity-0 animate-fade-up"
          style={{ animationDelay: '1.05s' }}
        >
          <Link href="/schedule" className="btn-secondary text-sm py-3 px-8 flex items-center gap-2">
            <Clock size={14} />
            今日会えるセラピストを見る
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 text-gold text-sm tracking-widest hover:gap-3 transition-all duration-200 group"
          >
            <UserPlus size={14} strokeWidth={1.5} />
            セラピストとして登録する
            <span className="text-gold/40 group-hover:text-gold/70 transition-colors">›</span>
          </Link>
        </div>

        {/* Trust badges */}
        <div
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pb-6 opacity-0 animate-fade-in"
          style={{ animationDelay: '1.25s' }}
        >
          {[
            '本人確認済セラピストのみ掲載',
            '18歳未満利用禁止',
            '運営審査あり',
            '通報・サポート窓口完備',
          ].map((badge) => (
            <div key={badge} className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-gold/50" />
              <span className="text-stone/70 text-[10px] tracking-wide">{badge}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <span className="text-[9px] text-stone tracking-[0.3em]">SCROLL</span>
        <div className="w-px h-10 bg-gradient-to-b from-stone to-transparent animate-pulse" />
      </div>
    </section>
  );
}
