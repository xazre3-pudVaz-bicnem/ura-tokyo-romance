import type { Metadata } from 'next';
import SectionTitle from '@/components/ui/SectionTitle';
import { MapPin, Train, Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'エリア別セラピスト｜東京 女風マッチング 裏東京ロマンス',
  description:
    '裏東京ロマンスのエリア別セラピスト一覧。渋谷・新宿・銀座・六本木・恵比寿など東京の主要エリアで活動するセラピストを探せます。',
  alternates: { canonical: 'https://uratokyoromance.com/access' },
};

const areas = [
  { name: '渋谷・原宿・代官山', stations: ['渋谷駅', '原宿駅', '代官山駅', '中目黒駅'], level: '対応エリア' },
  { name: '新宿・池袋・高田馬場', stations: ['新宿駅', '池袋駅', '高田馬場駅', '目白駅'], level: '対応エリア' },
  { name: '銀座・六本木・麻布', stations: ['銀座駅', '六本木駅', '麻布十番駅', '赤坂駅'], level: '対応エリア' },
  { name: '恵比寿・目黒・表参道', stations: ['恵比寿駅', '目黒駅', '表参道駅', '青山一丁目駅'], level: '対応エリア' },
  { name: '品川・大崎・五反田', stations: ['品川駅', '大崎駅', '五反田駅', '目黒駅'], level: '対応エリア' },
  { name: 'その他東京都内', stations: ['上記以外のエリアもご相談ください'], level: '要相談' },
];

const meetingPlaces = [
  { place: '駅の改札付近', desc: '最もオーソドックスな待ち合わせ場所です。指定の出口をご案内します。' },
  { place: 'カフェ・ラウンジ', desc: '落ち着いた環境でお会いしたい方におすすめ。事前にお店を決めておきましょう。' },
  { place: 'ホテルロビー', desc: 'ホテルロビーでのお待ち合わせも可能です。チェックインのサポートもいたします。' },
  { place: 'その他のご指定場所', desc: 'ご要望に応じてご相談ください。お気軽にお申し付けください。' },
];

export default function AccessPage() {
  return (
    <>
      <section className="pt-32 pb-20 px-5 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold text-[10px] tracking-[0.3em] mb-4">Access & Area</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-5 tracking-wide">待ち合わせ・対応エリア</h1>
          <span className="block w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-stone leading-relaxed">
            東京都内を中心に幅広いエリアに対応しています。
            ご希望の場所・エリアをお気軽にご相談ください。
          </p>
        </div>
      </section>

      <section className="section-py px-5">
        <div className="max-w-5xl mx-auto">
          <SectionTitle en="Service Area" ja="対応エリア" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {areas.map((area) => (
              <div key={area.name} className="card-luxury p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-gold flex-shrink-0" />
                    <p className="text-cream text-sm">{area.name}</p>
                  </div>
                  <span className={`text-[9px] tracking-widest px-2 py-0.5 ${area.level === '対応エリア' ? 'bg-gold/10 text-gold' : 'bg-stone/10 text-stone'}`}>
                    {area.level}
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {area.stations.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-stone text-xs">
                      <Train size={10} className="text-stone/50 flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <SectionTitle en="Meeting Point" ja="待ち合わせ場所について" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
            {meetingPlaces.map((place) => (
              <div key={place.place} className="card-luxury p-7">
                <div className="flex items-start gap-3">
                  <Check size={14} className="text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-cream text-sm mb-2">{place.place}</p>
                    <p className="text-stone text-xs leading-relaxed">{place.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-surface border border-border p-8 md:p-12 text-center">
            <p className="text-gold text-[10px] tracking-widest mb-4">エリアから絞り込んで探す</p>
            <p className="text-stone text-sm mb-6 leading-relaxed">
              エリア別にセラピストを検索できます。<br />
              活動エリアはセラピストのプロフィールページでご確認いただけます。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/area" className="btn-primary inline-flex">エリア別に探す</a>
              <a href="/therapists" className="btn-secondary inline-flex">全セラピスト一覧</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
