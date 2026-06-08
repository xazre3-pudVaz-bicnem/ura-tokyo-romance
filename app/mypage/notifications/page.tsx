'use client';

import { useState } from 'react';
import { Bell, Heart, Clock, Star, MessageSquare, AlertCircle, CheckCheck } from 'lucide-react';

type NotifType = 'inquiry' | 'schedule' | 'favorite' | 'review' | 'system';

const TYPE_ICON: Record<NotifType, typeof Bell> = {
  inquiry: MessageSquare,
  schedule: Clock,
  favorite: Heart,
  review: Star,
  system: AlertCircle,
};

const TYPE_COLOR: Record<NotifType, string> = {
  inquiry: 'text-sky-300',
  schedule: 'text-stone',
  favorite: 'text-wine',
  review: 'text-gold',
  system: 'text-amber-400',
};

const initialNotifs: Array<{
  id: number;
  type: NotifType;
  message: string;
  sub: string;
  time: string;
  isRead: boolean;
}> = [
  { id: 1, type: 'inquiry', message: '蓮への相談が返信されました', sub: 'ご確認ください', time: '2時間前', isRead: false },
  { id: 2, type: 'schedule', message: '蒼が今日出勤しています', sub: '渋谷・恵比寿エリア', time: '4時間前', isRead: false },
  { id: 3, type: 'system', message: 'グランドオープンのお知らせ', sub: '2026年8月1日（土）に本格オープン予定です', time: '1日前', isRead: false },
  { id: 4, type: 'schedule', message: '律が明日出勤予定', sub: '新宿・池袋エリア', time: '2日前', isRead: true },
  { id: 5, type: 'system', message: '新機能：口コミ機能が追加されました', sub: 'グランドオープン後にご利用いただけます', time: '5日前', isRead: true },
];

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(initialNotifs);

  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, isRead: true })));
  const markRead = (id: number) => setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, isRead: true } : n));

  const unreadCount = notifs.filter((n) => !n.isRead).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-cream">通知</h1>
          {unreadCount > 0 && (
            <p className="text-amber-400 text-xs mt-1">{unreadCount}件の未読通知があります</p>
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
                <p className="text-mist text-[10px] mt-0.5">{n.sub}</p>
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
        <h2 className="text-cream text-sm mb-4 flex items-center gap-2">
          <Bell size={14} className="text-gold" strokeWidth={1.5} />
          通知設定
        </h2>
        <div className="space-y-3">
          {[
            { label: 'お気に入りセラピストの出勤通知', key: 'schedule' },
            { label: '相談への返信通知', key: 'inquiry' },
            { label: 'ランキング更新通知', key: 'ranking' },
            { label: '運営からのお知らせ', key: 'system' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <span className="text-stone text-xs">{item.label}</span>
              <div className="w-9 h-5 bg-gold/30 relative cursor-pointer flex items-center px-1">
                <div className="w-3 h-3 bg-gold ml-auto" />
              </div>
            </div>
          ))}
        </div>
        <p className="text-mist text-[10px] mt-4">詳細な通知設定はグランドオープン後にご利用いただけます</p>
      </div>
    </div>
  );
}
