import Link from 'next/link';
import { Heart, Clock, MessageSquare, Bell, Star, ShieldCheck } from 'lucide-react';
import { dummyTherapists } from '@/data/dummy-therapists';

const recentlyViewed = dummyTherapists.slice(0, 3);
const myFavorites = dummyTherapists.filter((t) => t.isFeatured).slice(0, 2);

const notifications = [
  { id: 1, type: 'inquiry', message: '蓮への相談が返信されました', time: '2時間前', isRead: false },
  { id: 2, type: 'schedule', message: '蒼が今日出勤しています', time: '4時間前', isRead: false },
  { id: 3, type: 'ranking', message: '律が急上昇ランキング入りしました', time: '1日前', isRead: true },
];

export default function MypagePage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-cream">マイページ</h1>
          <p className="text-mist text-xs mt-1">ゲスト会員 ※グランドオープン後に本会員機能が利用できます</p>
        </div>
        <div className="flex items-center gap-1.5 text-amber-400 text-xs">
          <Bell size={13} />
          {notifications.filter(n => !n.isRead).length}件の未読通知
        </div>
      </div>

      <div className="bg-gold/5 border border-gold/20 p-4 mb-6">
        <p className="text-gold text-[10px]">会員機能はグランドオープン（2026年8月1日）後に完全提供開始します。</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'お気に入り', value: myFavorites.length, href: '/mypage/favorites', icon: Heart, color: 'text-wine' },
          { label: '閲覧履歴', value: recentlyViewed.length, href: '/mypage/history', icon: Clock, color: 'text-stone' },
          { label: '相談履歴', value: 1, href: '/mypage/inquiries', icon: MessageSquare, color: 'text-sky-300' },
          { label: '未読通知', value: notifications.filter(n => !n.isRead).length, href: '/mypage/notifications', icon: Bell, color: 'text-amber-400' },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <Link key={s.label} href={s.href} className="card-luxury p-5 hover:border-gold/30 transition-colors">
              <Icon size={15} className={s.color} strokeWidth={1.5} />
              <p className={`text-2xl font-display ${s.color} mt-2`}>{s.value}</p>
              <p className="text-mist text-[10px] mt-1">{s.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {/* Favorites */}
        <div className="card-luxury">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="text-cream text-sm flex items-center gap-2">
              <Heart size={14} className="text-wine" />
              お気に入り
            </h2>
            <Link href="/mypage/favorites" className="text-gold text-[10px] hover:underline">すべて見る →</Link>
          </div>
          <div className="divide-y divide-border/50">
            {myFavorites.map((t) => (
              <Link key={t.id} href={`/therapists/${t.slug}`} className="flex items-center gap-3 px-5 py-3 hover:bg-elevated group">
                {t.image && <img src={t.image} alt={t.name} className="w-9 h-12 object-cover object-top flex-shrink-0" />}
                <div>
                  <p className="text-cream text-sm group-hover:text-gold">{t.name}</p>
                  <p className="text-mist text-[10px]">{t.areas[0]}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="card-luxury">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="text-cream text-sm flex items-center gap-2">
              <Bell size={14} className="text-gold" />
              通知
            </h2>
            <Link href="/mypage/notifications" className="text-gold text-[10px] hover:underline">すべて見る →</Link>
          </div>
          <div className="divide-y divide-border/50">
            {notifications.map((n) => (
              <div key={n.id} className={`px-5 py-3 flex items-start gap-3 ${!n.isRead ? 'bg-gold/5' : ''}`}>
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${!n.isRead ? 'bg-gold' : 'bg-border'}`} />
                <div>
                  <p className="text-stone text-xs">{n.message}</p>
                  <p className="text-mist text-[10px] mt-0.5">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recently viewed */}
      <div className="card-luxury">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-cream text-sm flex items-center gap-2">
            <Clock size={14} className="text-stone" />
            最近見たセラピスト
          </h2>
          <Link href="/mypage/history" className="text-gold text-[10px] hover:underline">すべて見る →</Link>
        </div>
        <div className="flex gap-4 p-5 overflow-x-auto">
          {recentlyViewed.map((t) => (
            <Link key={t.id} href={`/therapists/${t.slug}`} className="flex-shrink-0 text-center group">
              {t.image && (
                <div className="w-16 h-22 overflow-hidden mb-2">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform" />
                </div>
              )}
              <p className="text-stone text-[10px] group-hover:text-gold transition-colors">{t.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
