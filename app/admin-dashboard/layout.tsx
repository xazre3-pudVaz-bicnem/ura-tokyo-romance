'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, ClipboardList, Users, FileCheck,
  Star, MessageSquare, AlertTriangle, Settings, LogOut, Bell, CreditCard,
} from 'lucide-react';

const NAV = [
  { href: '/admin-dashboard', label: 'ダッシュボード', icon: LayoutDashboard, exact: true },
  { href: '/admin-dashboard/applications', label: '申請管理', icon: ClipboardList, badge: 3 },
  { href: '/admin-dashboard/therapists', label: 'セラピスト管理', icon: Users },
  { href: '/admin-dashboard/plans', label: 'プラン管理', icon: CreditCard },
  null,
  { href: '/admin-dashboard/blog-approvals', label: 'ブログ承認', icon: FileCheck, badge: 2 },
  { href: '/admin-dashboard/reviews', label: '口コミ管理', icon: Star },
  { href: '/admin-dashboard/inquiries', label: '相談管理', icon: MessageSquare },
  { href: '/admin-dashboard/reports', label: '通報管理', icon: AlertTriangle },
  null,
  { href: '/admin-dashboard/notifications', label: '通知センター', icon: Bell },
  { href: '/admin-dashboard/settings', label: '設定', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="min-h-screen pt-20">
      {/* Admin top bar */}
      <div className="bg-[#0A0909] border-b border-border px-5 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-wine text-[10px] tracking-widest border border-wine/30 px-2 py-0.5">ADMIN</span>
            <span className="text-cream text-sm tracking-wide">裏東京ロマンス 管理パネル</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-mist text-[10px]">info@uratokyoromance.com</span>
            <Link href="/admin-login" className="flex items-center gap-1.5 text-mist text-[10px] hover:text-stone transition-colors">
              <LogOut size={12} />
              ログアウト
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-6 flex gap-6">
        {/* Sidebar */}
        <aside className="w-52 flex-shrink-0">
          <nav className="space-y-0.5">
            {NAV.map((item, i) => {
              if (item === null) {
                return <div key={i} className="my-2 border-t border-border/50" />;
              }
              const Icon = item.icon;
              const active = isActive(item.href, item.exact);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 text-sm transition-all duration-150 ${
                    active
                      ? 'bg-gold/10 text-gold border-l-2 border-gold'
                      : 'text-stone hover:text-cream hover:bg-elevated border-l-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={14} strokeWidth={1.5} />
                    <span className="text-xs">{item.label}</span>
                  </div>
                  {item.badge && item.badge > 0 ? (
                    <span className="text-[10px] bg-wine text-cream rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                      {item.badge}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
