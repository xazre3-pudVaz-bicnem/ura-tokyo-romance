import Link from 'next/link';
import { LayoutDashboard, User, Calendar, Star, MessageSquare, Settings } from 'lucide-react';

const navItems = [
  { href: '/therapist-dashboard', label: 'ダッシュボード', icon: LayoutDashboard, exact: true },
  { href: '/therapist-dashboard/profile', label: 'プロフィール', icon: User },
  { href: '/therapist-dashboard/schedule', label: 'スケジュール', icon: Calendar },
  { href: '/therapist-dashboard/reviews', label: '口コミ', icon: Star },
  { href: '/therapist-dashboard/inquiries', label: '相談受信', icon: MessageSquare },
  { href: '/therapist-dashboard/settings', label: '設定', icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pt-20">
      {/* Dashboard header */}
      <div className="bg-surface border-b border-border px-5 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-gold text-[10px] tracking-widest">Therapist Dashboard</p>
            <p className="text-cream text-sm">セラピスト管理画面 <span className="text-wine text-[10px] ml-2">（サンプル・準備中）</span></p>
          </div>
          <Link href="/therapist-login" className="btn-secondary text-xs py-2">ログアウト</Link>
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
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-2.5 text-stone text-sm hover:text-cream hover:bg-elevated transition-all duration-200"
                  >
                    <Icon size={15} strokeWidth={1.5} />
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
