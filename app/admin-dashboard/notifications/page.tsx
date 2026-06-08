'use client';

import { useState } from 'react';
import { Bell, Send, Users, User, ShieldCheck, CheckCheck, X } from 'lucide-react';

type NotifTarget = 'all_therapists' | 'all_members' | 'all' | 'specific';
type NotifType = 'system' | 'announcement' | 'warning' | 'reminder';

const TARGET_LABEL: Record<NotifTarget, string> = {
  all_therapists: '全セラピスト',
  all_members: '全女性会員',
  all: '全ユーザー',
  specific: '特定ユーザー',
};

const TYPE_COLOR: Record<NotifType, string> = {
  system: 'text-stone border-border',
  announcement: 'text-gold border-gold/30',
  warning: 'text-wine border-wine/30',
  reminder: 'text-amber-400 border-amber-400/30',
};

const sentHistory: Array<{
  id: number;
  title: string;
  target: NotifTarget;
  type: NotifType;
  sentAt: string;
  readRate: string;
}> = [
  { id: 1, title: 'グランドオープンまであと2ヶ月のお知らせ', target: 'all_therapists', type: 'announcement', sentAt: '2026-06-01', readRate: '73%' },
  { id: 2, title: 'プロフィール写真の更新をお願いします', target: 'all_therapists', type: 'reminder', sentAt: '2026-05-20', readRate: '61%' },
  { id: 3, title: '利用規約改定のお知らせ', target: 'all', type: 'system', sentAt: '2026-05-01', readRate: '45%' },
];

export default function AdminNotificationsPage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [target, setTarget] = useState<NotifTarget>('all_therapists');
  const [type, setType] = useState<NotifType>('announcement');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!title.trim() || !body.trim()) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setTitle('');
      setBody('');
    }, 3000);
  };

  return (
    <div>
      <h1 className="font-display text-2xl text-cream mb-1">通知センター</h1>
      <p className="text-mist text-xs mb-6">セラピスト・会員への一斉通知を送信します。</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compose */}
        <div className="card-luxury">
          <div className="px-5 py-4 border-b border-border flex items-center gap-2">
            <Bell size={14} className="text-gold" strokeWidth={1.5} />
            <h2 className="text-cream text-sm">通知を作成</h2>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-mist text-[10px] tracking-widest mb-2">送信対象</label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(TARGET_LABEL) as NotifTarget[]).filter(t => t !== 'specific').map((t) => (
                  <button
                    key={t}
                    onClick={() => setTarget(t)}
                    className={`flex items-center gap-2 px-3 py-2 border text-xs transition-colors ${
                      target === t ? 'border-gold text-gold bg-gold/10' : 'border-border text-stone hover:text-cream'
                    }`}
                  >
                    {t === 'all_therapists' ? <User size={12} /> : t === 'all_members' ? <Users size={12} /> : <ShieldCheck size={12} />}
                    {TARGET_LABEL[t]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-mist text-[10px] tracking-widest mb-2">通知タイプ</label>
              <div className="flex gap-2 flex-wrap">
                {(Object.keys(TYPE_COLOR) as NotifType[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`px-3 py-1.5 border text-[10px] transition-colors ${
                      type === t ? TYPE_COLOR[t] + ' bg-current/10' : 'border-border text-mist hover:text-stone'
                    }`}
                  >
                    {t === 'system' ? 'システム' : t === 'announcement' ? 'お知らせ' : t === 'warning' ? '警告' : 'リマインダー'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-mist text-[10px] tracking-widest mb-2">タイトル</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="例：グランドオープンのお知らせ"
                className="w-full bg-elevated border border-border text-cream text-sm px-4 py-2.5 outline-none focus:border-gold/50"
              />
            </div>

            <div>
              <label className="block text-mist text-[10px] tracking-widest mb-2">本文</label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={4}
                placeholder="通知の内容を入力..."
                className="w-full bg-elevated border border-border text-cream text-sm px-4 py-2.5 outline-none focus:border-gold/50 resize-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSend}
                disabled={!title.trim() || !body.trim() || sent}
                className="flex items-center gap-2 btn-primary text-sm px-5 py-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {sent ? <CheckCheck size={14} /> : <Send size={14} />}
                {sent ? '送信しました' : '通知を送信'}
              </button>
              <p className="text-mist text-[10px]">{TARGET_LABEL[target]}に送信</p>
            </div>
          </div>
        </div>

        {/* History */}
        <div className="card-luxury">
          <div className="px-5 py-4 border-b border-border flex items-center gap-2">
            <Bell size={14} className="text-stone" strokeWidth={1.5} />
            <h2 className="text-cream text-sm">送信履歴</h2>
          </div>
          <div className="divide-y divide-border/50">
            {sentHistory.map((n) => (
              <div key={n.id} className="px-5 py-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <p className="text-cream text-xs">{n.title}</p>
                  <span className={`text-[9px] border px-2 py-0.5 flex-shrink-0 ${TYPE_COLOR[n.type]}`}>
                    {n.type === 'announcement' ? 'お知らせ' : n.type === 'reminder' ? 'リマインダー' : 'システム'}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-mist text-[10px]">{TARGET_LABEL[n.target]}</span>
                  <span className="text-mist text-[10px]">{n.sentAt}</span>
                  <span className="text-emerald-400 text-[10px]">既読率 {n.readRate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
