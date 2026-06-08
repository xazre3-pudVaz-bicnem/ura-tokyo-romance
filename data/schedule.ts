// ─── Types ────────────────────────────────────────────────────────────────

export type AvailabilityStatus = 'available' | 'limited' | 'full' | 'off' | 'inquiry';

export const STATUS_CONFIG: Record<
  AvailabilityStatus,
  { label: string; textColor: string; bgColor: string; borderColor: string; dotColor: string }
> = {
  available: {
    label: '受付中',
    textColor: 'text-emerald-400',
    bgColor: 'bg-emerald-400/10',
    borderColor: 'border-emerald-400/30',
    dotColor: 'bg-emerald-400',
  },
  limited: {
    label: '残りわずか',
    textColor: 'text-orange-400',
    bgColor: 'bg-orange-400/10',
    borderColor: 'border-orange-400/30',
    dotColor: 'bg-orange-400',
  },
  full: {
    label: '満枠',
    textColor: 'text-wine',
    bgColor: 'bg-wine/10',
    borderColor: 'border-wine/30',
    dotColor: 'bg-wine',
  },
  off: {
    label: '休み',
    textColor: 'text-mist',
    bgColor: 'bg-elevated',
    borderColor: 'border-border',
    dotColor: 'bg-border',
  },
  inquiry: {
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
  remaining?: number;
  maxCapacity: number;
  area?: string;
}

export interface DaySchedule {
  date: string; // 'YYYY-MM-DD'
  dayLabel: string; // '今日' | '明日' | '6/11'
  dayName: string;  // '月' | '火' | ...
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

// Simple seedable hash for deterministic "random" scheduling
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

function pickStatus(seed: number, dayOffset: number, slotIdx: number): AvailabilityStatus {
  const v = hash(seed + dayOffset * 7 + slotIdx * 31) % 10;
  if (v < 4) return 'available';
  if (v < 6) return 'limited';
  if (v < 8) return 'full';
  if (v < 9) return 'inquiry';
  return 'full';
}

function isWorkDay(slug: string, dayOfWeek: number, dayOffset: number): boolean {
  const seed = slugSeed(slug);
  const offMask = hash(seed) % 7; // one "off" pattern per therapist
  // ~2 days off per week, varied by therapist
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

    const dayLabel =
      i === 0 ? '今日' : i === 1 ? '明日' : `${month}/${day}`;
    const dayName = DAY_NAMES[dayOfWeek];

    if (!isWorkDay(slug, dayOfWeek, i)) {
      result.push({
        date: dateStr,
        dayLabel,
        dayName,
        overallStatus: 'off',
        slots: [],
      });
      continue;
    }

    // Pick 2 or 3 time slots
    const slotCount = hash(seed + i * 17) % 2 === 0 ? 3 : 2;
    const templates = SLOT_TEMPLATES.slice(0, slotCount);

    const slots: TimeSlot[] = templates.map((tpl, idx) => {
      const status = pickStatus(seed, i, idx);
      return {
        id: `${dateStr}-${idx}`,
        startTime: tpl.startTime,
        endTime: tpl.endTime,
        status,
        remaining: status === 'limited' ? 1 + (hash(seed + i + idx) % 2) : undefined,
        maxCapacity: 3,
      };
    });

    const hasAvailable = slots.some((s) => s.status === 'available');
    const hasLimited = slots.some((s) => s.status === 'limited');
    const hasInquiry = slots.some((s) => s.status === 'inquiry');
    const allFull = slots.every((s) => s.status === 'full');

    const overallStatus: AvailabilityStatus = hasAvailable
      ? 'available'
      : hasLimited
      ? 'limited'
      : hasInquiry
      ? 'inquiry'
      : allFull
      ? 'full'
      : 'off';

    result.push({
      date: dateStr,
      dayLabel,
      dayName,
      overallStatus,
      slots,
    });
  }

  return result;
}
