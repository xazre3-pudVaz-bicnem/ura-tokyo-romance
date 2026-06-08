'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { Search, UserPlus, HelpCircle } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      el.style.setProperty('--parallax-x', `${x}px`);
      el.style.setProperty('--parallax-y', `${y}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-base"
      style={{ '--parallax-x': '0px', '--parallax-y': '0px' } as React.CSSProperties}
    >
      {/* Background layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-base via-[#0D0808] to-base" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(139,26,26,0.08) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(201,160,96,0.5) 40px, rgba(201,160,96,0.5) 41px)',
          }}
        />
      </div>

      {/* Decorative circles */}
      <div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full border border-gold/5 -translate-x-1/2 -translate-y-1/2"
        style={{ transform: 'translate(calc(-50% + var(--parallax-x)), calc(-50% + var(--parallax-y)))' }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full border border-wine/10"
        style={{ transform: 'translate(calc(50% + var(--parallax-x)), calc(50% + var(--parallax-y)))' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-5 max-w-5xl mx-auto">
        {/* Grand Open badge */}
        <div
          className="inline-flex items-center gap-3 mb-10 opacity-0 animate-fade-in"
          style={{ animationDelay: '0.2s' }}
        >
          <span className="block w-8 h-px bg-gold/60" />
          <span className="text-gold text-[10px] tracking-[0.4em] uppercase font-sans">
            2026年8月1日 Grand Open
          </span>
          <span className="block w-8 h-px bg-gold/60" />
        </div>

        {/* Main title */}
        <h1
          className="font-display text-[clamp(3rem,12vw,7rem)] text-cream leading-[1.05] tracking-[0.06em] mb-6 opacity-0 animate-fade-up"
          style={{ animationDelay: '0.4s' }}
        >
          裏東京ロマンス
        </h1>

        {/* Gold line */}
        <div
          className="mx-auto w-px h-16 bg-gradient-to-b from-transparent via-gold to-transparent mb-6 opacity-0 animate-fade-in"
          style={{ animationDelay: '0.7s' }}
        />

        {/* Subtitle */}
        <p
          className="font-display text-[clamp(1.1rem,3vw,1.6rem)] text-stone italic tracking-wider mb-3 opacity-0 animate-fade-up"
          style={{ animationDelay: '0.9s' }}
        >
          東京で、あなたに合う女風セラピストを探す。
        </p>
        <p
          className="text-stone text-sm leading-relaxed max-w-2xl mx-auto mb-3 opacity-0 animate-fade-in"
          style={{ animationDelay: '1.0s' }}
        >
          裏東京ロマンスは、女性用風俗・女風を利用したい女性と、<br className="hidden sm:block" />
          個人で活動したいセラピストをつなぐマッチングプラットフォームです。
        </p>
        <p
          className="text-mist text-xs tracking-widest mb-14 opacity-0 animate-fade-in"
          style={{ animationDelay: '1.1s' }}
        >
          東京 女風マッチング / 本人確認済セラピスト掲載
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up"
          style={{ animationDelay: '1.3s' }}
        >
          <Link href="/therapists" className="btn-primary w-full sm:w-auto min-w-[200px] flex items-center gap-2">
            <Search size={15} />
            セラピストを探す
          </Link>
          <Link href="/register" className="btn-secondary w-full sm:w-auto min-w-[200px] flex items-center gap-2">
            <UserPlus size={15} />
            セラピストとして登録する
          </Link>
          <Link href="/first" className="btn-secondary w-full sm:w-auto min-w-[200px] flex items-center gap-2">
            <HelpCircle size={15} />
            初めての方へ
          </Link>
        </div>

        {/* Trust badges */}
        <div
          className="mt-12 flex flex-wrap items-center justify-center gap-6 opacity-0 animate-fade-in"
          style={{ animationDelay: '1.6s' }}
        >
          {[
            '本人確認済セラピストのみ掲載',
            '18歳未満利用禁止',
            '運営審査あり',
            '通報・サポート窓口完備',
          ].map((badge) => (
            <div key={badge} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold/60" />
              <span className="text-stone text-[10px] tracking-wider">{badge}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-[9px] text-stone tracking-[0.3em]">SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-stone to-transparent animate-pulse" />
      </div>
    </section>
  );
}
