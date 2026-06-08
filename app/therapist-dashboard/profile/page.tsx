'use client';

import { useState } from 'react';
import { Save, Plus, X } from 'lucide-react';

const availableTags = [
  '癒し系', '聞き上手', '会話重視', '落ち着いた雰囲気', '明るい雰囲気',
  '大人の余裕', '清潔感', '初めての方におすすめ', '穏やかな雰囲気',
  '外出同行対応', '夜対応', '即日相談可', '紳士的', '包容力',
];

export default function ProfileEditPage() {
  const [name, setName] = useState('蓮（れん）');
  const [age, setAge] = useState('26');
  const [height, setHeight] = useState('177');
  const [intro, setIntro] = useState('日常から離れた特別な時間を一緒に過ごしませんか。');
  const [selectedTags, setSelectedTags] = useState(['癒し系', '聞き上手', '初めての方におすすめ']);
  const [areas, setAreas] = useState('渋谷、新宿、恵比寿、目黒');
  const [saved, setSaved] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : prev.length < 10 ? [...prev, tag] : prev
    );
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h2 className="font-display text-2xl text-cream mb-6">プロフィール編集</h2>

      <div className="space-y-6">
        {/* Photo */}
        <div className="card-luxury p-6">
          <p className="text-gold text-[10px] tracking-widest mb-4">プロフィール写真</p>
          <div className="flex items-center gap-4">
            <div className="w-24 h-32 bg-elevated border border-dashed border-border flex flex-col items-center justify-center gap-2">
              <Plus size={20} className="text-mist" strokeWidth={1.5} />
              <span className="text-mist text-[10px]">追加</span>
            </div>
            <div className="text-stone text-xs leading-relaxed">
              <p className="text-cream text-sm mb-1">写真の追加（準備中）</p>
              <p>グランドオープン後にアップロードできます。</p>
              <p>審査・確認後にプロフィールに反映されます。</p>
            </div>
          </div>
        </div>

        {/* Basic info */}
        <div className="card-luxury p-6">
          <p className="text-gold text-[10px] tracking-widest mb-4">基本情報</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-mist text-[10px] tracking-widest mb-2">源氏名（活動名）</label>
              <input value={name} onChange={(e) => setName(e.target.value)}
                className="w-full bg-elevated border border-border text-cream px-4 py-3 text-sm outline-none focus:border-gold/50" />
            </div>
            <div>
              <label className="block text-mist text-[10px] tracking-widest mb-2">年齢</label>
              <input value={age} onChange={(e) => setAge(e.target.value)}
                type="number" min="18"
                className="w-full bg-elevated border border-border text-cream px-4 py-3 text-sm outline-none focus:border-gold/50" />
            </div>
            <div>
              <label className="block text-mist text-[10px] tracking-widest mb-2">身長 (cm)</label>
              <input value={height} onChange={(e) => setHeight(e.target.value)}
                type="number"
                className="w-full bg-elevated border border-border text-cream px-4 py-3 text-sm outline-none focus:border-gold/50" />
            </div>
          </div>
        </div>

        {/* Intro */}
        <div className="card-luxury p-6">
          <p className="text-gold text-[10px] tracking-widest mb-4">自己紹介文</p>
          <textarea rows={5} value={intro} onChange={(e) => setIntro(e.target.value)}
            className="w-full bg-elevated border border-border text-cream px-4 py-3 text-sm outline-none focus:border-gold/50 resize-none" />
          <p className="text-mist text-[10px] mt-1">{intro.length}文字（100文字以上推奨）</p>
        </div>

        {/* Tags */}
        <div className="card-luxury p-6">
          <p className="text-gold text-[10px] tracking-widest mb-4">
            タグ（最大10個）— 選択中：{selectedTags.length}個
          </p>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => {
              const active = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`text-xs px-3 py-1.5 border transition-all duration-200 ${
                    active
                      ? 'border-gold text-gold bg-gold/10'
                      : 'border-border text-stone hover:border-gold/50 hover:text-cream'
                  }`}
                >
                  {tag}
                  {active && <X size={10} className="inline ml-1" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Areas */}
        <div className="card-luxury p-6">
          <p className="text-gold text-[10px] tracking-widest mb-4">活動エリア</p>
          <input value={areas} onChange={(e) => setAreas(e.target.value)}
            placeholder="例：渋谷、新宿、恵比寿"
            className="w-full bg-elevated border border-border text-cream px-4 py-3 text-sm placeholder:text-mist outline-none focus:border-gold/50" />
          <p className="text-mist text-[10px] mt-1">カンマ区切りで複数エリアを入力</p>
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          className="btn-primary w-full py-4 flex items-center justify-center gap-2"
        >
          <Save size={15} />
          {saved ? '保存しました' : '変更を保存する'}
        </button>
      </div>
    </div>
  );
}
