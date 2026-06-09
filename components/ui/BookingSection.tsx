'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { MessageCircle, Heart, BarChart2, X, Check, ChevronRight, Calendar, Clock, Send, Loader2, AlertCircle } from 'lucide-react';
import {
  generateSchedule,
  STATUS_CONFIG,
  type DaySchedule,
  type TimeSlot,
} from '@/data/schedule';
import { isFavorited, toggleFavorite } from '@/lib/favorites';
import { isInCompare, toggleCompare } from '@/lib/compare';
import ContactMethodModal from './ContactMethodModal';

// ─── Types ────────────────────────────────────────────────────────────────

interface BookingSectionProps {
  therapistSlug: string;
  therapistName: string;
  areas: string[];
}

interface BookingContext {
  day: DaySchedule;
  slot: TimeSlot | null;
}

// ─── Email Form Modal ──────────────────────────────────────────────────────

function EmailFormModal({
  therapistName,
  areas,
  context,
  onClose,
}: {
  therapistName: string;
  areas: string[];
  context: BookingContext;
  onClose: () => void;
}) {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [lineId, setLineId] = useState('');
  const [preferredArea, setPreferredArea] = useState(areas[0] ?? '');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const dateLabel = (() => {
    const { day } = context;
    if (day.dayLabel === '今日' || day.dayLabel === '明日') return day.dayLabel;
    const [, m, d] = day.date.split('-').map(Number);
    return `${m}月${d}日（${day.dayName}）`;
  })();
  const timeLabel = context.slot ? `${context.slot.startTime}〜${context.slot.endTime}` : null;

  const handleSubmit = () => {
    if (!nickname.trim()) return;
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1500);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-base/90 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-surface border border-border md:rounded-sm max-h-[92dvh] flex flex-col modal-slide-up">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
          <div>
            <p className="text-gold text-[10px] tracking-widest">Mail Form</p>
            <h2 className="text-cream text-base font-display">{therapistName}に相談する</h2>
          </div>
          <button onClick={onClose} className="text-mist hover:text-stone transition-colors p-1">
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
              <div className="w-14 h-14 bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center mb-5">
                <Check size={24} className="text-emerald-400" />
              </div>
              <h3 className="font-display text-2xl text-cream mb-3">送信しました</h3>
              <p className="text-stone text-sm leading-relaxed mb-2">
                相談内容を受け付けました。運営より折り返しご連絡します。
              </p>
              <p className="text-mist text-xs leading-relaxed mb-6">
                通常1〜2営業日以内にメールまたはLINEでご連絡します。
              </p>
              <button onClick={onClose} className="btn-primary px-8 py-2.5 text-sm">閉じる</button>
            </div>
          ) : (
            <div className="px-6 py-5 space-y-5">
              {/* Pre-filled context */}
              <div className="bg-elevated border border-border p-4 flex flex-wrap gap-x-4 gap-y-2">
                <div className="flex items-center gap-2">
                  <MessageCircle size={13} className="text-gold/70" strokeWidth={1.5} />
                  <span className="text-cream text-xs">{therapistName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={13} className="text-gold/70" strokeWidth={1.5} />
                  <span className="text-stone text-xs">
                    {dateLabel}
                    {timeLabel && <span className="ml-1.5 text-cream">{timeLabel}</span>}
                  </span>
                </div>
                {!context.slot && (
                  <p className="w-full text-mist text-[10px]">時間帯は下の入力欄でご指定ください</p>
                )}
              </div>

              <div>
                <label className="block text-mist text-[10px] tracking-widest mb-2">ニックネーム <span className="text-wine">*</span></label>
                <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)}
                  placeholder="例：さくら"
                  className="w-full bg-elevated border border-border text-cream px-4 py-2.5 text-sm outline-none focus:border-gold/50 transition-colors" />
              </div>
              <div>
                <label className="block text-mist text-[10px] tracking-widest mb-2">メールアドレス</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-elevated border border-border text-cream px-4 py-2.5 text-sm outline-none focus:border-gold/50 transition-colors" />
              </div>
              <div>
                <label className="block text-mist text-[10px] tracking-widest mb-2">LINE ID</label>
                <input type="text" value={lineId} onChange={(e) => setLineId(e.target.value)}
                  placeholder="例：@username"
                  className="w-full bg-elevated border border-border text-cream px-4 py-2.5 text-sm outline-none focus:border-gold/50 transition-colors" />
                <p className="text-mist text-[10px] mt-1">メールまたはLINEのどちらかをご入力ください</p>
              </div>
              {!context.slot && (
                <div>
                  <label className="block text-mist text-[10px] tracking-widest mb-2">希望時間帯</label>
                  <input type="text" placeholder="例：18:00〜21:00頃"
                    className="w-full bg-elevated border border-border text-cream px-4 py-2.5 text-sm outline-none focus:border-gold/50 transition-colors" />
                </div>
              )}
              <div>
                <label className="block text-mist text-[10px] tracking-widest mb-2">希望エリア <span className="text-wine">*</span></label>
                <select value={preferredArea} onChange={(e) => setPreferredArea(e.target.value)}
                  className="w-full bg-elevated border border-border text-cream px-4 py-2.5 text-sm outline-none focus:border-gold/50">
                  {areas.map((area) => <option key={area} value={area}>{area}</option>)}
                  <option value="その他">その他（備考欄に記入）</option>
                </select>
              </div>
              <div>
                <label className="block text-mist text-[10px] tracking-widest mb-2">相談内容</label>
                <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)}
                  placeholder="初めての利用で不安なことがあれば何でもご相談ください。"
                  className="w-full bg-elevated border border-border text-cream px-4 py-2.5 text-sm outline-none focus:border-gold/50 resize-none placeholder:text-mist" />
              </div>
              <div className="bg-elevated/50 border border-border/50 p-3 flex items-start gap-2">
                <AlertCircle size={12} className="text-mist flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <p className="text-mist text-[10px] leading-relaxed">
                  当サービスは情報掲載とマッチングを提供します。実際のサービス内容は当事者間の合意に基づきます。18歳未満のご利用は禁止されています。
                </p>
              </div>
            </div>
          )}
        </div>

        {!submitted && (
          <div className="px-6 py-4 border-t border-border flex-shrink-0">
            <button onClick={handleSubmit} disabled={!nickname.trim() || submitting}
              className="w-full btn-primary py-3 flex items-center justify-center gap-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed">
              {submitting ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
              {submitting ? '送信中...' : '相談を送る'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sticky Bottom Bar ─────────────────────────────────────────────────────

function StickyBar({
  therapistSlug,
  onConsult,
}: {
  therapistSlug: string;
  therapistName: string;
  onConsult: () => void;
}) {
  const [favorited, setFavorited] = useState(false);
  const [inCompare, setInCompare] = useState(false);
  const [compareFlash, setCompareFlash] = useState(false);

  useEffect(() => {
    setFavorited(isFavorited(therapistSlug));
    setInCompare(isInCompare(therapistSlug));
    const onFav = () => setFavorited(isFavorited(therapistSlug));
    const onCmp = () => setInCompare(isInCompare(therapistSlug));
    window.addEventListener('favoritesUpdate', onFav);
    window.addEventListener('compareUpdate', onCmp);
    return () => {
      window.removeEventListener('favoritesUpdate', onFav);
      window.removeEventListener('compareUpdate', onCmp);
    };
  }, [therapistSlug]);

  const handleFavorite = () => { toggleFavorite(therapistSlug); setFavorited(isFavorited(therapistSlug)); };
  const handleCompare = () => {
    const result = toggleCompare(therapistSlug);
    setInCompare(isInCompare(therapistSlug));
    if (!result.added && result.reason === 'max_reached') {
      setCompareFlash(true);
      setTimeout(() => setCompareFlash(false), 2000);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      {compareFlash && (
        <div className="bg-wine text-cream text-[10px] text-center py-1.5 px-4">比較は最大3名まで</div>
      )}
      <div className="bg-base/95 backdrop-blur-md border-t border-border">
        <div className="flex items-stretch">
          <button onClick={onConsult}
            className="flex-1 flex flex-col items-center gap-1 py-3.5 text-cream hover:bg-elevated transition-colors border-r border-border">
            <MessageCircle size={18} strokeWidth={1.5} />
            <span className="text-[10px] tracking-wide">相談する</span>
          </button>
          <button onClick={handleFavorite}
            className="flex-1 flex flex-col items-center gap-1 py-3.5 border-r border-border transition-colors hover:bg-elevated">
            <Heart size={18} strokeWidth={1.5} className={favorited ? 'text-wine fill-wine' : 'text-stone'} />
            <span className={`text-[10px] tracking-wide ${favorited ? 'text-wine' : 'text-stone'}`}>
              {favorited ? '保存済み' : 'お気に入り'}
            </span>
          </button>
          <button onClick={handleCompare}
            className="flex-1 flex flex-col items-center gap-1 py-3.5 transition-colors hover:bg-elevated">
            <BarChart2 size={18} strokeWidth={1.5} className={inCompare ? 'text-gold' : 'text-stone'} />
            <span className={`text-[10px] tracking-wide ${inCompare ? 'text-gold' : 'text-stone'}`}>
              {inCompare ? '比較中' : '比較する'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Slot Row ──────────────────────────────────────────────────────────────

function SlotRow({
  slot,
  onBook,
}: {
  slot: TimeSlot;
  onBook: () => void;
}) {
  const cfg = STATUS_CONFIG[slot.status];
  const isAvailable = slot.status === 'available' || slot.status === 'limited';
  const isBooked = slot.status === 'full';
  const isInquiry = slot.status === 'inquiry';
  const canBook = isAvailable || isInquiry;

  return (
    <div className={`flex items-center gap-4 px-5 py-4 border-l-2 ${cfg.borderColor} transition-all duration-200 ${
      isBooked ? 'opacity-45' : canBook ? 'hover:bg-elevated/40 cursor-pointer' : ''
    }`}
      onClick={canBook ? onBook : undefined}
    >
      {/* Dot indicator */}
      <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${cfg.dotColor} ${
        isAvailable ? 'shadow-[0_0_6px_2px_rgba(52,211,153,0.35)]' : ''
      }`} />

      {/* Time */}
      <div className="flex-1 min-w-0">
        <p className={`font-display text-lg leading-tight tracking-wide ${isBooked ? 'text-stone/50' : 'text-cream'}`}>
          {slot.startTime}
          <span className="text-mist/50 text-sm font-sans mx-1.5">〜</span>
          {slot.endTime}
        </p>
        {isInquiry && (
          <p className="text-sky-300/70 text-[10px] mt-0.5">移動中・場所・時間の調整が必要なケース</p>
        )}
      </div>

      {/* Status badge + CTA */}
      {isBooked ? (
        <div className="flex items-center gap-1.5 text-rose-400/60 flex-shrink-0">
          <span className="text-[11px] tracking-widest">受付済</span>
        </div>
      ) : canBook ? (
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`text-[10px] px-2 py-0.5 border ${cfg.textColor} ${cfg.borderColor} ${cfg.bgColor} tracking-widest`}>
            {cfg.label}
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); onBook(); }}
            className={`text-[11px] tracking-wider px-4 py-2 transition-all duration-200 ${
              isAvailable
                ? 'bg-emerald-400/10 border border-emerald-400/40 text-emerald-400 hover:bg-emerald-400/20'
                : 'bg-sky-300/10 border border-sky-300/40 text-sky-300 hover:bg-sky-300/20'
            }`}
          >
            相談する
          </button>
        </div>
      ) : null}
    </div>
  );
}

// ─── Main Booking Section ──────────────────────────────────────────────────

export default function BookingSection({ therapistSlug, therapistName, areas }: BookingSectionProps) {
  const schedule = useMemo(() => generateSchedule(therapistSlug, 14), [therapistSlug]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [methodCtx, setMethodCtx] = useState<BookingContext | null>(null);
  const [formCtx, setFormCtx] = useState<BookingContext | null>(null);
  const dateBarRef = useRef<HTMLDivElement>(null);
  const selectedDay = schedule[selectedIdx];

  const openMethodModal = (day: DaySchedule, slot: TimeSlot | null = null) => {
    setFormCtx(null);
    setMethodCtx({ day, slot });
  };

  const handleEmailFormSelected = () => {
    if (methodCtx) { setFormCtx(methodCtx); setMethodCtx(null); }
  };

  const closeAll = () => { setMethodCtx(null); setFormCtx(null); };

  const buildContactContext = (ctx: BookingContext) => {
    const { day, slot } = ctx;
    const [, m, d] = day.date.split('-').map(Number);
    const dateLabel = day.dayLabel === '今日' || day.dayLabel === '明日'
      ? `${day.dayLabel} ${m}月${d}日（${day.dayName}）`
      : `${m}月${d}日（${day.dayName}）`;
    return {
      therapistName,
      dateLabel,
      timeLabel: slot ? `${slot.startTime}〜${slot.endTime}` : undefined,
      areaLabel: areas[0],
    };
  };

  const formatFullDate = (day: DaySchedule) => {
    const [, m, d] = day.date.split('-').map(Number);
    if (day.dayLabel === '今日') return `今日 ${m}月${d}日（${day.dayName}）`;
    if (day.dayLabel === '明日') return `明日 ${m}月${d}日（${day.dayName}）`;
    return `${m}月${d}日（${day.dayName}）`;
  };

  // Count bookable slots for the selected day
  const bookableCount = selectedDay.slots.filter(
    (s) => s.status === 'available' || s.status === 'limited' || s.status === 'inquiry'
  ).length;

  return (
    <>
      {/* ── Availability Calendar ────────────────────────────── */}
      <section id="availability" className="py-10 px-5 bg-[#0D0B0B] border-y border-border">
        <div className="max-w-4xl mx-auto">

          {/* Section header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <Calendar size={16} className="text-gold" strokeWidth={1.5} />
              <div>
                <p className="text-gold text-[10px] tracking-widest">Availability</p>
                <h2 className="font-display text-xl text-cream">出勤・空き状況</h2>
              </div>
            </div>
            {/* 凡例: 3種類のみ */}
            <div className="flex items-center gap-4">
              {([
                { status: 'available', label: '受付中' },
                { status: 'full',      label: '受付済' },
                { status: 'inquiry',   label: '要相談' },
              ] as const).map(({ status, label }) => (
                <div key={status} className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${STATUS_CONFIG[status].dotColor}`} />
                  <span className="text-mist text-[10px]">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Date bar */}
          <div ref={dateBarRef}
            className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide -mx-5 px-5">
            {schedule.map((day, i) => {
              const cfg = STATUS_CONFIG[day.overallStatus];
              const isSelected = i === selectedIdx;
              return (
                <button key={day.date} onClick={() => setSelectedIdx(i)}
                  className={`flex-shrink-0 flex flex-col items-center gap-1.5 w-[3.75rem] py-3 border transition-all duration-200 ${
                    isSelected
                      ? `border-2 ${cfg.borderColor} ${cfg.bgColor}`
                      : 'border-border hover:border-gold/30 bg-elevated'
                  }`}>
                  <span className="text-[9px] tracking-wide text-mist leading-none">{day.dayName}</span>
                  <span className={`text-base font-display leading-none ${isSelected ? cfg.textColor : 'text-cream'}`}>
                    {day.dayLabel === '今日' || day.dayLabel === '明日'
                      ? day.dayLabel.slice(0, 2)
                      : day.dayLabel.split('/')[1]}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${cfg.dotColor}`} />
                </button>
              );
            })}
          </div>

          {/* Day detail card */}
          <div className="card-luxury overflow-hidden">
            {/* Day header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-elevated/30">
              <div>
                <h3 className="text-cream text-sm font-display">{formatFullDate(selectedDay)}</h3>
                {selectedDay.overallStatus !== 'off' && bookableCount > 0 && (
                  <p className="text-emerald-400 text-[10px] mt-0.5">
                    相談可能な時間帯が{bookableCount}枠あります
                  </p>
                )}
                {selectedDay.overallStatus !== 'off' && bookableCount === 0 && (
                  <p className="text-rose-400/70 text-[10px] mt-0.5">
                    この日の空き枠はすべて受付済です
                  </p>
                )}
              </div>
              <span className={`text-[10px] px-2.5 py-1 border tracking-widest ${
                STATUS_CONFIG[selectedDay.overallStatus].textColor
              } ${STATUS_CONFIG[selectedDay.overallStatus].borderColor} ${
                STATUS_CONFIG[selectedDay.overallStatus].bgColor
              }`}>
                {STATUS_CONFIG[selectedDay.overallStatus].label}
              </span>
            </div>

            {/* Slots */}
            {selectedDay.overallStatus === 'off' || selectedDay.slots.length === 0 ? (
              <div className="flex flex-col items-center py-12 gap-3">
                <Clock size={28} className="text-border" strokeWidth={1} />
                <p className="text-mist text-sm">この日は休みです</p>
                <p className="text-mist text-[10px]">前後の日程をご確認ください</p>
              </div>
            ) : (
              <div className="divide-y divide-border/40">
                {selectedDay.slots.map((slot) => (
                  <SlotRow
                    key={slot.id}
                    slot={slot}
                    onBook={() => openMethodModal(selectedDay, slot)}
                  />
                ))}
              </div>
            )}

            {/* Footer CTA */}
            {selectedDay.overallStatus !== 'off' && (
              <div className="px-5 py-3.5 border-t border-border/50 bg-elevated/20 flex items-center justify-between">
                <p className="text-mist text-[10px]">
                  希望の時間帯がなければ日程相談も可
                </p>
                <button onClick={() => openMethodModal(selectedDay, null)}
                  className="flex items-center gap-1.5 text-gold text-xs hover:underline">
                  日程のみ相談する <ChevronRight size={12} />
                </button>
              </div>
            )}
          </div>

          <p className="text-mist text-[10px] mt-4 leading-relaxed">
            ※ 空き状況はセラピストが更新した目安です。確定は相談成立後となります。当サービスは情報掲載とマッチングを提供します。
          </p>
        </div>
      </section>

      {/* ── Method Selection Modal ────────────────────────────── */}
      {methodCtx && (
        <ContactMethodModal
          context={buildContactContext(methodCtx)}
          onEmailForm={handleEmailFormSelected}
          onClose={closeAll}
        />
      )}

      {/* ── Email Form Modal ──────────────────────────────────── */}
      {formCtx && (
        <EmailFormModal
          therapistName={therapistName}
          areas={areas}
          context={formCtx}
          onClose={closeAll}
        />
      )}

      {/* ── Sticky Bottom Bar (mobile only) ──────────────────── */}
      <StickyBar
        therapistSlug={therapistSlug}
        therapistName={therapistName}
        onConsult={() => openMethodModal(selectedDay, null)}
      />
    </>
  );
}
