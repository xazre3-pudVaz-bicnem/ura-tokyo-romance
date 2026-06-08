'use client';

import { useState } from 'react';
import { Upload, Eye, EyeOff, GripVertical, AlertCircle, CheckCircle, Clock } from 'lucide-react';

type PhotoCategory = 'main' | 'sub' | 'card' | 'blog';
type ReviewStatus = 'approved' | 'pending' | 'not_submitted';

interface Photo {
  id: string;
  category: PhotoCategory;
  src?: string;
  isPublic: boolean;
  reviewStatus: ReviewStatus;
  order: number;
}

const CATEGORY_INFO: Record<PhotoCategory, { label: string; desc: string; max: number }> = {
  main: { label: 'メイン写真', desc: 'プロフィールのメインに表示されます（1枚）', max: 1 },
  sub: { label: 'サブ写真', desc: 'プロフィールに追加表示されます（最大5枚）', max: 5 },
  card: { label: 'カード写真', desc: '一覧ページのカードに表示されます（1枚）', max: 1 },
  blog: { label: 'ブログ用写真', desc: 'ブログ記事で使用できます（最大10枚）', max: 10 },
};

const REVIEW_LABELS: Record<ReviewStatus, string> = {
  approved: '運営確認済み',
  pending: '確認中',
  not_submitted: '未提出',
};

const REVIEW_COLOR: Record<ReviewStatus, string> = {
  approved: 'text-emerald-400',
  pending: 'text-amber-400',
  not_submitted: 'text-mist',
};

const initialPhotos: Photo[] = [
  { id: 'p1', category: 'main', src: '/images/t06.png', isPublic: true, reviewStatus: 'approved', order: 1 },
  { id: 'p2', category: 'card', src: '/images/t06.png', isPublic: false, reviewStatus: 'pending', order: 1 },
  { id: 'p3', category: 'sub', src: '/images/t06.png', isPublic: false, reviewStatus: 'not_submitted', order: 1 },
];

export default function PhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const [activeCategory, setActiveCategory] = useState<PhotoCategory>('main');

  const categoryPhotos = photos.filter((p) => p.category === activeCategory);
  const info = CATEGORY_INFO[activeCategory];

  const togglePublic = (id: string) =>
    setPhotos((prev) => prev.map((p) => p.id === id ? { ...p, isPublic: !p.isPublic } : p));

  return (
    <div>
      <h2 className="font-display text-2xl text-cream mb-2">写真管理</h2>
      <p className="text-stone text-xs mb-6">
        アップロードした写真は運営が確認した後に公開されます。確認には通常1〜2営業日かかります。
      </p>

      {/* Category tabs */}
      <div className="flex border-b border-border mb-6 overflow-x-auto">
        {(Object.keys(CATEGORY_INFO) as PhotoCategory[]).map((cat) => {
          const count = photos.filter((p) => p.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 text-xs whitespace-nowrap transition-colors border-b-2 -mb-px ${
                activeCategory === cat
                  ? 'border-gold text-gold'
                  : 'border-transparent text-stone hover:text-cream'
              }`}
            >
              {CATEGORY_INFO[cat].label}
              <span className="ml-1.5 text-mist text-[10px]">({count})</span>
            </button>
          );
        })}
      </div>

      <p className="text-mist text-[10px] mb-4">{info.desc}</p>

      {/* Photo grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {categoryPhotos.map((photo) => (
          <div key={photo.id} className="bg-surface border border-border overflow-hidden">
            {/* Photo */}
            <div className="relative aspect-[3/4] overflow-hidden">
              {photo.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photo.src}
                  alt="my photo"
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full bg-elevated flex items-center justify-center">
                  <p className="text-mist text-[10px]">写真なし</p>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-base/60 to-transparent" />

              {/* Drag handle */}
              <div className="absolute top-2 left-2 text-white/40 cursor-grab">
                <GripVertical size={14} />
              </div>

              {/* Public badge */}
              <div className="absolute top-2 right-2">
                {photo.isPublic ? (
                  <Eye size={13} className="text-emerald-400" />
                ) : (
                  <EyeOff size={13} className="text-mist" />
                )}
              </div>
            </div>

            {/* Info */}
            <div className="p-3">
              <div className={`flex items-center gap-1 text-[10px] mb-2 ${REVIEW_COLOR[photo.reviewStatus]}`}>
                {photo.reviewStatus === 'approved' ? <CheckCircle size={10} /> :
                 photo.reviewStatus === 'pending' ? <Clock size={10} /> :
                 <AlertCircle size={10} />}
                {REVIEW_LABELS[photo.reviewStatus]}
              </div>

              <button
                onClick={() => togglePublic(photo.id)}
                className={`w-full text-[10px] border py-1 transition-colors ${
                  photo.isPublic
                    ? 'border-stone/30 text-stone hover:border-wine/30 hover:text-wine'
                    : 'border-gold/30 text-gold hover:bg-gold/10'
                }`}
              >
                {photo.isPublic ? '非公開にする' : '公開にする'}
              </button>
            </div>
          </div>
        ))}

        {/* Upload slot */}
        {categoryPhotos.length < info.max && (
          <div className="bg-surface border border-dashed border-border aspect-[3/4] flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-gold/30 transition-colors">
            <Upload size={20} className="text-mist" strokeWidth={1.5} />
            <p className="text-mist text-[10px]">写真を追加</p>
            <p className="text-mist text-[9px]">（グランドオープン後）</p>
          </div>
        )}
      </div>

      {/* Guidelines */}
      <div className="bg-elevated border border-border p-5">
        <p className="text-gold text-[10px] tracking-widest mb-3">写真の規定</p>
        <ul className="space-y-1.5">
          {[
            '顔または上半身が写っている写真',
            'JPG・PNG形式（最大5MB/枚）',
            '他サイトから転用した写真は不可',
            '過度な加工・フィルターは使用しないこと',
            '写真に第三者が写り込んでいないこと',
            '公序良俗に反する内容は不可',
          ].map((rule) => (
            <li key={rule} className="flex items-center gap-2 text-stone text-xs">
              <span className="text-gold flex-shrink-0">—</span>
              {rule}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
