'use client';

import { useState } from 'react';
import { Bell, Heart, MessageSquare, Star, TrendingUp, CheckCheck } from 'lucide-react';

type NotifType = 'inquiry' | 'favorite' | 'review' | 'ranking' | 'system';

const TYPE_ICON: Record<NotifType, typeof Bell> = {
  inquiry: MessageSquare,
  favorite: Heart,
  review: Star,
  ranking: TrendingUp,
  system: Bell,
};

const TYPE_COLOR: Record<NotifType, string> = {
  inquiry: 'text-sky-300',
  favorite: 'text-wine',
  review: 'text-gold',
  ranking: 'text-emerald-400',
  system: 'text-mist',
};

const initialNotifs: Array<{
  id: number;
  type: NotifType;
  message: string;
  time: string;
  isRead: boolean;
}> = [
  { id: 1, type: 'favorite', message: '新たに3人がお気に入り登録しました（今週合計12人）', time: '1時間前', isRead: false },
  { id: 2, type: 'inquiry', message: '新しい相談が届いています', time: '3時間前', isRead: false },
  { id: 3, type: 'ranking', message: '人気急上昇ランキング3位に入りました', time: '6時間前', isRead: false },
  { id: 4, type: 'system', message: 'ブログ記事「渋谷での癒しの時間」が承認されました', time: '昨日', isRead: true },
  { id: 5, type: 'favorite', message: '新たに5人がお気に入り登録しました（先週合計20人）', time: '3日前', isRead: true },
  { id: 6, type: 'system', message: 'グランドオープンまであと約2ヶ月となりました', time: '1週間前', isRead: true },
];

export default function TherapistNotificationsPage() {
  const [notifs, setNotifs] = useState(initialNotifs);

  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, isRead: true })));
  const markRead = (id: number) => setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, isRead: true } : n));

  const unreadCount = notifs.filter((n) => !n.isRead).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl text-cream">通知センター</h2>
          {unreadCount > 0 && (
            <p className="text-amber-400 text-xs mt-1">{unreadCount}件の未読通知</p>
          )}
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="flex items-center gap-1.5 text-mist text-xs hover:text-cream transition-colors">
            <CheckCheck size={12} />
            すべて既読
          </button>
        )}
      </div>

      <div className="space-y-2">
        {notifs.map((n) => {
          const Icon = TYPE_ICON[n.type];
          return (
            <button
              key={n.id}
              onClick={() => markRead(n.id)}
              className={`w-full card-luxury px-5 py-4 text-left flex items-start gap-4 hover:border-gold/20 transition-colors ${!n.isRead ? 'bg-gold/5' : ''}`}
            >
              <div className={`mt-0.5 flex-shrink-0 ${TYPE_COLOR[n.type]}`}>
                <Icon size={16} strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${n.isRead ? 'text-stone' : 'text-cream'}`}>{n.message}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-mist text-[10px]">{n.time}</span>
                {!n.isRead && <div className="w-1.5 h-1.5 rounded-full bg-gold" />}
              </div>
            </button>
          );
        })}
      </div>

      {notifs.length === 0 && (
        <div className="card-luxury p-12 text-center">
          <Bell size={32} className="text-border mx-auto mb-4" strokeWidth={1} />
          <p className="text-stone text-sm">通知はありません</p>
        </div>
      )}

      <div className="mt-6 card-luxury p-5">
        <h3 className="text-cream text-sm mb-4 flex items-center gap-2">
          <Bell size={14} className="text-gold" strokeWidth={1.5} />
          通知の種類
        </h3>
        <div className="space-y-3">
          {[
            { type: 'favorite' as NotifType, label: 'お気に入り登録（人数のみ、個人情報なし）' },
            { type: 'inquiry' as NotifType, label: '新規相談受信' },
            { type: 'review' as NotifType, label: '口コミ投稿（グランドオープン後）' },
            { type: 'ranking' as NotifType, label: 'ランキング入り' },
            { type: 'system' as NotifType, label: '運営からのお知らせ' },
          ].map(({ type, label }) => {
            const Icon = TYPE_ICON[type];
            return (
              <div key={type} className="flex items-center gap-3">
                <Icon size={13} className={TYPE_COLOR[type]} strokeWidth={1.5} />
                <span className="text-stone text-xs">{label}</span>
              </div>
            );
          })}
        </div>
        <p className="text-mist text-[10px] mt-4">LINE通知連携は設定ページからお申し込みいただけます（グランドオープン後）</p>
      </div>
    </div>
  );
}
