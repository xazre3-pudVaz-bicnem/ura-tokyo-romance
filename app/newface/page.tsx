import type { Metadata } from 'next';
import SectionTitle from '@/components/ui/SectionTitle';
import TherapistCard from '@/components/ui/TherapistCard';
import { dummyTherapists } from '@/data/dummy-therapists';

export const metadata: Metadata = {
  title: '新人セラピスト｜東京 女風マッチング 裏東京ロマンス',
  description:
    '裏東京ロマンスに新しく登録されたセラピストをご紹介します。東京の女風マッチングで、新しいセラピストとのフレッシュな出会いを。',
  alternates: { canonical: 'https://uratokyoromance.com/newface' },
};

export default function NewFacePage() {
  const newFaces = dummyTherapists.filter((t) => t.isNew);
  const others = dummyTherapists.filter((t) => !t.isNew).slice(0, 4);

  return (
    <>
      <section className="pt-32 pb-20 px-5 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold text-[10px] tracking-[0.3em] mb-4">New Face</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-5 tracking-wide">新人セラピスト</h1>
          <span className="block w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-stone leading-relaxed">
            裏東京ロマンスに新しく加わったセラピストをご紹介します。
            新しいセラピストとの出会いを大切に。
          </p>
        </div>
      </section>

      <section className="section-py px-5">
        <div className="max-w-6xl mx-auto">
          {newFaces.length > 0 ? (
            <>
              <SectionTitle en="New Members" ja="新入りセラピスト" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 mb-16">
                {newFaces.map((t) => (
                  <TherapistCard key={t.id} therapist={t} badge="NEW" />
                ))}
              </div>
            </>
          ) : (
            <p className="text-stone text-center text-sm mb-16">現在新人セラピストは随時募集中です。</p>
          )}

          <SectionTitle en="All Therapists" ja="在籍セラピスト" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {others.map((t) => (
              <TherapistCard key={t.id} therapist={t} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
