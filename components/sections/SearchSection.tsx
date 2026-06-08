'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Clock, User, DollarSign, ShieldCheck, Star } from 'lucide-react';

const areas = ['渋谷・恵比寿', '新宿・歌舞伎町', '銀座・六本木', '池袋・高田馬場', '表参道・青山', '上野・浅草', '秋葉原・神田', '品川・大崎'];
const timeSlots = ['午前（〜12時）', '午後（12〜18時）', '夜（18〜23時）', '深夜（23時〜）'];
const moods = ['癒し系', '落ち着いた雰囲気', '大人の余裕', '聞き上手', '会話重視', '初めての方におすすめ', '外出デート対応', '即日相談可'];
const priceRanges = ['〜¥15,000', '〜¥20,000', '〜¥25,000', '上限なし'];

export default function SearchSection() {
  const router = useRouter();
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [consultOnly, setConsultOnly] = useState(false);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedArea) params.set('area', selectedArea);
    if (selectedTime) params.set('time', selectedTime);
    if (selectedMood) params.set('mood', selectedMood);
    if (selectedPrice) params.set('price', selectedPrice);
    if (verifiedOnly) params.set('verified', '1');
    if (consultOnly) params.set('consult', '1');
    router.push(`/therapists?${params.toString()}`);
  };

  return (
    <section className="section-py px-5 bg-surface border-y border-border">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <div className="text-center mb-10">
          <p className="text-gold text-[10px] tracking-[0.3em] uppercase mb-3">Search</p>
          <h2 className="font-display text-3xl md:text-4xl text-cream tracking-wide mb-3">
            条件からセラピストを探す
          </h2>
          <p className="text-stone text-sm">エリア・時間帯・雰囲気・料金など、あなたの希望条件で絞り込めます。</p>
        </div>

        {/* Search form */}
        <div className="card-luxury p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Area */}
            <div>
              <label className="flex items-center gap-2 text-gold text-[10px] tracking-widest mb-3">
                <MapPin size={12} />
                エリア
              </label>
              <div className="flex flex-wrap gap-2">
                {areas.map((area) => (
                  <button
                    key={area}
                    onClick={() => setSelectedArea(selectedArea === area ? '' : area)}
                    className={`px-3 py-1.5 text-[11px] tracking-wide border transition-all duration-200 ${
                      selectedArea === area
                        ? 'border-gold text-gold bg-gold/10'
                        : 'border-border text-stone hover:border-stone/60'
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            {/* Time */}
            <div>
              <label className="flex items-center gap-2 text-gold text-[10px] tracking-widest mb-3">
                <Clock size={12} />
                時間帯
              </label>
              <div className="flex flex-wrap gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedTime(selectedTime === slot ? '' : slot)}
                    className={`px-3 py-1.5 text-[11px] tracking-wide border transition-all duration-200 ${
                      selectedTime === slot
                        ? 'border-gold text-gold bg-gold/10'
                        : 'border-border text-stone hover:border-stone/60'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Mood */}
            <div>
              <label className="flex items-center gap-2 text-gold text-[10px] tracking-widest mb-3">
                <User size={12} />
                雰囲気・タイプ
              </label>
              <div className="flex flex-wrap gap-2">
                {moods.map((mood) => (
                  <button
                    key={mood}
                    onClick={() => setSelectedMood(selectedMood === mood ? '' : mood)}
                    className={`px-3 py-1.5 text-[11px] tracking-wide border rounded-full transition-all duration-200 ${
                      selectedMood === mood
                        ? 'border-gold text-gold bg-gold/10'
                        : 'border-border text-stone hover:border-stone/60'
                    }`}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="flex items-center gap-2 text-gold text-[10px] tracking-widest mb-3">
                <DollarSign size={12} />
                料金目安（60分）
              </label>
              <div className="flex flex-wrap gap-2">
                {priceRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => setSelectedPrice(selectedPrice === range ? '' : range)}
                    className={`px-3 py-1.5 text-[11px] tracking-wide border transition-all duration-200 ${
                      selectedPrice === range
                        ? 'border-gold text-gold bg-gold/10'
                        : 'border-border text-stone hover:border-stone/60'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Toggles */}
          <div className="flex flex-wrap gap-6 mb-8">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <div
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                className={`w-10 h-5 rounded-full transition-colors duration-200 flex items-center px-0.5 ${
                  verifiedOnly ? 'bg-gold' : 'bg-border'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-base transition-transform duration-200 ${verifiedOnly ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-gold" />
                <span className="text-stone text-xs">本人確認済みのみ</span>
              </div>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <div
                onClick={() => setConsultOnly(!consultOnly)}
                className={`w-10 h-5 rounded-full transition-colors duration-200 flex items-center px-0.5 ${
                  consultOnly ? 'bg-wine' : 'bg-border'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-base transition-transform duration-200 ${consultOnly ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
              <div className="flex items-center gap-1.5">
                <Star size={13} className="text-wine" />
                <span className="text-stone text-xs">即日相談可のみ</span>
              </div>
            </label>
          </div>

          {/* Search button */}
          <button
            onClick={handleSearch}
            className="btn-primary w-full flex items-center justify-center gap-3 py-4 text-sm"
          >
            <Search size={16} />
            この条件でセラピストを探す
          </button>
        </div>

        {/* Quick links */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {[
            { label: '今日会える', href: '/schedule' },
            { label: '新人セラピスト', href: '/newface' },
            { label: '人気ランキング', href: '/ranking' },
            { label: '口コミ評価順', href: '/therapists?sort=review' },
            { label: 'エリアから探す', href: '/area' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-stone text-xs tracking-wider hover:text-gold transition-colors border border-border/50 px-3 py-1.5 hover:border-gold/30"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
