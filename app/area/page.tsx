import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { dummyTherapists } from '@/data/dummy-therapists';
import { areasData } from '@/data/areas';

export const metadata: Metadata = {
  title: 'エリアから女風セラピストを探す｜新宿 渋谷 銀座 六本木 池袋 女風 裏東京ロマンス',
  keywords: [
    '新宿 女風', '渋谷 女風', '銀座 女風', '六本木 女風', '池袋 女風',
    '恵比寿 女風', '表参道 女風', '東京 女風 エリア', '女性用風俗 東京 エリア',
  ],
  description:
    '東京の女風セラピストをエリアから検索。新宿・渋谷・銀座・六本木・池袋・恵比寿・表参道など東京各エリアで活動するセラピストを一覧で確認できます。',
  alternates: { canonical: 'https://ura-tokyo-romance.com/area' },
};

const areas = [
  {
    name: '渋谷・恵比寿・代官山・中目黒',
    key: '渋谷',
    desc: '渋谷・恵比寿・代官山・中目黒・目黒エリア',
    keywords: ['渋谷', '恵比寿', '代官山', '中目黒', '目黒'],
  },
  {
    name: '新宿・歌舞伎町・高田馬場',
    key: '新宿',
    desc: '新宿・歌舞伎町・高田馬場・原宿エリア',
    keywords: ['新宿', '高田馬場', '原宿'],
  },
  {
    name: '銀座・日本橋・新橋',
    key: '銀座',
    desc: '銀座・日本橋・新橋・築地エリア',
    keywords: ['銀座', '日本橋', '新橋'],
  },
  {
    name: '六本木・麻布十番・赤坂',
    key: '六本木',
    desc: '六本木・麻布十番・赤坂・白金エリア',
    keywords: ['六本木', '麻布十番', '赤坂'],
  },
  {
    name: '表参道・青山・外苑前',
    key: '表参道',
    desc: '表参道・青山・外苑前・南青山エリア',
    keywords: ['表参道', '青山'],
  },
  {
    name: '池袋・東池袋',
    key: '池袋',
    desc: '池袋・東池袋・要町エリア',
    keywords: ['池袋'],
  },
  {
    name: '上野・秋葉原・浅草',
    key: '上野',
    desc: '上野・秋葉原・浅草・御徒町エリア',
    keywords: ['上野', '秋葉原'],
  },
  {
    name: '品川・大崎・五反田',
    key: '品川',
    desc: '品川・大崎・五反田・大井町エリア',
    keywords: ['品川'],
  },
];

export default function AreaPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '裏東京ロマンス エリア一覧',
    description: '東京各エリアの女風セラピスト検索',
    itemListElement: areas.map((area, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: area.name,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="pt-32 pb-20 px-5 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold text-[10px] tracking-[0.3em] mb-4">Area Search</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-5 tracking-wide">エリアから探す</h1>
          <span className="block w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-stone leading-relaxed">
            東京の各エリアで活動するセラピストを探せます。
            ご希望のエリアを選んでください。
          </p>
        </div>
      </section>

      <section className="section-py px-5">
        <div className="max-w-5xl mx-auto">
          {/* Area grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-16">
            {areas.map((area) => {
              const count = dummyTherapists.filter((t) =>
                t.areas.some((a) => area.keywords.some((k) => a.includes(k)))
              ).length;

              return (
                <Link
                  key={area.key}
                  href={`/therapists?area=${encodeURIComponent(area.key)}`}
                  className="card-luxury p-6 group flex items-center justify-between"
                >
                  <div className="flex items-start gap-4">
                    <MapPin size={18} className="text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <p className="text-cream text-sm mb-1">{area.name}</p>
                      <p className="text-mist text-xs">{area.desc}</p>
                    </div>
                  </div>
                  <div className="text-right ml-4 flex-shrink-0">
                    <p className="text-gold text-lg font-display">{count}</p>
                    <p className="text-mist text-[10px]">名</p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Map note */}
          <div className="card-luxury p-8 text-center mb-10">
            <p className="text-gold text-[10px] tracking-widest mb-3">セラピストの活動エリアについて</p>
            <p className="text-stone text-sm leading-relaxed">
              各セラピストの対応エリアはプロフィールに記載されています。
              基本的には東京都内の各エリアに出向いていただけますが、
              エリアによって交通費が異なる場合があります。
              詳細は各セラピストにご相談ください。
            </p>
          </div>

          {/* Detailed area pages */}
          <div className="mb-10">
            <p className="text-gold text-[10px] tracking-widest mb-4">エリア別詳細ガイド</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {areasData.slice(0, 12).map((area) => {
                const count = dummyTherapists.filter((t) =>
                  t.areas.some((a) => area.therapistKeywords.some((k) => a.includes(k)))
                ).length;
                return (
                  <Link
                    key={area.slug}
                    href={`/area/${area.slug}`}
                    className="card-luxury p-3 flex items-center justify-between group"
                  >
                    <span className="text-stone text-xs group-hover:text-cream transition-colors">{area.name}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-gold text-xs">{count}</span>
                      <ArrowRight size={11} className="text-gold" />
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
              {areasData.slice(12).map((area) => {
                const count = dummyTherapists.filter((t) =>
                  t.areas.some((a) => area.therapistKeywords.some((k) => a.includes(k)))
                ).length;
                return (
                  <Link
                    key={area.slug}
                    href={`/area/${area.slug}`}
                    className="card-luxury p-3 flex items-center justify-between group"
                  >
                    <span className="text-stone text-xs group-hover:text-cream transition-colors">{area.name}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-gold text-xs">{count}</span>
                      <ArrowRight size={11} className="text-gold" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="text-center flex gap-4 justify-center">
            <Link href="/therapists" className="btn-primary">全セラピストを見る</Link>
            <Link href="/today" className="btn-secondary">今日会えるセラピスト</Link>
          </div>
        </div>
      </section>
    </>
  );
}
