// ─── Types ────────────────────────────────────────────────────────────────

export type AvailabilityStatus = 'available' | 'limited' | 'full' | 'off' | 'inquiry';

// 表示上は 受付中 / 受付済 / 要相談 の3種類が基本。
// `limited` は後方互換のため残すが、表示上は `available` と同一扱い。
export const STATUS_CONFIG: Record<
  AvailabilityStatus,
  { label: string; textColor: string; bgColor: string; borderColor: string; dotColor: string }
> = {
  available: {
    label: '受付中',
    textColor: 'text-emerald-400',
    bgColor: 'bg-emerald-400/10',
    borderColor: 'border-emerald-400/40',
    dotColor: 'bg-emerald-400',
  },
  limited: {
    // 後方互換: 受付中と同一表示
    label: '受付中',
    textColor: 'text-emerald-400',
    bgColor: 'bg-emerald-400/10',
    borderColor: 'border-emerald-400/40',
    dotColor: 'bg-emerald-400',
  },
  full: {
    label: '受付済',
    textColor: 'text-rose-400',
    bgColor: 'bg-rose-400/8',
    borderColor: 'border-rose-400/30',
    dotColor: 'bg-rose-400',
  },
  off: {
    label: '休み',
    textColor: 'text-mist',
    bgColor: 'bg-elevated',
    borderColor: 'border-border',
    dotColor: 'bg-border',
  },
  inquiry: {
    // 特殊ケースのみ（移動中・場所相談・時間調整可能 等）
    label: '要相談',
    textColor: 'text-sky-300',
    bgColor: 'bg-sky-300/10',
    borderColor: 'border-sky-300/30',
    dotColor: 'bg-sky-300',
  },
};

export interface TimeSlot {
  id: string;
  startTime: string; // 'HH:MM'
  endTime: string;   // 'HH:MM'
  status: AvailabilityStatus;
  maxCapacity: number;
  area?: string;
}

export interface DaySchedule {
  date: string;      // 'YYYY-MM-DD'
  dayLabel: string;  // '今日' | '明日' | '6/11'
  dayName: string;   // '月' | '火' | ...
  overallStatus: AvailabilityStatus;
  slots: TimeSlot[];
  note?: string;
}

// Future-proof booking schema (Supabase-ready)
export type BookingStatus =
  | 'pending'     // 申請済み
  | 'confirmed'   // 確定
  | 'completed'   // 完了
  | 'cancelled'   // キャンセル
  | 'rejected';   // 非承認

export interface BookingRequest {
  id: string;
  therapistSlug: string;
  date: string;
  timeSlotId: string;
  startTime: string;
  endTime: string;
  nickname: string;
  email: string;
  lineId?: string;
  preferredArea: string;
  message: string;
  status: BookingStatus;
  notifiedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Schedule generation ──────────────────────────────────────────────────

const DAY_NAMES = ['日', '月', '火', '水', '木', '金', '土'];

const SLOT_TEMPLATES = [
  { startTime: '12:00', endTime: '15:00' },
  { startTime: '15:00', endTime: '18:00' },
  { startTime: '18:00', endTime: '24:00' },
];

// Simple seedable hash for deterministic scheduling
function hash(n: number): number {
  let x = n;
  x = ((x >>> 16) ^ x) * 0x45d9f3b;
  x = ((x >>> 16) ^ x) * 0x45d9f3b;
  x = (x >>> 16) ^ x;
  return Math.abs(x);
}

function slugSeed(slug: string): number {
  return slug.split('').reduce((acc, c, i) => acc + c.charCodeAt(0) * (i + 1), 0);
}

// 受付中 50% / 受付済 40% / 要相談 10%（特殊ケースのみ）
function pickStatus(seed: number, dayOffset: number, slotIdx: number): AvailabilityStatus {
  const v = hash(seed + dayOffset * 7 + slotIdx * 31) % 10;
  if (v < 5) return 'available'; // 50%
  if (v < 9) return 'full';      // 40%
  return 'inquiry';              // 10%（移動中・場所相談等の特殊ケース）
}

function isWorkDay(slug: string, dayOfWeek: number, dayOffset: number): boolean {
  const seed = slugSeed(slug);
  return hash(seed + dayOfWeek * 13 + dayOffset * 3) % 4 !== 0;
}

export function generateSchedule(slug: string, days = 14): DaySchedule[] {
  const seed = slugSeed(slug);
  const today = new Date();
  const result: DaySchedule[] = [];

  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);

    const dateStr = d.toISOString().split('T')[0];
    const dayOfWeek = d.getDay();
    const month = d.getMonth() + 1;
    const day = d.getDate();

    const dayLabel = i === 0 ? '今日' : i === 1 ? '明日' : `${month}/${day}`;
    const dayName = DAY_NAMES[dayOfWeek];

    if (!isWorkDay(slug, dayOfWeek, i)) {
      result.push({ date: dateStr, dayLabel, dayName, overallStatus: 'off', slots: [] });
      continue;
    }

    // 2〜3枠
    const slotCount = hash(seed + i * 17) % 2 === 0 ? 3 : 2;
    const templates = SLOT_TEMPLATES.slice(0, slotCount);

    const slots: TimeSlot[] = templates.map((tpl, idx) => ({
      id: `${dateStr}-${idx}`,
      startTime: tpl.startTime,
      endTime: tpl.endTime,
      status: pickStatus(seed, i, idx),
      maxCapacity: 1,
    }));

    // overall: 受付中 > 要相談 > 受付済
    const hasAvailable = slots.some((s) => s.status === 'available' || s.status === 'limited');
    const hasInquiry = slots.some((s) => s.status === 'inquiry');
    const allFull = slots.every((s) => s.status === 'full');

    const overallStatus: AvailabilityStatus = hasAvailable
      ? 'available'
      : hasInquiry
      ? 'inquiry'
      : allFull
      ? 'full'
      : 'off';

    result.push({ date: dateStr, dayLabel, dayName, overallStatus, slots });
  }

  return result;
}
