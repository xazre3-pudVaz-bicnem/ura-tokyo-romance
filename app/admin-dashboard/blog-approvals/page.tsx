'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle, XCircle, Eye, MessageSquare } from 'lucide-react';
import { dummyBlogPosts, BLOG_STATUS_LABELS, type BlogStatus } from '@/data/staff-blog';

const STATUS_COLOR: Record<BlogStatus, string> = {
  draft: 'border-stone/30 bg-stone/10 text-stone',
  pending_review: 'border-amber-400/30 bg-amber-400/10 text-amber-400',
  published: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-400',
  rejected: 'border-wine/30 bg-wine/10 text-wine',
  private: 'border-mist/30 bg-mist/10 text-mist',
};

export default function BlogApprovalsPage() {
  const [statuses, setStatuses] = useState<Record<string, BlogStatus>>(
    Object.fromEntries(dummyBlogPosts.map((p) => [p.id, p.status]))
  );
  const [filter, setFilter] = useState<BlogStatus | 'all'>('pending_review');
  const [rejectNote, setRejectNote] = useState<Record<string, string>>({});

  const approve = (pid: string) =>
    setStatuses((prev) => ({ ...prev, [pid]: 'published' }));
  const reject = (pid: string) =>
    setStatuses((prev) => ({ ...prev, [pid]: 'rejected' }));

  const filtered = dummyBlogPosts.filter(
    (p) => filter === 'all' || statuses[p.id] === filter
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-cream">ブログ承認</h1>
          <p className="text-mist text-xs mt-1">セラピストのブログ投稿を審査・承認</p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-amber-400">
            {Object.values(statuses).filter(s => s === 'pending_review').length}件 承認待ち
          </span>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {(['all', 'pending_review', 'published', 'rejected'] as const).map((s) => {
          const count = s === 'all'
            ? dummyBlogPosts.length
            : Object.values(statuses).filter(st => st === s).length;
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`text-[10px] px-3 py-1.5 border transition-all ${
                filter === s ? 'border-gold/50 text-gold bg-gold/5' : 'border-border text-mist hover:text-stone'
              }`}
            >
              {s === 'all' ? 'すべて' : BLOG_STATUS_LABELS[s]} ({count})
            </button>
          );
        })}
      </div>

      {/* Blog list */}
      <div className="space-y-4">
        {filtered.map((post) => {
          const currentStatus = statuses[post.id];
          return (
            <div key={post.id} className="bg-surface border border-border overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                {post.image && (
                  <div className="w-full md:w-24 h-24 md:h-auto flex-shrink-0 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover object-top" />
                  </div>
                )}

                <div className="flex-1 p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-gold text-xs">{post.therapistName}</span>
                        <span className="text-mist text-[10px]">{post.category}</span>
                        <span className={`text-[10px] border px-1.5 py-0.5 ${STATUS_COLOR[currentStatus]}`}>
                          {BLOG_STATUS_LABELS[currentStatus]}
                        </span>
                      </div>
                      <h3 className="text-cream text-sm font-display">{post.title}</h3>
                    </div>
                    <span className="text-mist text-[10px] flex-shrink-0">
                      {new Date(post.createdAt).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' })}
                    </span>
                  </div>

                  <p className="text-stone text-xs leading-relaxed mb-3 line-clamp-2">{post.excerpt}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-[9px] border border-border text-mist px-1.5 py-0.5">{tag}</span>
                    ))}
                  </div>

                  {/* SEO info */}
                  {post.seoTitle && (
                    <div className="border-t border-border/50 pt-3 mb-3">
                      <p className="text-mist text-[10px] mb-1">検索で表示されるタイトル: <span className="text-stone">{post.seoTitle}</span></p>
                    </div>
                  )}

                  {/* Reject note */}
                  {currentStatus === 'pending_review' && (
                    <div className="mb-3">
                      <input
                        type="text"
                        placeholder="差し戻しコメント（任意）"
                        value={rejectNote[post.id] || ''}
                        onChange={(e) => setRejectNote(prev => ({ ...prev, [post.id]: e.target.value }))}
                        className="w-full bg-elevated border border-border text-cream text-xs px-3 py-2 outline-none focus:border-gold/50"
                      />
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <a
                      href={`/staff-blog/${post.slug}`}
                      target="_blank"
                      className="flex items-center gap-1 text-stone text-[10px] hover:text-gold transition-colors"
                    >
                      <Eye size={12} />
                      プレビュー
                    </a>
                    {currentStatus === 'pending_review' && (
                      <>
                        <button
                          onClick={() => approve(post.id)}
                          className="flex items-center gap-1 text-emerald-400 text-[10px] border border-emerald-400/30 px-3 py-1.5 hover:bg-emerald-400/10 transition-colors"
                        >
                          <CheckCircle size={11} />
                          承認・公開する
                        </button>
                        <button
                          onClick={() => reject(post.id)}
                          className="flex items-center gap-1 text-wine text-[10px] border border-wine/30 px-3 py-1.5 hover:bg-wine/10 transition-colors"
                        >
                          <XCircle size={11} />
                          差し戻す
                        </button>
                      </>
                    )}
                    {currentStatus === 'published' && (
                      <span className="text-emerald-400 text-[10px]">✓ 公開中</span>
                    )}
                    {currentStatus === 'rejected' && (
                      <button
                        onClick={() => setStatuses(prev => ({ ...prev, [post.id]: 'pending_review' }))}
                        className="text-stone text-[10px] hover:text-cream transition-colors"
                      >
                        再審査に戻す
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="bg-surface border border-border p-10 text-center">
            <p className="text-stone text-sm">該当するブログ投稿はありません</p>
          </div>
        )}
      </div>
    </div>
  );
}
