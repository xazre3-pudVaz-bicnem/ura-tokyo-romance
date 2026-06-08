'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Save, ExternalLink, Twitter, Instagram } from 'lucide-react';
import Link from 'next/link';
import { dummyTherapists } from '@/data/dummy-therapists';

export default function TherapistAdminProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const therapist = dummyTherapists.find((t) => t.slug === id);
  const [saved, setSaved] = useState(false);

  if (!therapist) return <p className="text-stone text-sm">セラピストが見つかりません。</p>;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-mist text-xs">プロフィール確認・編集</p>
        <Link
          href={`/therapists/${therapist.slug}`}
          target="_blank"
          className="flex items-center gap-1.5 text-gold text-[10px] hover:underline"
        >
          <ExternalLink size={11} />
          公開ページを見る
        </Link>
      </div>

      {/* View-only profile data */}
      <div className="bg-surface border border-border p-6">
        <p className="text-gold text-[10px] tracking-widest mb-4">現在のプロフィール</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <p className="text-mist text-[10px] mb-1">源氏名</p>
            <p className="text-cream text-sm">{therapist.name}</p>
          </div>
          <div>
            <p className="text-mist text-[10px] mb-1">年齢 / 身長</p>
            <p className="text-cream text-sm">{therapist.age}歳 / {therapist.height}cm</p>
          </div>
          <div>
            <p className="text-mist text-[10px] mb-1">活動エリア</p>
            <p className="text-cream text-sm">{therapist.areas.join('、')}</p>
          </div>
          <div>
            <p className="text-mist text-[10px] mb-1">本人確認</p>
            <p className={`text-sm ${therapist.verifiedId ? 'text-emerald-400' : 'text-wine'}`}>
              {therapist.verifiedId ? '確認済み' : '未確認'}
            </p>
          </div>
          <div className="md:col-span-2">
            <p className="text-mist text-[10px] mb-1">タグ</p>
            <div className="flex flex-wrap gap-1.5">
              {therapist.tags.map((tag) => (
                <span key={tag} className="text-[10px] border border-border text-stone px-2 py-0.5">{tag}</span>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <p className="text-mist text-[10px] mb-1">自己紹介文</p>
            <p className="text-stone text-sm leading-relaxed">{therapist.recommended}</p>
          </div>
          {(therapist.socialLinks?.x || therapist.socialLinks?.instagram) && (
            <div className="md:col-span-2">
              <p className="text-mist text-[10px] mb-2">SNSリンク</p>
              <div className="flex flex-wrap gap-2">
                {therapist.socialLinks?.x && (
                  <a href={therapist.socialLinks.x} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[10px] text-stone border border-border px-3 py-1.5 hover:border-gold/40 hover:text-cream transition-colors">
                    <Twitter size={10} /> X
                  </a>
                )}
                {therapist.socialLinks?.instagram && (
                  <a href={therapist.socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[10px] text-stone border border-border px-3 py-1.5 hover:border-gold/40 hover:text-cream transition-colors">
                    <Instagram size={10} /> Instagram
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Admin overrides — SNS edit */}
      <div className="bg-surface border border-border p-6">
        <p className="text-gold text-[10px] tracking-widest mb-4">SNS設定（管理者編集）</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-mist text-[10px] tracking-widest mb-2">
              <Twitter size={10} /> X（旧Twitter）URL
            </label>
            <input
              type="url"
              defaultValue={therapist.socialLinks?.x ?? ''}
              placeholder="https://x.com/handle"
              className="w-full bg-elevated border border-border text-cream px-4 py-2.5 text-sm placeholder:text-mist outline-none focus:border-gold/50"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-mist text-[10px] tracking-widest mb-2">
              <Instagram size={10} /> Instagram URL
            </label>
            <input
              type="url"
              defaultValue={therapist.socialLinks?.instagram ?? ''}
              placeholder="https://www.instagram.com/handle/"
              className="w-full bg-elevated border border-border text-cream px-4 py-2.5 text-sm placeholder:text-mist outline-none focus:border-gold/50"
            />
          </div>
        </div>
      </div>

      {/* Admin overrides */}
      <div className="bg-surface border border-border p-6">
        <p className="text-gold text-[10px] tracking-widest mb-4">管理者設定（上書き）</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-mist text-[10px] tracking-widest mb-2">公開状態</label>
            <select className="w-full bg-elevated border border-border text-cream px-4 py-2.5 text-sm outline-none focus:border-gold/50">
              <option value="public">公開中</option>
              <option value="prep">準備中（プレビューのみ）</option>
              <option value="hidden">非公開</option>
            </select>
          </div>
          <div>
            <label className="block text-mist text-[10px] tracking-widest mb-2">本人確認ステータス</label>
            <select
              defaultValue={therapist.verifiedId ? 'verified' : 'pending'}
              className="w-full bg-elevated border border-border text-cream px-4 py-2.5 text-sm outline-none focus:border-gold/50"
            >
              <option value="verified">確認済み</option>
              <option value="pending">審査中</option>
              <option value="not_submitted">未提出</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-mist text-[10px] tracking-widest mb-2">管理メモ（非公開）</label>
            <textarea
              rows={3}
              defaultValue=""
              placeholder="内部メモを入力してください..."
              className="w-full bg-elevated border border-border text-cream px-4 py-2.5 text-sm outline-none focus:border-gold/50 resize-none placeholder:text-mist"
            />
          </div>
        </div>
        <button
          onClick={handleSave}
          className="btn-primary flex items-center gap-2 mt-4 px-6 text-sm"
        >
          <Save size={13} />
          {saved ? '保存しました' : '管理設定を保存'}
        </button>
      </div>
    </div>
  );
}
