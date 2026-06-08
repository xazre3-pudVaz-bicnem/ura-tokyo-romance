'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, User, Image, Calendar, BookOpen,
  Star, MessageSquare, BarChart2, Settings, LogOut,
} from 'lucide-react';

const navItems = [
  { href: '/therapist-dashboard', label: 'ダッシュボード', icon: LayoutDashboard, exact: true },
  { href: '/therapist-dashboard/profile', label: 'プロフィール', icon: User },
  { href: '/therapist-dashboard/photos', label: '写真管理', icon: Image },
  { href: '/therapist-dashboard/schedule', label: '出勤管理', icon: Calendar },
  { href: '/therapist-dashboard/blog', label: 'ブログ', icon: BookOpen },
  null,
  { href: '/therapist-dashboard/inquiries', label: '受信相談', icon: MessageSquare },
  { href: '/therapist-dashboard/reviews', label: '口コミ', icon: Star },
  { href: '/therapist-dashboard/analytics', label: 'アクセス分析', icon: BarChart2 },
  null,
  { href: '/therapist-dashboard/settings', label: '設定', icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="min-h-screen pt-20">
      {/* Dashboard header */}
      <div className="bg-surface border-b border-border px-5 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-gold text-[10px] tracking-widest">Therapist Dashboard</p>
            <p className="text-cream text-sm">
              セラピスト管理画面
              <span className="text-wine text-[10px] ml-2">（グランドオープン前プレビュー）</span>
            </p>
          </div>
          <Link href="/therapist-login" className="flex items-center gap-1.5 text-mist text-[10px] hover:text-stone transition-colors">
            <LogOut size={12} />
            ログアウト
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-8">
        {/* Pre-launch banner */}
        <div className="bg-wine/10 border border-wine/30 p-4 mb-6 flex items-center gap-3">
          <span className="text-wine text-[10px] tracking-widest flex-shrink-0">準備中</span>
          <p className="text-stone text-xs">
            管理画面はグランドオープン（2026年8月1日）後に提供開始します。現在はUIのプレビューです。
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-48 flex-shrink-0">
            <nav className="space-y-0.5">
              {navItems.map((item, i) => {
                if (item === null) {
                  return <div key={i} className="my-2 border-t border-border/50" />;
                }
                const Icon = item.icon;
                const active = isActive(item.href, item.exact);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2.5 px-3 py-2.5 text-xs transition-all duration-150 border-l-2 ${
                      active
                        ? 'border-gold text-gold bg-gold/10'
                        : 'border-transparent text-stone hover:text-cream hover:bg-elevated'
                    }`}
                  >
                    <Icon size={14} strokeWidth={1.5} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
