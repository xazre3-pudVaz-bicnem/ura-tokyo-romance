'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

const AREAS = ['渋谷', '新宿', '池袋', '銀座', '六本木', '上野', '品川', '恵比寿', '中目黒', '吉祥寺'];

export default function NewTherapistPage() {
  const [stageName, setStageName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [email, setEmail] = useState('');
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [intro, setIntro] = useState('');
  const [generateId, setGenerateId] = useState(false);
  const [saved, setSaved] = useState(false);

  const toggleArea = (area: string) =>
    setSelectedAreas((prev) => prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin-dashboard/therapists" className="text-mist hover:text-stone transition-colors">
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="font-display text-2xl text-cream">セラピスト登録</h1>
          <p className="text-mist text-xs mt-0.5">新規セラピストのプロフィール作成</p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Basic info */}
        <div className="bg-surface border border-border p-6">
          <p className="text-gold text-[10px] tracking-widest mb-4">基本情報</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-mist text-[10px] tracking-widest mb-2">源氏名（活動名）<span className="text-wine ml-1">*</span></label>
              <input
                value={stageName}
                onChange={(e) => setStageName(e.target.value)}
                placeholder="例：蓮（れん）"
                className="w-full bg-elevated border border-border text-cream px-4 py-2.5 text-sm outline-none focus:border-gold/50"
              />
            </div>
            <div>
              <label className="block text-mist text-[10px] tracking-widest mb-2">年齢<span className="text-wine ml-1">*</span></label>
              <input
                type="number" min="18" max="60"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full bg-elevated border border-border text-cream px-4 py-2.5 text-sm outline-none focus:border-gold/50"
              />
            </div>
            <div>
              <label className="block text-mist text-[10px] tracking-widest mb-2">身長 (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full bg-elevated border border-border text-cream px-4 py-2.5 text-sm outline-none focus:border-gold/50"
              />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-surface border border-border p-6">
          <p className="text-gold text-[10px] tracking-widest mb-4">連絡先（管理用）</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="therapist@example.com"
            className="w-full bg-elevated border border-border text-cream px-4 py-2.5 text-sm outline-none focus:border-gold/50"
          />
          <p className="text-mist text-[10px] mt-1.5">セラピストへの通知に使用します。公開されません。</p>
        </div>

        {/* Areas */}
        <div className="bg-surface border border-border p-6">
          <p className="text-gold text-[10px] tracking-widest mb-4">活動エリア</p>
          <div className="flex flex-wrap gap-2">
            {AREAS.map((area) => (
              <button
                key={area}
                onClick={() => toggleArea(area)}
                className={`text-xs px-3 py-1.5 border transition-all ${
                  selectedAreas.includes(area)
                    ? 'border-gold text-gold bg-gold/10'
                    : 'border-border text-stone hover:border-gold/50 hover:text-cream'
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        {/* Intro */}
        <div className="bg-surface border border-border p-6">
          <p className="text-gold text-[10px] tracking-widest mb-4">自己紹介文</p>
          <textarea
            rows={4}
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            className="w-full bg-elevated border border-border text-cream px-4 py-3 text-sm outline-none focus:border-gold/50 resize-none"
          />
        </div>

        {/* Account creation */}
        <div className="bg-surface border border-border p-6">
          <p className="text-gold text-[10px] tracking-widest mb-4">アカウント発行</p>
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() => setGenerateId(!generateId)}
              className={`w-10 h-5 rounded-full transition-colors relative ${generateId ? 'bg-gold' : 'bg-border'}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-cream transition-transform ${generateId ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </div>
            <span className="text-stone text-sm">登録と同時にログインID・初期パスワードを発行する</span>
          </label>
          {generateId && (
            <div className="mt-4 p-4 bg-elevated border border-border/50">
              <p className="text-mist text-[10px] mb-3">発行されるアカウント情報（例）</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-mist text-[10px] mb-1">ログインID</p>
                  <p className="text-cream text-sm font-mono">
                    {stageName ? stageName.replace(/[（）()]/g, '').toLowerCase().slice(0, 8) + '_ura001' : '（源氏名入力後に表示）'}
                  </p>
                </div>
                <div>
                  <p className="text-mist text-[10px] mb-1">初期パスワード</p>
                  <p className="text-cream text-sm font-mono">（自動生成）</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button onClick={handleSave} className="btn-primary flex items-center gap-2 px-8">
            <Save size={14} />
            {saved ? '保存しました' : '保存する'}
          </button>
          <Link href="/admin-dashboard/therapists" className="btn-secondary px-6">キャンセル</Link>
        </div>
      </div>
    </div>
  );
}
