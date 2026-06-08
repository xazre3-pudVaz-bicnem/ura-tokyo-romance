'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search, UserPlus } from 'lucide-react';
import { clsx } from 'clsx';

const navLinks = [
  { href: '/first', label: '初めての方へ' },
  { href: '/therapists', label: 'セラピストを探す' },
  { href: '/schedule', label: '本日の出勤' },
  { href: '/area', label: 'エリア検索' },
  { href: '/ranking', label: 'ランキング' },
  { href: '/blog', label: 'コラム' },
  { href: '/safety', label: '安心安全' },
];

const mobileNavLinks = [
  ...navLinks,
  { href: '/price', label: '料金目安' },
  { href: '/reviews', label: '口コミ' },
  { href: '/faq', label: 'よくある質問' },
  { href: '/contact', label: 'お問い合わせ' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-base/95 backdrop-blur-md border-b border-border py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-xl tracking-[0.15em] text-cream hover:text-gold transition-colors duration-300"
            onClick={() => setMenuOpen(false)}
          >
            裏東京ロマンス
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-stone hover:text-cream text-xs tracking-widest transition-colors duration-300 underline-gold"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3 ml-4">
            <Link href="/therapists" className="flex items-center gap-1.5 text-stone hover:text-cream text-xs tracking-wider transition-colors duration-300">
              <Search size={13} />
              探す
            </Link>
            <Link
              href="/register"
              className="btn-primary text-xs py-2.5 px-5 flex items-center gap-1.5"
            >
              <UserPlus size={13} />
              セラピスト登録
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-cream"
            aria-label="メニュー"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={clsx(
          'fixed inset-0 z-40 bg-base/98 backdrop-blur-xl flex flex-col transition-all duration-500',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="pt-24 px-8 flex flex-col gap-1 overflow-y-auto pb-32">
          <span className="gold-line mb-8" />
          {mobileNavLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-4 text-cream text-xl font-display tracking-wider border-b border-border/50 flex items-center justify-between group"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {link.label}
              <span className="text-gold text-sm opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </Link>
          ))}
          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/therapists"
              onClick={() => setMenuOpen(false)}
              className="btn-primary w-full justify-center py-4 flex items-center gap-2"
            >
              <Search size={16} />
              セラピストを探す
            </Link>
            <Link
              href="/register"
              onClick={() => setMenuOpen(false)}
              className="btn-secondary w-full justify-center py-4 flex items-center gap-2"
            >
              <UserPlus size={16} />
              セラピスト登録はこちら
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
