import type { Metadata } from 'next';
import Link from 'next/link';
import { Bell } from 'lucide-react';

export const metadata: Metadata = {
  title: 'お知らせ｜裏東京ロマンス',
  description: '裏東京ロマンスからのお知らせ・更新情報。2026年8月1日グランドオープン予定。',
  alternates: { canonical: 'https://ura-tokyo-romance.com/news' },
};

const dummyNews = [
  {
    date: '2026-06-01',
    category: 'お知らせ',
    title: 'サイトをリリースしました（事前公開）',
    body: '裏東京ロマンスの事前公開サイトをリリースしました。2026年8月1日のグランドオープンに向け、セラピストの先行登録を受け付けています。',
  },
  {
    date: '2026-06-01',
    category: '重要',
    title: 'グランドオープン日決定：2026年8月1日',
    body: '裏東京ロマンスは2026年8月1日にグランドオープンいたします。現在、セラピストの先行登録と、コンテンツの拡充を進めています。',
  },
  {
    date: '2026-06-01',
    category: 'セラピスト',
    title: 'セラピスト先行登録を開始しました',
    body: '東京で女風セラピストとして活動したい方の先行登録を開始しました。グランドオープン前に登録いただいた方には、オープン初期の露出優遇を予定しています。',
  },
];

export default function NewsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-5 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold text-[10px] tracking-[0.3em] mb-4">News</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-5 tracking-wide">お知らせ</h1>
          <span className="block w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
        </div>
      </section>

      <section className="section-py px-5">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {dummyNews.map((news, i) => (
              <div key={i} className="card-luxury p-7">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-mist text-xs">{news.date}</span>
                  <span className={`text-[10px] tracking-wider px-2 py-0.5 border ${
                    news.category === '重要'
                      ? 'border-wine text-wine'
                      : 'border-gold/40 text-gold'
                  }`}>
                    {news.category}
                  </span>
                </div>
                <h2 className="text-cream text-base mb-3">{news.title}</h2>
                <p className="text-stone text-sm leading-relaxed">{news.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 card-luxury p-8 text-center">
            <Bell size={24} className="text-gold mx-auto mb-4" strokeWidth={1.5} />
            <p className="text-cream text-sm mb-2">最新情報をInstagramでも発信しています</p>
            <p className="text-stone text-xs mb-6">グランドオープン前の最新情報・セラピスト情報はInstagramでご確認いただけます。</p>
            <a
              href="https://www.instagram.com/ura_tokyo_romance/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex"
            >
              Instagramをフォローする
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
