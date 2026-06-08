import { Eye, Heart, Star, MessageSquare, TrendingUp, Calendar } from 'lucide-react';

const stats = [
  { label: 'プロフィール閲覧数', value: '—', icon: Eye, note: 'グランドオープン後' },
  { label: 'お気に入り数', value: '—', icon: Heart, note: 'グランドオープン後' },
  { label: '口コミ数', value: '0', icon: Star, note: '' },
  { label: '相談受信数', value: '—', icon: MessageSquare, note: 'グランドオープン後' },
];

export default function DashboardPage() {
  return (
    <div>
      <h2 className="font-display text-2xl text-cream mb-6">ダッシュボード</h2>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, note }) => (
          <div key={label} className="card-luxury p-5">
            <div className="flex items-center justify-between mb-3">
              <Icon size={16} className="text-gold" strokeWidth={1.5} />
              {note && <span className="text-mist text-[9px]">{note}</span>}
            </div>
            <p className="font-display text-2xl text-cream mb-1">{value}</p>
            <p className="text-mist text-[10px] tracking-widest">{label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="card-luxury p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp size={16} className="text-gold" strokeWidth={1.5} />
            <p className="text-cream text-sm">プロフィールの充実度</p>
          </div>
          <div className="w-full bg-elevated h-2 mb-2">
            <div className="bg-gold h-2" style={{ width: '40%' }} />
          </div>
          <p className="text-stone text-xs">40% — プロフィールを充実させると検索での露出が上がります</p>
        </div>

        <div className="card-luxury p-6">
          <div className="flex items-center gap-3 mb-4">
            <Calendar size={16} className="text-gold" strokeWidth={1.5} />
            <p className="text-cream text-sm">今月の出勤スケジュール</p>
          </div>
          <p className="text-stone text-xs mb-3">スケジュールを更新して「今日会える」に表示されましょう。</p>
          <a href="/therapist-dashboard/schedule" className="text-gold text-xs hover:underline">
            スケジュールを更新 →
          </a>
        </div>
      </div>

      {/* Checklist */}
      <div className="card-luxury p-6">
        <p className="text-gold text-[10px] tracking-widest mb-4">掲載開始チェックリスト</p>
        <div className="space-y-3">
          {[
            { done: true, label: '登録申請が完了した' },
            { done: true, label: '本人確認書類を提出した' },
            { done: false, label: 'プロフィール写真を追加する' },
            { done: false, label: '自己紹介文を入力する（100文字以上推奨）' },
            { done: false, label: '料金プランを設定する' },
            { done: false, label: '活動エリアを設定する' },
            { done: false, label: 'スケジュールを登録する' },
          ].map(({ done, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div className={`w-4 h-4 border flex-shrink-0 flex items-center justify-center ${done ? 'border-gold bg-gold/20' : 'border-border'}`}>
                {done && <span className="text-gold text-[10px]">✓</span>}
              </div>
              <span className={`text-sm ${done ? 'text-mist line-through' : 'text-stone'}`}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
