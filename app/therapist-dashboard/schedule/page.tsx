'use client';

import { useState } from 'react';
import { Calendar, Clock, Save, Check, FileText, Sparkles, Plus, Trash2, Info } from 'lucide-react';
import Link from 'next/link';
import { STATUS_CONFIG, type AvailabilityStatus } from '@/data/schedule';

const DAYS = ['月', '火', '水', '木', '金', '土', '日'];

const DEFAULT_SLOTS: Array<{ start: string; end: string; status: AvailabilityStatus }> = [
  { start: '12:00', end: '15:00', status: 'available' },
  { start: '15:00', end: '18:00', status: 'available' },
  { start: '18:00', end: '24:00', status: 'available' },
];

export default function SchedulePage() {
  const [selectedDays, setSelectedDays] = useState<string[]>(['月', '水', '金', '土']);
  const [availableToday, setAvailableToday] = useState(false);
  const [note, setNote] = useState('月・水・金・土 出勤');
  const [slots, setSlots] = useState(DEFAULT_SLOTS);
  const [saved, setSaved] = useState(false);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const updateSlotStatus = (idx: number, status: AvailabilityStatus) => {
    setSlots((prev) => prev.map((s, i) => i === idx ? { ...s, status } : s));
  };

  const removeSlot = (idx: number) => {
    setSlots((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <h2 className="font-display text-2xl text-cream mb-6">スケジュール管理</h2>

      <div className="space-y-6">
        {/* Today toggle */}
        <div className="card-luxury p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock size={16} className="text-gold" strokeWidth={1.5} />
              <div>
                <p className="text-cream text-sm">今日会えるに表示する</p>
                <p className="text-stone text-xs mt-0.5">ONにすると「今日会えるセラピスト」とカレンダーに表示されます</p>
              </div>
            </div>
            <button
              onClick={() => setAvailableToday(!availableToday)}
              className={`w-12 h-6 rounded-full transition-colors duration-200 relative ${availableToday ? 'bg-gold' : 'bg-border'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${availableToday ? 'translate-x-6' : ''}`} />
            </button>
          </div>
          {availableToday && (
            <div className="mt-4 bg-emerald-400/5 border border-emerald-400/20 px-4 py-2.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-emerald-400 text-xs">本日の受付中スロットがセラピスト一覧・トップページに表示されます</p>
            </div>
          )}
        </div>

        {/* Weekly working days */}
        <div className="card-luxury p-6">
          <div className="flex items-center gap-3 mb-5">
            <Calendar size={16} className="text-gold" strokeWidth={1.5} />
            <p className="text-cream text-sm">定期出勤曜日</p>
          </div>
          <div className="flex flex-wrap gap-3 mb-5">
            {DAYS.map((day) => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`w-10 h-10 text-sm font-display border transition-all duration-200 ${
                  selectedDays.includes(day)
                    ? 'border-gold text-gold bg-gold/10'
                    : 'border-border text-stone hover:border-gold/40 hover:text-cream'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
          <div>
            <label className="block text-mist text-[10px] tracking-widest mb-2">プロフィール表示メモ</label>
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="例：月・水・金・土 出勤"
              className="w-full bg-elevated border border-border text-cream px-4 py-3 text-sm outline-none focus:border-gold/50"
            />
          </div>
        </div>

        {/* Time slots with availability status */}
        <div className="card-luxury">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <div>
              <p className="text-cream text-sm">時間帯と受付状況</p>
              <p className="text-mist text-[10px] mt-0.5">各時間枠の受付状況を設定します。プロフィールのカレンダーに反映されます。</p>
            </div>
          </div>

          <div className="divide-y divide-border/50">
            {slots.map((slot, idx) => {
              const cfg = STATUS_CONFIG[slot.status];
              return (
                <div key={idx} className="flex items-center gap-4 px-6 py-4">
                  <div className="flex items-center gap-2 flex-1">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${cfg.dotColor}`} />
                    <span className="text-cream text-sm">{slot.start}〜{slot.end}</span>
                  </div>
                  <select
                    value={slot.status}
                    onChange={(e) => updateSlotStatus(idx, e.target.value as AvailabilityStatus)}
                    className={`bg-elevated border text-sm px-3 py-1.5 outline-none ${cfg.borderColor} ${cfg.textColor}`}
                  >
                    <option value="available">受付中</option>
                    <option value="full">受付済</option>
                    <option value="inquiry">要相談（移動中・場所・時間調整）</option>
                    <option value="off">休み</option>
                  </select>
                  <button onClick={() => removeSlot(idx)} className="text-mist hover:text-wine transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="px-6 py-4 border-t border-border/50">
            <div className="bg-elevated/50 border border-border p-3 flex items-start gap-2">
              <Info size={12} className="text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="text-mist text-[10px] leading-relaxed">
                受付状況を設定するとプロフィールページの空き状況カレンダーに反映され、利用者が日付と時間を選んで直接相談を送れるようになります。
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
          className="btn-primary w-full py-4 flex items-center justify-center gap-2"
        >
          {saved ? <Check size={15} /> : <Save size={15} />}
          {saved ? '保存しました' : '保存する'}
        </button>

        {/* Auto blog from schedule */}
        <div className="card-luxury border border-gold/20">
          <div className="px-6 py-4 border-b border-border/50 flex items-center gap-3">
            <Sparkles size={16} className="text-gold" strokeWidth={1.5} />
            <div>
              <p className="text-cream text-sm">この出勤情報からブログ下書きを作成</p>
              <p className="text-mist text-[10px] mt-0.5">設定したエリア・日程をもとに記事の下書きを自動生成します</p>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-mist text-[10px] tracking-widest mb-2">一言コメント（任意）</label>
                <input
                  type="text"
                  placeholder="例：渋谷で久しぶりの出勤です。癒しのひと時をお届けします"
                  className="w-full bg-elevated border border-border text-cream text-sm px-4 py-2.5 outline-none focus:border-gold/50"
                />
              </div>
            </div>
            <div className="bg-elevated border border-border p-4 mb-4">
              <p className="text-mist text-[10px] mb-2">生成されるブログ下書きのイメージ</p>
              <p className="text-stone text-xs leading-relaxed">
                「{selectedDays.join('・')}の出勤情報」をもとに、エリア・雰囲気・セラピストらしさを盛り込んだ記事が自動生成されます。生成後に自由に編集できます。
              </p>
            </div>
            <Link
              href="/therapist-dashboard/blog/new?from=schedule"
              className="flex items-center gap-2 btn-secondary text-sm py-2.5 px-5 w-fit"
            >
              <FileText size={14} />
              ブログ下書きを作成する
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
