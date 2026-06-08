import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';
import TherapistCard from '@/components/ui/TherapistCard';
import { newFaceTherapists } from '@/data/dummy-therapists';

export default function NewFaceSection() {
  if (newFaceTherapists.length === 0) return null;

  return (
    <section className="section-py px-5 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
          <div>
            <SectionTitle
              en="New Face"
              ja="新人セラピスト"
              align="left"
              className="mb-0"
              description="新しく登録されたセラピストをご紹介。まだ口コミが少ない今がチャンスかも。"
            />
          </div>
          <Link href="/newface" className="text-gold text-xs tracking-widest hover:text-gold-light transition-colors mt-6 md:mt-0 flex items-center gap-2">
            新人一覧を見る <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {newFaceTherapists.map((therapist) => (
            <TherapistCard key={therapist.id} therapist={therapist} badge="NEW" />
          ))}
        </div>
      </div>
    </section>
  );
}
