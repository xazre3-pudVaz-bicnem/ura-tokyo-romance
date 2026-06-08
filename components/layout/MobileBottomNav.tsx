'use client';

import Link from 'next/link';
import { Search, Calendar, Sparkles, UserPlus } from 'lucide-react';

const items = [
  { href: '/therapists', icon: Search, label: '探す', primary: true },
  { href: '/today', icon: Calendar, label: '今日会える', primary: false },
  { href: '/diagnosis', icon: Sparkles, label: '診断', primary: false },
  { href: '/register', icon: UserPlus, label: '登録', primary: false },
];

export default function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-base/95 backdrop-blur-xl border-t border-border safe-area-bottom">
      <div className="grid grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <span
                className={`flex flex-col items-center justify-center py-2.5 gap-1 text-center transition-colors duration-200 ${
                  item.primary ? 'text-gold' : 'text-stone hover:text-cream'
                }`}
              >
                <Icon size={18} strokeWidth={1.5} />
                <span className="text-[9px] tracking-wider leading-none">{item.label}</span>
              </span>
            </Link>
          );
        })}
      </div>
      <div style={{ height: 'env(safe-area-inset-bottom)' }} />
    </nav>
  );
}
