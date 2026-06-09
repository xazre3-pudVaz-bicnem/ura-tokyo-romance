import type { Metadata } from 'next';
import Link from 'next/link';
import { dummyTherapists } from '@/data/dummy-therapists';
import TherapistCard from '@/components/ui/TherapistCard';

export const metadata: Metadata = {
  title: '特集｜裏東京ロマンス',
  description: '初めての方向け・会話重視・癒し系・高身長など、シーンやタイプ別にセラピストを特集でご紹介。',
  alternates: { canonical: 'https://uratokyoromance.com/features' },
};

const features = [
  {
    id: 'first-time',
    label: '初めての方へ',
    en: 'For First Timers',
    desc: '初めての女性風俗・メンズエステをお考えの方へ。優しく丁寧に対応してくれるセラピストを厳選しました。',
    icon: '🌸',
    filter: (t: typeof dummyTherapists[number]) => t.authLevel >= 3,
    color: 'from-gold/5 to-transparent border-gold/20',
    labelColor: 'text-gold',
  },
  {
    id: 'conversation',
    label: '会話重視',
    en: 'Great Conversation',
    desc: 'ゆっくりと会話を楽しみたい方へ。聞き上手で話しやすいセラピストが揃っています。',
    icon: '💬',
    filter: (t: typeof dummyTherapists[number]) => t.tags.some(tag => ['会話好き', 'トーク上手', '聞き上手', '話しやすい'].includes(tag)),
    color: 'from-sky-300/5 to-transparent border-sky-300/20',
    labelColor: 'text-sky-300',
  },
  {
    id: 'healing',
    label: '癒し系',
    en: 'Healing Type',
    desc: '柔らかい雰囲気で心も体もほぐしてくれる。疲れた心を癒してくれるセラピストたち。',
    icon: '✨',
    filter: (t: typeof dummyTherapists[number]) => t.tags.some(tag => ['癒し系', 'ナチュラル', '穏やか', '天然系'].includes(tag)),
    color: 'from-emerald-400/5 to-transparent border-emerald-400/20',
    labelColor: 'text-emerald-400',
  },
  {
    id: 'tall',
    label: '高身長',
    en: 'Tall Therapists',
    desc: '175cm以上のすらりとした長身セラピスト特集。見た目のインパクトも楽しみのひとつ。',
    icon: '📏',
    filter: (t: typeof dummyTherapists[number]) => t.height !== undefined && t.height >= 175,
    color: 'from-purple-400/5 to-transparent border-purple-400/20',
    labelColor: 'text-purple-400',
  },
  {
    id: 'twenties',
    label: '20代',
    en: 'In Their 20s',
    desc: '若さとフレッシュさが魅力の20代セラピスト。エネルギッシュで楽しい時間を過ごせます。',
    icon: '🌟',
    filter: (t: typeof dummyTherapists[number]) => t.age !== undefined && t.age >= 20 && t.age < 30,
    color: 'from-amber-400/5 to-transparent border-amber-400/20',
    labelColor: 'text-amber-400',
  },
  {
    id: 'thirties',
    label: '30代',
    en: 'In Their 30s',
    desc: '落ち着いた大人の魅力を持つ30代セラピスト。会話も施術も安心感があります。',
    icon: '🍷',
    filter: (t: typeof dummyTherapists[number]) => t.age !== undefined && t.age >= 30 && t.age < 40,
    color: 'from-wine/5 to-transparent border-wine/20',
    labelColor: 'text-wine',
  },
  {
    id: 'today',
    label: '今日会える',
    en: 'Available Today',
    desc: '本日出勤中または出勤予定のセラピスト。今すぐ会える方をご紹介します。',
    icon: '⚡',
    filter: (t: typeof dummyTherapists[number]) => t.weeklyViewCount !== undefined && t.weeklyViewCount >= 300,
    color: 'from-gold/5 to-transparent border-gold/20',
    labelColor: 'text-gold',
  },
  {
    id: 'verified',
    label: '本人確認済み',
    en: 'Identity Verified',
    desc: '運営による本人確認を完了したセラピスト。安心してご利用いただけます。',
    icon: '✅',
    filter: (t: typeof dummyTherapists[number]) => t.authLevel >= 1,
    color: 'from-emerald-400/5 to-transparent border-emerald-400/20',
    labelColor: 'text-emerald-400',
  },
  {
    id: 'rising',
    label: '人気急上昇',
    en: 'Rising Stars',
    desc: '今週の閲覧数が急増中のセラピスト。これからブレイクする実力派たち。',
    icon: '📈',
    filter: (t: typeof dummyTherapists[number]) => t.weeklyViewCount !== undefined && t.weeklyViewCount >= 400,
    color: 'from-orange-400/5 to-transparent border-orange-400/20',
    labelColor: 'text-orange-400',
  },
  {
    id: 'newcomers',
    label: '新人特集',
    en: 'New Faces',
    desc: '最近デビューしたフレッシュなセラピスト。初々しさが魅力の新顔たち。',
    icon: '🌱',
    filter: (t: typeof dummyTherapists[number]) => t.isNew,
    color: 'from-sky-300/5 to-transparent border-sky-300/20',
    labelColor: 'text-sky-300',
  },
  {
    id: 'premium',
    label: 'プレミアム認定',
    en: 'Premium Certified',
    desc: '運営が認定した最高レベルのセラピスト。特別なひと時をお探しの方に。',
    icon: '👑',
    filter: (t: typeof dummyTherapists[number]) => t.authLevel >= 5,
    color: 'from-gold/5 to-transparent border-gold/20',
    labelColor: 'text-gold',
  },
];

