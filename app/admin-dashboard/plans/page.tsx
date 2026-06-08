'use client';

import { useState } from 'react';
import { Star, Crown, Gift, Search, ChevronDown, Check } from 'lucide-react';
import { dummyTherapists, type PlanType } from '@/data/dummy-therapists';

const PLAN_CONFIG: Record<PlanType, { label: string; color: string; icon: typeof Star; features: string[] }> = {
  free: {
    label: '無料',
    color: 'text-mist border-border',
    icon: Gift,
    features: ['プロフィール掲載', '本人確認バッジ', '基本検索表示'],
  },
  standard: {
    label: 'スタンダード',
    color: 'text-sky-300 border-sky-300/30',
    icon: Star,
    features: ['無料プランすべて', '出勤情報更新', '検索上位枠', 'ブログ投稿'],
  },
  premium: {
    label: 'プレミアム',
    color: 'text-gold border-gold/30',
    icon: Crown,
    features: ['スタンダードすべて', '特集ページ掲載', 'ランキング強化', 'トップ露出'],
  },
};

export default function AdminPlansPage() {
  const [search, setSearch] = useState('');
  const [filterPlan, setFilterPlan] = useState<PlanType | 'all'>('all');
  const [therapists, setTherapists] = useState(dummyTherapists.map((t) => ({
    ...t,
    planType: (t as typeof t & { planType: PlanType }).planType ?? 'free' as PlanType,
  })));
  const [editingId, setEditingId] = useState<number | null>(null);
  const [pendingPlan, setPendingPlan] = useState<PlanType>('free');

  const filtered = therapists.filter((t) => {
    const matchSearch = !search || t.name.includes(search) || t.slug.includes(search);
    const matchPlan = filterPlan === 'all' || t.planType === filterPlan;
    return matchSearch && matchPlan;
  });

  const applyPlan = (id: number) => {
    setTherapists((prev) =>
      prev.map((t) => t.id === id ? { ...t, planType: pendingPlan } : t)
    );
    setEditingId(null);
  };

  const planCounts = {
    free: therapists.filter((t) => t.planType === 'free').length,
    standard: therapists.filter((t) => t.planType === 'standard').length,
    premium: therapists.filter((t) => t.planType === 'premium').length,
  };

  return (
    <div>
      <h1 className="font-display text-2xl text-cream mb-1">掲載プラン管理</h1>
      <p className="text-mist text-xs mb-6">各セラピストの掲載プランを管理します。正式料金確定後に課金システムと連携します。</p>

      {/* Plan summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {(['free', 'standard', 'premium'] as PlanType[]).map((plan) => {
          const Icon = PLAN_CONFIG[plan].icon;
          return (
            <div key={plan} className={`card-luxury p-5 border ${PLAN_CONFIG[plan].color}`}>
              <Icon size={16} strokeWidth={1.5} className="mb-2" />
              <p className="font-display text-2xl text-cream">{planCounts[plan]}</p>
              <p className="text-mist text-[10px] mt-1">{PLAN_CONFIG[plan].label}プラン</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-mist" />
          <input
            type="text"
            placeholder="名前・スラッグで検索"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface border border-border text-cream text-sm pl-9 pr-4 py-2 outline-none focus:border-gold/50"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'free', 'standard', 'premium'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setFilterPlan(p)}
              className={`px-3 py-2 text-xs border transition-colors ${
                filterPlan === p ? 'border-gold text-gold' : 'border-border text-stone hover:text-cream'
              }`}
            >
              {p === 'all' ? 'すべて' : PLAN_CONFIG[p].label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface border border-border divide-y divide-border/50">
        <div className="grid grid-cols-5 gap-4 px-5 py-3 text-mist text-[10px] tracking-widest">
          <span className="col-span-2">セラピスト</span>
          <span>認証レベル</span>
          <span>現在のプラン</span>
          <span>変更</span>
        </div>
        {filtered.map((t) => {
          const PlanIcon = PLAN_CONFIG[t.planType].icon;
          const isEditing = editingId === t.id;
          return (
            <div key={t.id} className="grid grid-cols-5 gap-4 px-5 py-4 items-center hover:bg-elevated transition-colors">
              <div className="col-span-2 flex items-center gap-3">
                {t.image && <img src={t.image} alt={t.name} className="w-8 h-11 object-cover object-top flex-shrink-0" />}
                <div>
                  <p className="text-cream text-sm">{t.name}</p>
                  <p className="text-mist text-[10px]">@{t.slug}</p>
                </div>
              </div>
              <div>
                <span className="text-[10px] text-stone">Lv.{(t as typeof t & { authLevel: number }).authLevel ?? 0}</span>
              </div>
              <div>
                <span className={`flex items-center gap-1.5 text-[10px] border px-2 py-1 w-fit ${PLAN_CONFIG[t.planType].color}`}>
                  <PlanIcon size={10} strokeWidth={1.5} />
                  {PLAN_CONFIG[t.planType].label}
                </span>
              </div>
              <div>
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <select
                      value={pendingPlan}
                      onChange={(e) => setPendingPlan(e.target.value as PlanType)}
                      className="bg-elevated border border-border text-cream text-xs px-2 py-1 outline-none"
                    >
                      <option value="free">無料</option>
                      <option value="standard">スタンダード</option>
                      <option value="premium">プレミアム</option>
                    </select>
                    <button onClick={() => applyPlan(t.id)} className="text-emerald-400 hover:text-emerald-300">
                      <Check size={14} />
                    </button>
                    <button onClick={() => setEditingId(null)} className="text-mist hover:text-stone text-xs">✕</button>
                  </div>
                ) : (
                  <button
                    onClick={() => { setEditingId(t.id); setPendingPlan(t.planType); }}
                    className="flex items-center gap-1 text-mist text-[10px] hover:text-gold transition-colors"
                  >
                    変更 <ChevronDown size={10} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
