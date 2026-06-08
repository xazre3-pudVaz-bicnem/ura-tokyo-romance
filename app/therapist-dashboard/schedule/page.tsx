'use client';

import { useState } from 'react';
import { Calendar, Clock, Save, Check } from 'lucide-react';

const days = ['月', '火', '水', '木', '金', '土', '日'];
const timeSlots = ['10:00〜', '12:00〜', '14:00〜', '16:00〜', '18:00〜', '20:00〜', '22:00〜'];

export default function SchedulePage() {
  const [selectedDays, setSelectedDays] = useState<string[]>(['月', '水', '金', '土']);
  const [availableToday, setAvailableToday] = useState(false);
  const [note, setNote] = useState('月・水・金・土 出勤');
  const [saved, setSaved] = useState(false);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div>
      <h2 className="font-display text-2xl text-cream mb-6">スケジュール管理</h2>

      <div className="space-y-6">
        {/* Today availability */}
        <div className="card-luxury p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock size={16} className="text-gold" strokeWidth={1.5} />
              <div>
                <p className="text-cream text-sm">今日会えるに表示する</p>
                <p className="text-stone text-xs mt-0.5">ONにすると「今日会えるセラピスト」に表示されます</p>
              </div>
            </div>
            <button
              onClick={() => setAvailableToday(!availableToday)}
              className={`w-12 h-6 rounded-full transition-colors duration-200 relative ${
                availableToday ? 'bg-gold' : 'bg-border'
              }`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                availableToday ? 'translate-x-6' : ''
              }`} />
            </button>
          </div>
        </div>

        {/* Weekly schedule */}
        <div className="card-luxury p-6">
          <div className="flex items-center gap-3 mb-4">
            <Calendar size={16} className="text-gold" strokeWidth={1.5} />
            <p className="text-cream text-sm">定期出勤曜日</p>
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            {days.map((day) => (
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
            <label className="block text-mist text-[10px] tracking-widest mb-2">出勤メモ（プロフィールに表示）</label>
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="例：月・水・金・土 出勤"
              className="w-full bg-elevated border border-border text-cream px-4 py-3 text-sm outline-none focus:border-gold/50"
            />
          </div>
        </div>

        {/* Time slots */}
        <div className="card-luxury p-6">
          <p className="text-gold text-[10px] tracking-widest mb-4">対応可能時間帯</p>
          <div className="flex flex-wrap gap-2">
            {timeSlots.map((slot) => (
              <span key={slot} className="tag-pill text-xs">{slot}</span>
            ))}
          </div>
          <p className="text-mist text-[10px] mt-3">詳細な時間設定はグランドオープン後に対応予定</p>
        </div>

        <button
          onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
          className="btn-primary w-full py-4 flex items-center justify-center gap-2"
        >
          {saved ? <Check size={15} /> : <Save size={15} />}
          {saved ? '保存しました' : '保存する'}
        </button>
      </div>
    </div>
  );
}
