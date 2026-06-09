import type { Metadata } from 'next';
import Link from 'next/link';
import { dummyTherapists } from '@/data/dummy-therapists';
import TherapistCard from '@/components/ui/TherapistCard';
import { Search, SlidersHorizontal } from 'lucide-react';

export const metadata: Metadata = {
  title: '条件から探す｜東京 女風マッチング 裏東京ロマンス',
  description:
    '東京の女風セラピストを条件で絞り込んで探す。エリア・時間帯・雰囲気・料金・本人確認済み・即日相談可など多彩な条件で検索できます。',
  alternates: { canonical: 'https://uratokyoromance.com/search' },
};

const areas = ['渋谷・恵比寿', '新宿・歌舞伎町', '銀座・六本木', '池袋・高田馬場', '表参道・青山', '上野・秋葉原', '品川・大崎'];
const timeSlots = ['午前（〜12時）', '午後（12〜18時）', '夜（18〜23時）', '深夜（23時〜）'];
const moods = ['癒し系', '落ち着いた雰囲気', '大人の余裕', '聞き上手', '会話重視', '初めての方におすすめ', '外出デート対応', '即日相談可', '新人'];
const ageRanges = ['20〜24歳', '25〜29歳', '30歳以上'];
const priceRanges = ['〜¥15,000', '〜¥20,000', '〜¥25,000', '上限なし'];

export default function SearchPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-5 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold text-[10px] tracking-[0.3em] mb-4">Advanced Search</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-5 tracking-wide">条件から探す</h1>
          <span className="block w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-stone leading-relaxed">
            エリア・時間帯・雰囲気・料金など、あなたの希望条件で絞り込んで探せます。
          </p>
        </div>
      </section>

      <section className="section-py px-5">
        <div className="max-w-5xl mx-auto">
          {/* Search panel */}
          <div className="card-luxury p-8 mb-12">
            <div className="flex items-center gap-3 mb-8">
              <SlidersHorizontal size={16} className="text-gold" />
              <p className="text-cream text-sm">絞り込み条件</p>
            </div>

            <div className="space-y-8">
              {/* Keyword */}
              <div>
                <label className="block text-gold text-[10px] tracking-widest mb-3">キーワード</label>
                <div className="flex items-center gap-3 bg-elevated border border-border px-4 py-3">
                  <Search size={14} className="text-stone flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="名前・雰囲気・特徴など"
                    className="flex-1 bg-transparent text-cream text-sm placeholder:text-mist outline-none"
                  />
                </div>
              </div>

              {/* Area */}
              <div>
                <label className="block text-gold text-[10px] tracking-widest mb-3">エリア</label>
                <div className="flex flex-wrap gap-2">
                  {areas.map((area) => (
                    <button
                      key={area}
                      className="px-3 py-2 text-[11px] tracking-wide border border-border text-stone hover:border-gold hover:text-gold transition-all duration-200"
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time */}
              <div>
                <label className="block text-gold text-[10px] tracking-widest mb-3">時間帯</label>
                <div className="flex flex-wrap gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      className="px-3 py-2 text-[11px] tracking-wide border border-border text-stone hover:border-gold hover:text-gold transition-all duration-200"
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mood */}
              <div>
                <label className="block text-gold text-[10px] tracking-widest mb-3">雰囲気・タイプ</label>
                <div className="flex flex-wrap gap-2">
                  {moods.map((mood) => (
                    <button
                      key={mood}
                      className="px-3 py-2 text-[11px] tracking-wide border border-border rounded-full text-stone hover:border-gold hover:text-gold transition-all duration-200"
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>

              {/* Age */}
              <div>
                <label className="block text-gold text-[10px] tracking-widest mb-3">年齢</label>
                <div className="flex flex-wrap gap-2">
                  {ageRanges.map((range) => (
                    <button
                      key={range}
                      className="px-3 py-2 text-[11px] tracking-wide border border-border text-stone hover:border-gold hover:text-gold transition-all duration-200"
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="block text-gold text-[10px] tracking-widest mb-3">料金目安（60分）</label>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range}
                      className="px-3 py-2 text-[11px] tracking-wide border border-border text-stone hover:border-gold hover:text-gold transition-all duration-200"
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap gap-6 pt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="w-10 h-5 rounded-full bg-border flex items-center px-0.5">
                    <div className="w-4 h-4 rounded-full bg-base" />
                  </div>
                  <span className="text-stone text-xs">本人確認済みのみ</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="w-10 h-5 rounded-full bg-border flex items-center px-0.5">
                    <div className="w-4 h-4 rounded-full bg-base" />
                  </div>
                  <span className="text-stone text-xs">即日相談可のみ</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="w-10 h-5 rounded-full bg-border flex items-center px-0.5">
                    <div className="w-4 h-4 rounded-full bg-base" />
                  </div>
                  <span className="text-stone text-xs">新人のみ</span>
                </label>
              </div>

              <button className="btn-primary w-full flex items-center justify-center gap-3 py-4">
                <Search size={16} />
                この条件でセラピストを探す
              </button>
            </div>
          </div>

          {/* Results */}
          <div>
            <p className="text-stone text-sm mb-6">
              検索結果：<span className="text-cream font-sans">{dummyTherapists.length}</span>名が見つかりました
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {dummyTherapists.map((t) => (
                <TherapistCard key={t.id} therapist={t} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
