import type { Metadata } from 'next';
import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';
import TherapistCard from '@/components/ui/TherapistCard';
import { dummyTherapists } from '@/data/dummy-therapists';
import { Search, SlidersHorizontal, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: '東京 女風セラピスト一覧｜女性用風俗 セラピスト検索 裏東京ロマンス',
  keywords: ['東京 女風 セラピスト', '女性用風俗 セラピスト 東京', '東京 女風 マッチング', '女風 セラピスト 検索', '東京 女性用風俗'],
  description:
    '東京で女風セラピストを探すなら裏東京ロマンス。本人確認済みのセラピスト一覧。エリア・雰囲気・料金・口コミで絞り込み検索。女性用風俗・女風マッチングプラットフォーム。',
  alternates: { canonical: 'https://ura-tokyo-romance.com/therapists' },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: '裏東京ロマンス セラピスト一覧',
  description: '東京の女風セラピスト一覧',
  numberOfItems: dummyTherapists.length,
};

const tags = ['すべて', '癒し系', '落ち着いた雰囲気', '大人の余裕', '聞き上手', '会話重視', '初めての方におすすめ', '外出デート対応', '即日相談可', '新人'];
const sortOptions = ['おすすめ順', '口コミ数順', '人気順', '新着順'];

export default function TherapistsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="pt-32 pb-16 px-5 bg-surface border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-gold text-[10px] tracking-[0.3em] mb-4">Find Therapist</p>
            <h1 className="font-display text-4xl md:text-5xl text-cream mb-5 tracking-wide">セラピストを探す</h1>
            <span className="block w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
            <p className="text-stone leading-relaxed max-w-xl mx-auto">
              東京で女風を探している女性のために、本人確認済みのセラピストを掲載しています。
              プロフィール・口コミ・料金を比較して、あなたに合うセラピストを見つけてください。
            </p>
          </div>

          {/* Quick search bar */}
          <div className="flex items-center gap-3 max-w-xl mx-auto">
            <div className="flex-1 flex items-center gap-3 bg-elevated border border-border px-4 py-3">
              <Search size={15} className="text-stone flex-shrink-0" />
              <input
                type="text"
                placeholder="名前・エリア・雰囲気で検索..."
                className="flex-1 bg-transparent text-cream text-sm placeholder:text-mist outline-none"
              />
            </div>
            <Link href="/search" className="flex items-center gap-2 border border-border text-stone px-4 py-3 hover:border-gold hover:text-gold transition-colors text-xs">
              <SlidersHorizontal size={15} />
              詳細検索
            </Link>
          </div>
        </div>
      </section>

      <section className="section-py px-5">
        <div className="max-w-6xl mx-auto">
          {/* Sort + Count */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-gold" />
              <span className="text-stone text-sm">
                <span className="text-cream font-sans">{dummyTherapists.length}</span>名のセラピストが掲載中
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-mist text-xs">並び替え：</span>
              {sortOptions.map((opt, i) => (
                <button
                  key={opt}
                  className={`text-xs px-3 py-1 border transition-all duration-200 ${
                    i === 0 ? 'border-gold text-gold' : 'border-border text-stone hover:border-stone/60'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Filter tags */}
          <div className="flex flex-wrap items-center gap-2 mb-10">
            {tags.map((tag, i) => (
              <button
                key={tag}
                className={`px-4 py-2 text-[11px] tracking-wider border rounded-full transition-all duration-200 ${
                  i === 0 ? 'border-gold text-gold bg-gold/5' : 'border-border text-stone hover:border-stone/60'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {dummyTherapists.map((therapist) => (
              <TherapistCard key={therapist.id} therapist={therapist} />
            ))}
          </div>

          {/* Notice */}
          <div className="mt-12 p-6 border border-border/50 text-center bg-elevated">
            <div className="flex items-center justify-center gap-2 mb-3">
              <ShieldCheck size={16} className="text-gold" />
              <p className="text-gold text-xs tracking-wider">掲載セラピストについて</p>
            </div>
            <p className="text-stone text-sm leading-relaxed mb-4">
              掲載されているセラピストは全員、運営による本人確認・プロフィール審査を通過しています。
              セラピスト選びに迷ったら、口コミ・タグ・雰囲気から絞り込んでみてください。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/first" className="btn-primary inline-flex text-sm">
                初めての方へ
              </Link>
              <Link href="/contact" className="btn-secondary inline-flex text-sm">
                お問い合わせ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
