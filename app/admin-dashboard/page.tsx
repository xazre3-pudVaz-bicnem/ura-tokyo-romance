import Link from 'next/link';
import { Users, ClipboardList, FileCheck, MessageSquare, TrendingUp, Eye, Heart, Star } from 'lucide-react';
import { dummyApplications, APPLICATION_STATUS_LABELS } from '@/data/applications';
import { dummyBlogPosts } from '@/data/staff-blog';

const stats = [
  { label: '登録セラピスト', value: 8, unit: '名', icon: Users, href: '/admin-dashboard/therapists', color: 'text-gold' },
  { label: '申請中', value: 5, unit: '件', icon: ClipboardList, href: '/admin-dashboard/applications', color: 'text-amber-400' },
  { label: '承認待ちブログ', value: 2, unit: '件', icon: FileCheck, href: '/admin-dashboard/blog-approvals', color: 'text-sky-300' },
  { label: '未対応相談', value: 3, unit: '件', icon: MessageSquare, href: '/admin-dashboard/inquiries', color: 'text-wine' },
];

const siteStats = [
  { label: '今月の閲覧数', value: '1,247', icon: Eye },
  { label: 'お気に入り登録', value: '89', icon: Heart },
  { label: '公開中の口コミ', value: '0', icon: Star },
  { label: '月間相談数', value: '12', icon: MessageSquare },
];

const STATUS_COLOR: Record<string, string> = {
  new: 'border-gold/30 bg-gold/10 text-gold',
  reviewing: 'border-stone/30 bg-stone/10 text-stone',
  id_check: 'border-amber-400/30 bg-amber-400/10 text-amber-400',
  photo_check: 'border-amber-400/30 bg-amber-400/10 text-amber-400',
  interview: 'border-purple-400/30 bg-purple-400/10 text-purple-400',
  approved: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-400',
  sent_back: 'border-orange-400/30 bg-orange-400/10 text-orange-400',
  rejected: 'border-wine/30 bg-wine/10 text-wine',
};

const BLOG_STATUS_COLOR: Record<string, string> = {
  draft: 'border-stone/30 bg-stone/10 text-stone',
  pending_review: 'border-amber-400/30 bg-amber-400/10 text-amber-400',
  published: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-400',
  rejected: 'border-wine/30 bg-wine/10 text-wine',
  private: 'border-mist/30 bg-mist/10 text-mist',
};

const BLOG_STATUS_LABELS: Record<string, string> = {
  draft: '下書き',
  pending_review: '運営確認待ち',
  published: '公開中',
  rejected: '差し戻し',
  private: '非公開',
};

export default function AdminDashboardPage() {
  const recentApplications = dummyApplications.slice(0, 5);
  const recentBlogs = dummyBlogPosts.slice(0, 3);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-cream">ダッシュボード</h1>
          <p className="text-mist text-xs mt-1">2026年6月8日 現在</p>
        </div>
        <div className="flex items-center gap-2 text-emerald-400 text-xs">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          システム稼働中
        </div>
      </div>

      {/* Action stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link key={s.label} href={s.href} className="bg-surface border border-border p-5 hover:border-gold/30 transition-colors group">
              <div className="flex items-start justify-between mb-3">
                <Icon size={18} className={s.color} strokeWidth={1.5} />
                <TrendingUp size={12} className="text-mist group-hover:text-stone transition-colors" />
              </div>
              <p className={`text-2xl font-display ${s.color} mb-1`}>{s.value}<span className="text-sm ml-1">{s.unit}</span></p>
              <p className="text-mist text-xs">{s.label}</p>
            </Link>
          );
        })}
      </div>

      {/* Site metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {siteStats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-surface border border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon size={13} className="text-stone" strokeWidth={1.5} />
                <p className="text-mist text-[10px]">{s.label}</p>
              </div>
              <p className="text-xl font-display text-cream">{s.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent applications */}
        <div className="bg-surface border border-border">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="text-cream text-sm">最近の申請</h2>
            <Link href="/admin-dashboard/applications" className="text-gold text-[10px] tracking-widest hover:underline">
              全件を見る →
            </Link>
          </div>
          <div className="divide-y divide-border/50">
            {recentApplications.map((app) => (
              <div key={app.id} className="flex items-center justify-between px-5 py-3 hover:bg-elevated transition-colors">
                <div>
                  <p className="text-cream text-sm">{app.stageName}</p>
                  <p className="text-mist text-[10px] mt-0.5">{app.areas.join('・')} / {app.age}歳</p>
                </div>
                <span className={`text-[10px] border px-2 py-0.5 ${STATUS_COLOR[app.status]}`}>
                  {APPLICATION_STATUS_LABELS[app.status]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent blog posts */}
        <div className="bg-surface border border-border">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="text-cream text-sm">ブログ承認キュー</h2>
            <Link href="/admin-dashboard/blog-approvals" className="text-gold text-[10px] tracking-widest hover:underline">
              全件を見る →
            </Link>
          </div>
          <div className="divide-y divide-border/50">
            {recentBlogs.map((post) => (
              <div key={post.id} className="flex items-center justify-between px-5 py-3 hover:bg-elevated transition-colors">
                <div className="flex-1 min-w-0 mr-3">
                  <p className="text-cream text-sm truncate">{post.title}</p>
                  <p className="text-mist text-[10px] mt-0.5">{post.therapistName}</p>
                </div>
                <span className={`text-[10px] border px-2 py-0.5 flex-shrink-0 ${BLOG_STATUS_COLOR[post.status]}`}>
                  {BLOG_STATUS_LABELS[post.status]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Registration flow guide */}
      <div className="mt-6 bg-surface border border-border p-5">
        <h2 className="text-cream text-sm mb-4">登録から掲載までの流れ</h2>
        <div className="flex flex-wrap gap-2 items-center">
          {[
            '申請', '運営審査', '本人確認', '写真確認', '審査OK',
            'ID・PW発行', 'セラピスト通知', 'ログイン', 'プロフィール編集',
            '出勤登録', 'ブログ投稿', '運営承認', '公開',
          ].map((step, i, arr) => (
            <div key={step} className="flex items-center gap-2">
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-mist mb-1">{i + 1}</span>
                <span className="text-cream text-xs bg-elevated border border-border px-2.5 py-1">{step}</span>
              </div>
              {i < arr.length - 1 && (
                <span className="text-mist text-xs">→</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