export default function FeaturesPage() {
  return (
    <>
      <section className="pt-32 pb-12 px-5 bg-surface border-b border-border">
        <div className="max-w-5xl mx-auto">
          <nav className="flex items-center gap-2 text-mist text-[10px] tracking-widest mb-5">
            <Link href="/" className="hover:text-cream">ホーム</Link>
            <span>/</span>
            <span className="text-cream">特集</span>
          </nav>
          <p className="text-gold text-[10px] tracking-[0.3em] mb-3">Features</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream tracking-wide mb-4">特集</h1>
          <p className="text-stone text-sm max-w-lg">
            シーン・タイプ・ご要望別に、あなたにぴったりのセラピストをご紹介します。
          </p>
        </div>
      </section>

      <section className="section-py px-5">
        <div className="max-w-5xl mx-auto space-y-14">
          {features.map((feature) => {
            const therapists = dummyTherapists.filter(feature.filter).slice(0, 4);
            return (
              <div key={feature.id} id={feature.id}>
                <div className={`bg-gradient-to-r ${feature.color} border px-6 py-5 mb-6`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{feature.icon}</span>
                      <div>
                        <p className={`text-[10px] tracking-widest ${feature.labelColor}`}>{feature.en}</p>
                        <h2 className="font-display text-2xl text-cream">{feature.label}</h2>
                      </div>
                    </div>
                    <Link href={`/therapists?feature=${feature.id}`} className="text-gold text-[10px] hover:underline hidden md:block">
                      すべて見る →
                    </Link>
                  </div>
                  <p className="text-stone text-xs mt-3 leading-relaxed">{feature.desc}</p>
                </div>

                {therapists.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {therapists.map((t) => (
                      <TherapistCard key={t.id} therapist={t} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-surface border border-border p-8 text-center">
                    <p className="text-stone text-sm">グランドオープン後に掲載予定です</p>
                  </div>
                )}

                <div className="mt-4 text-right md:hidden">
                  <Link href={`/therapists?feature=${feature.id}`} className="text-gold text-[10px] hover:underline">
                    すべて見る →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature index */}
      <section className="border-t border-border bg-surface px-5 py-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-xl text-cream mb-5 text-center">特集一覧</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {features.map((f) => (
              <a key={f.id} href={`#${f.id}`} className={`tag-pill hover:opacity-80 transition-opacity ${f.labelColor}`}>
                {f.icon} {f.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
