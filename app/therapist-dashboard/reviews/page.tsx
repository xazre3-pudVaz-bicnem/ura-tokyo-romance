import { Star, MessageSquare } from 'lucide-react';

export default function ReviewsPage() {
  return (
    <div>
      <h2 className="font-display text-2xl text-cream mb-6">口コミ管理</h2>

      <div className="card-luxury p-10 text-center mb-6">
        <Star size={40} className="text-mist mx-auto mb-4" strokeWidth={1} />
        <p className="text-cream text-sm mb-2">口コミはグランドオープン後に公開されます</p>
        <p className="text-stone text-xs leading-relaxed">
          2026年8月1日グランドオープン後、実際にご利用いただいた方からの口コミがここに表示されます。
          口コミへの返信・管理もこのページから行えます。
        </p>
      </div>

      <div className="card-luxury p-6">
        <p className="text-gold text-[10px] tracking-widest mb-4">口コミ機能について</p>
        <div className="space-y-3 text-stone text-xs leading-relaxed">
          <div className="flex items-start gap-2">
            <Star size={12} className="text-gold flex-shrink-0 mt-0.5" />
            <p>実際に利用したユーザーのみが口コミを投稿できます。</p>
          </div>
          <div className="flex items-start gap-2">
            <MessageSquare size={12} className="text-gold flex-shrink-0 mt-0.5" />
            <p>口コミへの返信は管理画面から行えます。</p>
          </div>
          <div className="flex items-start gap-2">
            <Star size={12} className="text-gold flex-shrink-0 mt-0.5" />
            <p>評価基準：安心感・清潔感・会話・時間の過ごしやすさ・初回向き・総合評価の6項目。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
