import { Eye, Heart, MessageSquare, BarChart2, TrendingUp, Users, Calendar } from 'lucide-react';

const periodStats = {
  views: 247,
  favorites: 18,
  inquiries: 5,
  scheduleViews: 89,
  blogViews: 43,
};

const popularTags = [
  { tag: '癒し系', count: 89 },
  { tag: '初心者向け', count: 67 },
  { tag: '初めての方におすすめ', count: 54 },
  { tag: '話しやすい', count: 41 },
  { tag: '穏やか', count: 38 },
];

const areaInflow = [
  { area: '渋谷', count: 78, pct: 32 },
  { area: '新宿', count: 61, pct: 25 },
  { area: '恵比寿', count: 44, pct: 18 },
  { area: '中目黒', count: 31, pct: 13 },
  { area: 'その他', count: 33, pct: 12 },
];

const blogPerformance = [
  { title: '今週の出勤スケジュール', views: 43, status: 'pending_review' },
];

export default function AnalyticsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl text-cream">アクセス分析</h2>
          <p className="text-stone text-xs mt-1">プロフィールへのアクセスデータ</p>
        </div>
        <div className="flex gap-2">
          {['今週', '今月', '全期間'].map((period, i) => (
            <button
              key={period}
              className={`text-[10px] px-3 py-1.5 border transition-all ${
                i === 1
                  ? 'border-gold/50 text-gold bg-gold/5'
                  : 'border-border text-mist hover:text-stone'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gold/5 border border-gold/20 p-4 mb-6">
        <p className="text-gold text-[10px]">グランドオープン後に実際のデータが表示されます。現在はサンプルデータです。</p>
      </div>

      {/* Main stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {[
          { label: 'プロフィール閲覧', value: periodStats.views, icon: Eye, color: 'text-gold' },
          { label: 'お気に入り登録', value: periodStats.favorites, icon: Heart, color: 'text-wine' },
          { label: '相談受信', value: periodStats.inquiries, icon: MessageSquare, color: 'text-sky-300' },
          { label: '出勤ページ閲覧', value: periodStats.scheduleViews, icon: Calendar, color: 'text-cream' },
          { label: 'ブログ閲覧', value: periodStats.blogViews, icon: BarChart2, color: 'text-emerald-400' },
          { label: '比較リスト追加', value: 12, icon: Users, color: 'text-stone' },
        ].map((stat) => {
          const Icon = stat.icon as React.ElementType;
          return (
            <div key={stat.label} className="card-luxury p-5">
              <div className="flex items-center gap-2 mb-3">
                <Icon size={15} className={stat.color} strokeWidth={1.5} />
                <p className="text-mist text-[10px]">{stat.label}</p>
              </div>
              <p className={`text-3xl font-display ${stat.color}`}>{stat.value}</p>
              <div className="flex items-center gap-1 mt-1 text-emerald-400 text-[10px]">
                <TrendingUp size={10} />
                +12% (先月比)
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        {/* Popular tags */}
        <div className="card-luxury p-5">
          <p className="text-gold text-[10px] tracking-widest mb-4">人気タグ</p>
          <div className="space-y-3">
            {popularTags.map((item, i) => (
              <div key={item.tag}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-stone text-xs">{item.tag}</span>
                  <span className="text-mist text-[10px]">{item.count}回</span>
                </div>
                <div className="w-full h-1.5 bg-elevated rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold to-gold/60 rounded-full"
                    style={{ width: `${(item.count / popularTags[0].count) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Area inflow */}
        <div className="card-luxury p-5">
          <p className="text-gold text-[10px] tracking-widest mb-4">流入エリア</p>
          <div className="space-y-3">
            {areaInflow.map((item) => (
              <div key={item.area}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-stone text-xs">{item.area}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-mist text-[10px]">{item.count}件</span>
                    <span className="text-gold text-[10px]">{item.pct}%</span>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-elevated rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-wine/60 to-wine/30 rounded-full"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Blog performance */}
      <div className="card-luxury p-5">
        <p className="text-gold text-[10px] tracking-widest mb-4">ブログ記事のパフォーマンス</p>
        {blogPerformance.length > 0 ? (
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-mist text-[10px] py-2 font-normal">タイトル</th>
                <th className="text-right text-mist text-[10px] py-2 font-normal">閲覧数</th>
                <th className="text-right text-mist text-[10px] py-2 font-normal">ステータス</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {blogPerformance.map((post) => (
                <tr key={post.title}>
                  <td className="py-2.5 text-cream">{post.title}</td>
                  <td className="py-2.5 text-right text-stone">{post.views}</td>
                  <td className="py-2.5 text-right">
                    <span className="text-amber-400 text-[10px]">確認待ち</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-mist text-xs">公開済みのブログ記事がありません</p>
        )}
      </div>
    </div>
  );
}
