'use client';

import { useState } from 'react';
import { MessageSquare, Calendar, MapPin } from 'lucide-react';

type InquiryStatus = 'new' | 'reviewing' | 'replied' | 'scheduling' | 'confirmed' | 'cancelled' | 'completed';

interface Inquiry {
  id: string;
  therapistName: string;
  therapistSlug: string;
  preferredDate: string;
  preferredArea: string;
  message: string;
  contactMethod: 'form' | 'line' | 'dm';
  status: InquiryStatus;
  createdAt: string;
}

const STATUS_LABELS: Record<InquiryStatus, string> = {
  new: '新規',
  reviewing: '確認中',
  replied: '返信済み',
  scheduling: '日程調整中',
  confirmed: '確定',
  cancelled: 'キャンセル',
  completed: '完了',
};

const STATUS_COLOR: Record<InquiryStatus, string> = {
  new: 'border-gold/30 bg-gold/10 text-gold',
  reviewing: 'border-sky-400/30 bg-sky-400/10 text-sky-300',
  replied: 'border-stone/30 bg-stone/10 text-stone',
  scheduling: 'border-amber-400/30 bg-amber-400/10 text-amber-400',
  confirmed: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-400',
  cancelled: 'border-wine/30 bg-wine/10 text-wine',
  completed: 'border-mist/30 bg-mist/10 text-mist',
};

const dummyInquiries: Inquiry[] = [
  {
    id: 'INQ-001',
    therapistName: '蓮',
    therapistSlug: 'ren',
    preferredDate: '2026-06-10（水）14:00〜',
    preferredArea: '渋谷',
    message: '初めての利用です。どんな雰囲気か事前に教えてもらえますか？',
    contactMethod: 'form',
    status: 'new',
    createdAt: '2026-06-07T20:15:00',
  },
  {
    id: 'INQ-002',
    therapistName: '蒼',
    therapistSlug: 'ao',
    preferredDate: '2026-06-12（金）18:00〜',
    preferredArea: '代官山',
    message: '外出デートをお願いしたいのですが、対応可能でしょうか。2時間程度を想定しています。',
    contactMethod: 'line',
    status: 'reviewing',
    createdAt: '2026-06-07T11:30:00',
  },
  {
    id: 'INQ-003',
    therapistName: '玲央',
    therapistSlug: 'reo',
    preferredDate: '2026-06-09（月）15:00〜',
    preferredArea: '恵比寿',
    message: '以前利用した際に大変満足しました。また同じように過ごしたいです。',
    contactMethod: 'form',
    status: 'scheduling',
    createdAt: '2026-06-06T14:00:00',
  },
  {
    id: 'INQ-004',
    therapistName: '律',
    therapistSlug: 'ritsu',
    preferredDate: '2026-06-08（月）今日',
    preferredArea: '新宿',
    message: '急なのですが、今日の夜21時ごろ対応可能でしょうか。',
    contactMethod: 'form',
    status: 'confirmed',
    createdAt: '2026-06-08T09:00:00',
  },
];

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState(dummyInquiries);
  const [filter, setFilter] = useState<InquiryStatus | 'all'>('new');

  const updateStatus = (id: string, status: InquiryStatus) =>
    setInquiries((prev) => prev.map((inq) => inq.id === id ? { ...inq, status } : inq));

  const filtered = inquiries.filter((inq) => filter === 'all' || inq.status === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-cream">相談管理</h1>
          <p className="text-mist text-xs mt-1">利用者からの相談・問い合わせを管理</p>
        </div>
        <span className="text-gold text-xs">{inquiries.filter(i => i.status === 'new').length}件 未対応</span>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        <button
          onClick={() => setFilter('all')}
          className={`text-[10px] px-3 py-1.5 border transition-all ${
            filter === 'all' ? 'border-gold/50 text-gold bg-gold/5' : 'border-border text-mist hover:text-stone'
          }`}
        >
          すべて ({inquiries.length})
        </button>
        {(Object.entries(STATUS_LABELS) as [InquiryStatus, string][]).map(([s, label]) => {
          const count = inquiries.filter(i => i.status === s).length;
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`text-[10px] px-3 py-1.5 border transition-all ${
                filter === s ? `${STATUS_COLOR[s]}` : 'border-border text-mist hover:text-stone'
              }`}
            >
              {label} ({count})
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        {filtered.map((inq) => (
          <div key={inq.id} className="bg-surface border border-border p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-gold text-xs">{inq.therapistName} 宛</span>
                  <span className="text-mist text-[10px]">#{inq.id}</span>
                  <span className="text-mist text-[10px]">
                    {inq.contactMethod === 'form' ? 'フォーム' : inq.contactMethod === 'line' ? 'LINE' : 'DM'}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-mist text-[10px]">
                  <div className="flex items-center gap-1">
                    <Calendar size={10} />
                    {inq.preferredDate}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={10} />
                    {inq.preferredArea}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <span className={`text-[10px] border px-2 py-0.5 ${STATUS_COLOR[inq.status]}`}>
                  {STATUS_LABELS[inq.status]}
                </span>
                <span className="text-mist text-[10px]">
                  {new Date(inq.createdAt).toLocaleString('ja-JP', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>

            <p className="text-stone text-xs leading-relaxed border-l-2 border-border pl-3 mb-4">
              {inq.message}
            </p>

            {/* Status update */}
            <div className="flex items-center gap-2">
              <span className="text-mist text-[10px]">ステータス変更:</span>
              <select
                value={inq.status}
                onChange={(e) => updateStatus(inq.id, e.target.value as InquiryStatus)}
                className="bg-elevated border border-border text-stone text-[10px] px-2 py-1 outline-none focus:border-gold/50"
              >
                {(Object.entries(STATUS_LABELS) as [InquiryStatus, string][]).map(([s, label]) => (
                  <option key={s} value={s}>{label}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="bg-surface border border-border p-10 text-center">
            <MessageSquare size={24} className="text-mist mx-auto mb-3" strokeWidth={1} />
            <p className="text-stone text-sm">該当する相談はありません</p>
          </div>
        )}
      </div>
    </div>
  );
}
