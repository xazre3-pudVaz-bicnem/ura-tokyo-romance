'use client';

import Link from 'next/link';
import { Search, Calendar, UserPlus, Shield, Home } from 'lucide-react';

const items = [
  {
    href: '/',
    icon: Home,
    label: 'ホーム',
    external: false,
    primary: false,
  },
  {
    href: '/therapists',
    icon: Search,
    label: '探す',
    external: false,
    primary: true,
  },
  {
    href: '/schedule',
    icon: Calendar,
    label: '本日の出勤',
    external: false,
    primary: false,
  },
  {
    href: '/safety',
    icon: Shield,
    label: '安心安全',
    external: false,
    primary: false,
  },
  {
    href: '/register',
    icon: UserPlus,
    label: '登録する',
    external: false,
    primary: false,
  },
];

export default function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-base/95 backdrop-blur-xl border-t border-border safe-area-bottom">
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}
      >
        {items.map((item) => {
          const Icon = item.icon;
          const content = (
            <span
              className={`flex flex-col items-center justify-center py-2.5 gap-1 text-center transition-colors duration-200 ${
                item.primary
                  ? 'text-gold'
                  : 'text-stone hover:text-cream'
              }`}
            >
              <Icon
                size={18}
                strokeWidth={1.5}
                className={item.primary ? 'text-gold' : ''}
              />
              <span className="text-[9px] tracking-wider leading-none">{item.label}</span>
            </span>
          );

          return (
            <Link key={item.href} href={item.href}>
              {content}
            </Link>
          );
        })}
      </div>
      {/* iOS safe area */}
      <div style={{ height: 'env(safe-area-inset-bottom)' }} />
    </nav>
  );
}
