import type { Metadata } from 'next';
import SectionTitle from '@/components/ui/SectionTitle';
import { Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'イベント・キャンペーン｜裏東京ロマンス',
  description: '裏東京ロマンスの期間限定イベント・キャンペーン情報。東京の女性用風俗・女風のお得な情報をご確認ください。',
  alternates: { canonical: 'https://ura-tokyo-romance.com/events' },
};

const events = [
  {
    title: 'グランドオープン記念キャンペーン',
    date: '2026年8月1日〜8月31日',
    type: 'キャンペーン',
    detail: 'グランドオープンを記念して、初回ご利用のお客様を対象に特別割引をご用意予定です。詳細はオープン時に発表いたします。',
  },
  {
    title: 'お盆期間 特別コース',
    date: '2026年8月10日〜8月16日',
    type: 'イベント',
    detail: 'お盆期間限定のスペシャルコースを予定しています。内容は後日発表いたします。',
  },
];

export default function EventsPage() {
  return (
    <>
      <section className="pt-32 pb-20 px-5 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold text-[10px] tracking-[0.3em] mb-4">Events</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-5 tracking-wide">イベント・キャンペーン</h1>
          <span className="block w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-stone leading-relaxed">期間限定のイベントやお得なキャンペーン情報をお届けします。</p>
        </div>
      </section>

      <section className="section-py px-5">
        <div className="max-w-4xl mx-auto">
          {events.length > 0 ? (
            <div className="space-y-5">
              {events.map((event, i) => (
                <div key={i} className="card-luxury p-7 flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/4 flex flex-col">
                    <span className="bg-wine text-cream text-[9px] tracking-widest px-2.5 py-1 self-start mb-3">{event.type}</span>
                    <div className="flex items-center gap-2 text-mist text-xs">
                      <Calendar size={11} />
                      {event.date}
                    </div>
                  </div>
                  <div className="md:flex-1">
                    <h2 className="text-cream text-lg font-display mb-3">{event.title}</h2>
                    <p className="text-stone text-sm leading-relaxed">{event.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-stone text-sm">現在開催中のイベント・キャンペーンはありません。</p>
            </div>
          )}

          <div className="mt-12 p-8 bg-surface border border-border text-center">
            <p className="text-stone text-sm mb-4">最新のイベント情報はInstagramで随時発信しています。</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://www.instagram.com/ura_tokyo_romance/" target="_blank" rel="noopener noreferrer" className="btn-primary">Instagramをフォロー</a>
              <a href="/news" className="btn-secondary">お知らせ一覧を見る</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
