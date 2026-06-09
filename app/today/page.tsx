import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Filter } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import TherapistCard from '@/components/ui/TherapistCard';
import { dummyTherapists, todayTherapists } from '@/data/dummy-therapists';

export const metadata: Metadata = {
  title: '今日会えるセラピスト｜東京 女風 今日会える 裏東京ロマンス',
  keywords: [
    '東京 女風 今日会える', '女風 今日 東京', '女風 当日 予約', '女性用風俗 今日', '東京 女風 即日',
  ],
  description:
    '今日会えるセラピスト一覧。東京で女風を今日利用したい女性向けに、当日対応可能なセラピストを掲載しています。即日相談可のセラピストもいます。',
  alternates: { canonical: 'https://uratokyoromance.com/today' },
};

export default function TodayPage() {
  const instantConsult = dummyTherapists.filter((t) => t.consultAvailable && t.availableToday);
  const available = todayTherapists;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '今日会えるセラピスト',
    description: '東京で今日会えるセラピスト一覧',
    numberOfItems: available.length,
    itemListElement: available.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      url: `https://uratokyoromance.com/therapists/${t.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="pt-32 pb-16 px-5 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold text-[10px] tracking-[0.3em] mb-4">Today</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-5 tracking-wide">
            今日会えるセラピスト
          </h1>
          <span className="block w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-stone leading-relaxed mb-6">
            今日・本日出勤予定のセラピスト一覧です。<br />
            急なご利用でも、まずはプロフィールからご相談ください。
          </p>
          <div className="inline-flex items-center gap-2 bg-wine/10 border border-wine/30 px-4 py-2">
            <Calendar size={14} className="text-wine" />
            <span className="text-wine text-xs tracking-wider">本日出勤予定：{available.length}名</span>
          </div>
        </div>
      </section>

      {/* Pre-launch notice */}
      <section className="px-5 py-4 bg-elevated border-b border-border">
        <div className="max-w-5xl mx-auto">
          <p className="text-mist text-xs text-center">
            ※ グランドオープン前のため、出勤情報はサンプルデータです。2026年8月1日以降、リアルタイムで更新されます。
          </p>
        </div>
      </section>

      <section className="section-py px-5">
        <div className="max-w-5xl mx-auto">

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            {[
              { icon: Calendar, label: '本日出勤', value: `${available.length}名` },
              { icon: Clock, label: '即日相談可', value: `${instantConsult.length}名` },
              { icon: MapPin, label: '対応エリア', value: '東京全域' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="card-luxury p-5 text-center">
                <Icon size={16} className="text-gold mx-auto mb-2" strokeWidth={1.5} />
                <p className="text-cream text-lg font-display mb-1">{value}</p>
                <p className="text-mist text-[10px] tracking-widest">{label}</p>
              </div>
            ))}
          </div>

          {/* Today's therapists */}
          {available.length > 0 ? (
            <>
              <SectionTitle en="Available Today" ja="本日出勤のセラピスト" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {available.map((t) => (
                  <TherapistCard key={t.id} therapist={t} badge="今日会える" />
                ))}
              </div>
            </>
          ) : (
            <div className="card-luxury p-12 text-center mb-12">
              <Calendar size={32} className="text-mist mx-auto mb-4" strokeWidth={1} />
              <p className="text-cream mb-2">本日の出勤情報がまだありません</p>
              <p className="text-stone text-sm">グランドオープン後にリアルタイムで更新されます</p>
            </div>
          )}

          {/* Instant consult section */}
          <SectionTitle en="Instant Consult" ja="即日相談可能なセラピスト" description="急なご相談も受け付けているセラピストです。まずはお気軽にご連絡ください。" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {dummyTherapists
              .filter((t) => t.consultAvailable)
              .slice(0, 8)
              .map((t) => (
                <TherapistCard key={t.id} therapist={t} />
              ))}
          </div>

          {/* Area filter note */}
          <div className="card-luxury p-8 mb-8">
            <div className="flex items-start gap-4">
              <Filter size={18} className="text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <p className="text-cream text-sm mb-2">エリアで絞り込む</p>
                <p className="text-stone text-xs leading-relaxed mb-4">
                  特定のエリアで今日会えるセラピストを探す場合は、セラピスト一覧ページからエリアと「今日会える」フィルターを組み合わせて検索できます。
                </p>
                <div className="flex flex-wrap gap-2">
                  {['新宿', '渋谷', '銀座', '六本木', '池袋', '恵比寿', '表参道', '品川'].map((area) => (
                    <Link
                      key={area}
                      href={`/therapists?area=${encodeURIComponent(area)}&today=1`}
                      className="tag-pill hover:border-gold/60 transition-colors"
                    >
                      {area}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/therapists" className="btn-primary">全セラピストを見る</Link>
            <Link href="/schedule" className="btn-secondary">出勤スケジュールを確認</Link>
          </div>
        </div>
      </section>
    </>
  );
}
