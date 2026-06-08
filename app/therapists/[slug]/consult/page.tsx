import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import ConsultForm from '@/components/sections/ConsultForm';
import { dummyTherapists } from '@/data/dummy-therapists';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const t = dummyTherapists.find((t) => t.slug === slug);
  if (!t) return {};
  return {
    title: `${t.name}への相談｜裏東京ロマンス`,
    description: `${t.name}（${t.age}歳）への予約相談フォーム。ご希望の日時・エリア・コースをお知らせください。`,
  };
}

export async function generateStaticParams() {
  return dummyTherapists.map((t) => ({ slug: t.slug }));
}

export default async function TherapistConsultPage({ params }: PageProps) {
  const { slug } = await params;
  const therapist = dummyTherapists.find((t) => t.slug === slug);
  if (!therapist) notFound();

  const minPrice = Math.min(...therapist.plans.map((p) => p.price));

  return (
    <div className="min-h-screen pt-32 pb-20 px-5">
      <div className="max-w-2xl mx-auto">
        {/* Back */}
        <Link
          href={`/therapists/${therapist.slug}`}
          className="flex items-center gap-2 text-stone text-xs hover:text-cream transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          {therapist.name}のプロフィールに戻る
        </Link>

        {/* Therapist mini card */}
        <div className="card-luxury p-6 flex items-center gap-5 mb-8">
          <div className="w-16 h-20 bg-elevated border border-border flex-shrink-0 flex items-center justify-center">
            <span className="text-2xl font-display text-stone/40">{therapist.name[0]}</span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="font-display text-xl text-cream">{therapist.name}</p>
              {therapist.verifiedId && (
                <div className="flex items-center gap-1">
                  <ShieldCheck size={13} className="text-gold" />
                  <span className="text-gold text-[10px]">本人確認済</span>
                </div>
              )}
            </div>
            <p className="text-stone text-xs mb-2">{therapist.age}歳 / {therapist.height}cm</p>
            <p className="text-gold text-xs">
              <span className="text-stone text-[10px] mr-1">60分〜</span>
              ¥{minPrice.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-elevated border border-border p-5 mb-8">
          <p className="text-gold text-[10px] tracking-widest mb-3">予約相談の前に</p>
          <ul className="space-y-2 text-stone text-xs leading-relaxed">
            <li>・希望の日時・エリア・コース（時間）をお伝えいただくとスムーズです。</li>
            <li>・料金や内容の確認はフォームを通じて行います。</li>
            <li>・返信はセラピストから2〜3日以内に行われます（確認ができない場合があります）。</li>
            <li>・18歳未満の方はご利用いただけません。</li>
          </ul>
        </div>

        {/* Plans reference */}
        <div className="card-luxury p-5 mb-8">
          <p className="text-gold text-[10px] tracking-widest mb-3">{therapist.name}のプラン</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {therapist.plans.map((plan) => (
              <div key={plan.name} className="border border-border p-3 text-center">
                <p className="text-stone text-xs mb-1">{plan.name}</p>
                <p className="text-gold text-sm">¥{plan.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        <ConsultForm therapistName={therapist.name} />
      </div>
    </div>
  );
}
