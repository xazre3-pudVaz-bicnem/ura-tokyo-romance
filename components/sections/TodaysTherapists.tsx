import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';
import TherapistCard from '@/components/ui/TherapistCard';
import { dummyTherapists } from '@/data/dummy-therapists';

export default function TodaysTherapists() {
  // In production, this fetches from WordPress /schedule endpoint
  // For now, show the first 4 therapists as "attending today"
  const todayTherapists = dummyTherapists.slice(0, 4);

  return (
    <section className="section-py px-5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
          <SectionTitle
            en="Today's Therapists"
            ja="今日会えるセラピスト"
            align="left"
            className="mb-0"
            description="本日ご対応可能な掲載セラピストをご紹介します。空き状況はプロフィールページでご確認いただけます。"
          />
          <Link href="/schedule" className="text-gold text-xs tracking-widest hover:text-gold-light transition-colors mt-6 md:mt-0 flex items-center gap-2">
            出勤一覧を見る <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {todayTherapists.map((therapist) => (
            <TherapistCard
              key={therapist.id}
              therapist={therapist}
              badge="本日出勤"
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 p-6 border border-border/50 text-center">
          <p className="text-stone text-sm mb-4">
            空き状況はリアルタイムで変動します。気になる掲載セラピストのプロフィールから相談申請を送れます。
          </p>
          <a
            href="/today"
            className="btn-primary inline-flex"
          >
            今日会えるセラピストをすべて見る
          </a>
        </div>
      </div>
    </section>
  );
}
