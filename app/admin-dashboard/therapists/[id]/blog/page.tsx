'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { CheckCircle, XCircle, Eye, MessageSquare } from 'lucide-react';
import { dummyBlogPosts, BLOG_STATUS_LABELS, type BlogStatus } from '@/data/staff-blog';

const STATUS_COLOR: Record<BlogStatus, string> = {
  draft: 'border-stone/30 bg-stone/10 text-stone',
  pending_review: 'border-amber-400/30 bg-amber-400/10 text-amber-400',
  published: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-400',
  rejected: 'border-wine/30 bg-wine/10 text-wine',
  private: 'border-mist/30 bg-mist/10 text-mist',
};

export default function TherapistAdminBlogPage() {
  const params = useParams();
  const id = params.id as string;
  const posts = dummyBlogPosts.filter((p) => p.therapistSlug === id);
  const [statuses, setStatuses] = useState<Record<string, BlogStatus>>(
    Object.fromEntries(posts.map((p) => [p.id, p.status]))
  );

  const approve = (pid: string) =>
    setStatuses((prev) => ({ ...prev, [pid]: 'published' }));
  const reject = (pid: string) =>
    setStatuses((prev) => ({ ...prev, [pid]: 'rejected' }));

  return (
    <div className="space-y-5">
      <p className="text-mist text-xs">このセラピストのブログ投稿を管理します。</p>

      {posts.length === 0 ? (
        <div className="bg-surface border border-border p-10 text-center">
          <p className="text-stone text-sm">ブログ投稿はまだありません</p>
        </div>
      ) : (
        <div className="bg-surface border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-elevated">
                <th className="text-left text-mist text-[10px] px-5 py-3 font-normal">タイトル</th>
                <th className="text-left text-mist text-[10px] px-5 py-3 font-normal">カテゴリ</th>
                <th className="text-left text-mist text-[10px] px-5 py-3 font-normal">投稿日</th>
                <th className="text-left text-mist text-[10px] px-5 py-3 font-normal">閲覧数</th>
                <th className="text-left text-mist text-[10px] px-5 py-3 font-normal">ステータス</th>
                <th className="text-right text-mist text-[10px] px-5 py-3 font-normal">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {posts.map((post) => {
                const currentStatus = statuses[post.id];
                return (
                  <tr key={post.id} className="hover:bg-elevated transition-colors">
                    <td className="px-5 py-3">
                      <p className="text-cream text-sm">{post.title}</p>
                      <div className="flex gap-1 mt-1">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-[9px] text-mist border border-border px-1.5 py-0.5">{tag}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-stone text-xs">{post.category}</td>
                    <td className="px-5 py-3 text-mist text-xs">
                      {new Date(post.createdAt).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' })}
                    </td>
                    <td className="px-5 py-3 text-stone text-xs">{post.viewCount}</td>
                    <td className="px-5 py-3">
                      <span className={`text-[10px] border px-2 py-0.5 ${STATUS_COLOR[currentStatus]}`}>
                        {BLOG_STATUS_LABELS[currentStatus]}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`/staff-blog/${post.slug}`}
                          target="_blank"
                          className="text-stone hover:text-gold transition-colors"
                        >
                          <Eye size={13} />
                        </a>
                        {currentStatus === 'pending_review' && (
                          <>
                            <button
                              onClick={() => approve(post.id)}
                              className="text-emerald-400 text-[10px] flex items-center gap-1 hover:underline"
                            >
                              <CheckCircle size={11} />
                              承認
                            </button>
                            <button
                              onClick={() => reject(post.id)}
                              className="text-wine text-[10px] flex items-center gap-1 hover:underline"
                            >
                              <XCircle size={11} />
                              差し戻し
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
