'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Heart, Clock, MessageSquare, Bell, Settings, LogOut } from 'lucide-react';

const navItems = [
  { href: '/mypage', label: 'マイページ', icon: LayoutDashboard, exact: true },
  { href: '/mypage/favorites', label: 'お気に入り', icon: Heart },
  { href: '/mypage/history', label: '閲覧履歴', icon: Clock },
  { href: '/mypage/inquiries', label: '相談履歴', icon: MessageSquare },
  { href: '/mypage/notifications', label: '通知', icon: Bell },
  { href: '/mypage/settings', label: '設定', icon: Settings },
];

export default function MypageLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="min-h-screen pt-20">
      <div className="bg-surface border-b border-border px-5 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-gold text-[10px] tracking-widest">My Page</p>
            <p className="text-cream text-sm">マイページ</p>
          </div>
          <Link href="/login" className="flex items-center gap-1.5 text-mist text-[10px] hover:text-stone transition-colors">
            <LogOut size={12} />
            ログアウト
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 py-8 flex flex-col lg:flex-row gap-6">
        <aside className="lg:w-44 flex-shrink-0">
          <nav className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href, item.exact);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 px-3 py-2.5 text-xs transition-all border-l-2 ${
                    active ? 'border-gold text-gold bg-gold/10' : 'border-transparent text-stone hover:text-cream hover:bg-elevated'
                  }`}
                >
                  <Icon size={14} strokeWidth={1.5} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
