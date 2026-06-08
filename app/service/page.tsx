import type { Metadata } from 'next';
import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';
import { Search, ShieldCheck, Star, Calendar, MessageCircle, Trophy, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'サービス・機能案内｜東京 女風マッチング 裏東京ロマンス',
  description:
    '裏東京ロマンスのプラットフォーム機能をご紹介。セラピスト検索・本人確認・口コミ・予約相談・ランキングなど、東京の女性用風俗・女風マッチングに必要な機能を揃えています。',
  alternates: { canonical: 'https://ura-tokyo-romance.com/service' },
};

const features = [
  {
    icon: Search,
    title: 'セラピスト検索・絞り込み',
    desc: 'エリア・時間帯・雰囲気・料金帯・年齢など複数の条件でセラピストを絞り込めます。「今日会える」「即日相談可」などの便利フィルターも搭載しています。',
    points: ['8エリアのエリア検索', '雰囲気・タグで絞り込み', '即日相談可フィルター'],
    href: '/therapists',
    label: 'セラピストを探す',
  },
  {
    icon: ShieldCheck,
    title: '本人確認・審査済みセラピスト',
    desc: '掲載されるすべてのセラピストは身分証明書による本人確認と運営の審査を通過しています。「本人確認済」バッジで安心して選べます。',
    points: ['身分証明書で本人確認', 'プロフィール審査あり', '掲載停止基準を明示'],
    href: '/safety',
    label: '安全への取り組みを見る',
  },
  {
    icon: Star,
    title: '口コミ・評価システム',
    desc: '実際に利用した方による口コミと評価を確認できます。セラピスト選びの参考になる正直なレビューを掲載しています。虚偽レビューは削除対応します。',
    points: ['実利用者のレビューのみ', '評価スコア表示', '虚偽レビュー通報機能'],
    href: '/reviews',
    label: '口コミを見る',
  },
  {
    icon: Calendar,
    title: '出勤スケジュール確認',
    desc: '各セラピストが出勤予定を更新します。本日出勤・今週の出勤予定を一覧で確認できるので、スケジュールに合ったセラピストを見つけやすいです。',
    points: ['本日出勤情報', '今週の出勤予定', 'セラピスト別スケジュール'],
    href: '/schedule',
    label: '本日の出勤を確認する',
  },
  {
    icon: MessageCircle,
    title: '予約相談フォーム',
    desc: 'セラピストへの連絡はプロフィールページ内の予約相談フォームから行えます。個人の連絡先を直接やり取りせずに済む、安全な連絡手段です。',
    points: ['個人情報不要で相談可能', '日時・エリア・希望を送信', '返信後に詳細確認・確定'],
    href: '/first',
    label: '利用の流れを見る',
  },
  {
    icon: Trophy,
    title: 'ランキング・新人特集',
    desc: '口コミ評価・お気に入り数などをもとにしたランキングや、新しく加わったセラピストの特集ページを設けています。',
    points: ['総合・エリア別ランキング', '新人セラピスト特集', 'お気に入り登録機能'],
    href: '/ranking',
    label: 'ランキングを見る',
  },
];

export default function ServicePage() {
  return (
    <>
      <section className="pt-32 pb-20 px-5 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold text-[10px] tracking-[0.3em] mb-4">Features</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-5 tracking-wide">サービス・機能案内</h1>
          <span className="block w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-stone leading-relaxed">
            裏東京ロマンスは東京の女風セラピストを安全に探せるマッチングプラットフォームです。
            利用者が安心してセラピストを選び、相談できる機能を揃えています。
          </p>
        </div>
      </section>

      <section className="section-py px-5">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-8">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className={`card-luxury p-8 md:p-10 flex flex-col md:flex-row gap-8 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="md:w-1/3 flex flex-col items-start">
                    <div className="w-12 h-12 border border-gold/30 flex items-center justify-center mb-4">
                      <Icon size={22} className="text-gold" strokeWidth={1.5} />
                    </div>
                    <h2 className="font-display text-2xl text-cream mb-4">{feature.title}</h2>
                    <Link href={feature.href} className="flex items-center gap-2 text-gold text-[10px] tracking-widest hover:gap-3 transition-all">
                      {feature.label} <ArrowRight size={12} />
                    </Link>
                  </div>
                  <div className="md:flex-1">
                    <p className="text-stone text-sm leading-relaxed mb-5">{feature.desc}</p>
                    <ul className="space-y-2">
                      {feature.points.map((p) => (
                        <li key={p} className="flex items-center gap-2 text-stone text-xs">
                          <ArrowRight size={12} className="text-gold flex-shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <p className="text-stone text-sm mb-6">初めての方は利用ガイドをご覧ください。</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/first" className="btn-primary">初めての方へ</Link>
              <Link href="/therapists" className="btn-secondary">セラピストを探す</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
