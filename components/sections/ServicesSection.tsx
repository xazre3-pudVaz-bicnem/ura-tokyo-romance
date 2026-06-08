import Link from 'next/link';
import { Search, ShieldCheck, Star, MessageSquare, Calendar, BarChart3 } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';

const features = [
  {
    icon: Search,
    title: 'セラピストを探す・比較する',
    desc: 'エリア・雰囲気・料金・口コミ数など多彩な条件で絞り込み。複数のセラピストを比較して選べます。',
    detail: '全8名掲載中（OPEN時）',
  },
  {
    icon: ShieldCheck,
    title: '本人確認済みセラピストのみ',
    desc: '身分証明書による本人確認を完了したセラピストのみ掲載。「本人確認済」バッジで一目で確認できます。',
    detail: '安全・安心',
  },
  {
    icon: Star,
    title: '口コミ・評価が見られる',
    desc: '実際に利用した方の口コミ・評価を確認してから予約相談ができます。信頼できる情報をもとに選択できます。',
    detail: '透明な評価',
  },
  {
    icon: Calendar,
    title: '出勤カレンダー・今日会える',
    desc: 'セラピストごとの出勤予定を確認できます。今日や今週の空き状況も一覧で把握できます。',
    detail: 'リアルタイム更新',
  },
  {
    icon: MessageSquare,
    title: '予約相談フォームで安心連絡',
    desc: '気になるセラピストへの問い合わせはフォームから。やり取りの履歴が残るので安心してコミュニケーションできます。',
    detail: '安全な連絡手段',
  },
  {
    icon: BarChart3,
    title: '人気ランキング・おすすめ表示',
    desc: '閲覧数・口コミ数・お気に入り数などを元にしたランキングで人気のセラピストを発見できます。',
    detail: 'ランキング更新中',
  },
];

export default function ServicesSection() {
  return (
    <section className="section-py px-5 bg-surface">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          en="Platform Features"
          ja="プラットフォームの機能"
          description="裏東京ロマンスは、セラピストを探す・比較する・相談するまでを、安全・安心な環境でサポートします。"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="card-luxury p-6 md:p-8 group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 border border-gold/20 flex items-center justify-center group-hover:border-gold/50 transition-colors duration-300">
                    <Icon size={18} className="text-gold" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-cream text-sm font-sans tracking-wide mb-0.5">{feature.title}</h3>
                    <span className="text-gold text-[10px] tracking-widest">{feature.detail}</span>
                  </div>
                </div>
                <p className="text-stone text-xs leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link href="/therapists" className="btn-primary inline-flex mr-4">
            セラピストを探してみる
          </Link>
          <Link href="/first" className="btn-secondary inline-flex">
            初めての方へ
          </Link>
        </div>
      </div>
    </section>
  );
}
