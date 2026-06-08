'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Send } from 'lucide-react';
import { useParams } from 'next/navigation';
import { dummyBlogPosts, BLOG_CATEGORIES, BLOG_TAGS } from '@/data/staff-blog';

export default function BlogEditPage() {
  const params = useParams();
  const postId = params.id as string;
  const post = dummyBlogPosts.find((p) => p.id === postId);

  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [seoTitle, setSeoTitle] = useState(post?.seoTitle || '');
  const [seoDescription, setSeoDescription] = useState(post?.seoDescription || '');
  const [category, setCategory] = useState(post?.category || '');
  const [selectedTags, setSelectedTags] = useState<string[]>(post?.tags || []);
  const [saved, setSaved] = useState<'draft' | 'submitted' | null>(null);

  if (!post) {
    return (
      <div className="text-center py-10">
        <p className="text-stone text-sm">記事が見つかりません</p>
        <Link href="/therapist-dashboard/blog" className="text-gold text-xs mt-3 inline-block hover:underline">
          ← ブログ一覧に戻る
        </Link>
      </div>
    );
  }

  const toggleTag = (tag: string) =>
    setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);

  const handleSave = (mode: 'draft' | 'submitted') => {
    setSaved(mode);
    setTimeout(() => setSaved(null), 3000);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/therapist-dashboard/blog" className="text-mist hover:text-stone transition-colors">
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h2 className="font-display text-2xl text-cream">記事を編集</h2>
          {post.status === 'rejected' && (
            <p className="text-wine text-xs mt-0.5">差し戻しになりました。修正して再提出してください。</p>
          )}
        </div>
      </div>

      <div className="space-y-5">
        <div className="card-luxury p-5">
          <label className="block text-mist text-[10px] tracking-widest mb-2">タイトル</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-elevated border border-border text-cream px-4 py-3 text-sm outline-none focus:border-gold/50"
          />
        </div>

        <div className="card-luxury p-5">
          <label className="block text-mist text-[10px] tracking-widest mb-2">本文</label>
          <textarea
            rows={12}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-elevated border border-border text-cream px-4 py-3 text-sm outline-none focus:border-gold/50 resize-none leading-relaxed"
          />
          <p className="text-mist text-[10px] mt-1">{content.length}文字</p>
        </div>

        <div className="card-luxury p-5">
          <p className="text-mist text-[10px] tracking-widest mb-4">カテゴリ・タグ</p>
          <div className="mb-4">
            <label className="block text-stone text-xs mb-2">カテゴリ</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-elevated border border-border text-cream text-sm px-3 py-2 outline-none focus:border-gold/50"
            >
              {BLOG_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-stone text-xs mb-2">タグ</label>
            <div className="flex flex-wrap gap-1.5">
              {BLOG_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`text-[10px] px-2.5 py-1 border transition-all ${
                    selectedTags.includes(tag)
                      ? 'border-gold text-gold bg-gold/10'
                      : 'border-border text-mist hover:border-gold/30 hover:text-stone'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SEO fields with friendly labels */}
        <div className="card-luxury p-5">
          <p className="text-gold text-[10px] tracking-widest mb-4">検索されやすくする設定</p>
          <div className="space-y-4">
            <div>
              <label className="block text-stone text-xs mb-2">検索で表示されるタイトル</label>
              <input
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className="w-full bg-elevated border border-border text-cream px-4 py-2.5 text-sm outline-none focus:border-gold/50"
              />
              <p className="text-mist text-[10px] mt-1">{seoTitle.length} / 60文字推奨</p>
            </div>
            <div>
              <label className="block text-stone text-xs mb-2">検索結果用の説明文</label>
              <textarea
                rows={2}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                className="w-full bg-elevated border border-border text-cream px-4 py-2.5 text-sm outline-none focus:border-gold/50 resize-none"
              />
              <p className="text-mist text-[10px] mt-1">{seoDescription.length} / 120文字推奨</p>
            </div>
          </div>
        </div>

        {saved && (
          <div className={`p-4 border text-sm ${
            saved === 'draft' ? 'border-stone/30 text-stone bg-stone/5' : 'border-emerald-400/30 text-emerald-400 bg-emerald-400/5'
          }`}>
            {saved === 'draft' ? '下書きとして保存しました' : '運営に確認のために提出しました。'}
          </div>
        )}

        <div className="flex gap-3">
          <button onClick={() => handleSave('submitted')} className="btn-primary flex items-center gap-2 flex-1 justify-center">
            <Send size={13} />
            確認のために提出する
          </button>
          <button onClick={() => handleSave('draft')} className="btn-secondary flex items-center gap-2 px-6">
            <Save size={13} />
            下書き保存
          </button>
        </div>
      </div>
    </div>
  );
}
