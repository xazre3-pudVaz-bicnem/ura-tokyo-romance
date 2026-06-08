import type { Metadata } from 'next';
import Link from 'next/link';
import TherapistCard from '@/components/ui/TherapistCard';
import { dummyTherapists } from '@/data/dummy-therapists';
import { Calendar, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: '本日の出勤｜東京 女風マッチング 裏東京ロマンス',
  description:
    '裏東京ロマンスの本日の出勤情報。東京の女風セラピストで、今日・今週相談可能なセラピストをご確認いただけます。',
  alternates: { canonical: 'https://ura-tokyo-romance.com/schedule' },
};

export default function SchedulePage() {
  const todayAttending = dummyTherapists.slice(0, 4);
  const weekAttending = dummyTherapists.slice(4);
  const consultAvailable = dummyTherapists.filter((t) => t.consultAvailable);

  return (
    <>
      <section className="pt-32 pb-20 px-5 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold text-[10px] tracking-[0.3em] mb-4">Today&apos;s Schedule</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-5 tracking-wide">本日の出勤</h1>
          <span className="block w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-stone leading-relaxed">
            本日・今週相談可能なセラピストの出勤情報です。
            各セラピストのプロフィールから予約相談フォームでご連絡ください。
          </p>
        </div>
      </section>

      <section className="section-py px-5">
        <div className="max-w-6xl mx-auto">
          {/* Today */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <Calendar size={18} className="text-gold" strokeWidth={1.5} />
              <h2 className="font-display text-2xl text-cream">本日出勤</h2>
              <span className="bg-gold text-base text-[10px] px-3 py-1 tracking-widest">TODAY</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {todayAttending.map((t) => (
                <TherapistCard key={t.id} therapist={t} badge="本日出勤" />
              ))}
            </div>
          </div>

          {/* Consult available */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <Clock size={18} className="text-wine" strokeWidth={1.5} />
              <h2 className="font-display text-2xl text-cream">即日相談可</h2>
              <span className="bg-wine text-cream text-[10px] px-3 py-1 tracking-widest">NOW</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {consultAvailable.map((t) => (
                <TherapistCard key={t.id} therapist={t} />
              ))}
            </div>
          </div>

          {/* This week */}
          {weekAttending.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-display text-2xl text-cream">今週の出勤予定</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                {weekAttending.map((t) => (
                  <TherapistCard key={t.id} therapist={t} />
                ))}
              </div>
            </div>
          )}

          {/* Notice */}
          <div className="bg-surface border border-border p-8 text-center">
            <p className="text-gold text-[10px] tracking-widest mb-3">出勤情報について</p>
            <p className="text-stone text-sm mb-2 leading-relaxed">
              出勤情報は各セラピストが更新します。最新の出勤状況はセラピストのプロフィールをご確認いただくか、
              直接予約相談フォームからお問い合わせください。
            </p>
            <p className="text-mist text-xs mb-6">
              ※掲載情報はグランドオープン（2026年8月1日）前はサンプルデータです。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/therapists" className="btn-primary inline-flex">
                全セラピスト一覧を見る
              </Link>
              <Link href="/search" className="btn-secondary inline-flex">
                条件で絞り込む
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
