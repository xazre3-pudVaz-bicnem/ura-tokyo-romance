import Link from 'next/link';
import { Plus, Eye, Pencil } from 'lucide-react';
import { dummyBlogPosts, BLOG_STATUS_LABELS, type BlogStatus } from '@/data/staff-blog';

const STATUS_COLOR: Record<BlogStatus, string> = {
  draft: 'border-stone/30 bg-stone/10 text-stone',
  pending_review: 'border-amber-400/30 bg-amber-400/10 text-amber-400',
  published: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-400',
  rejected: 'border-wine/30 bg-wine/10 text-wine',
  private: 'border-mist/30 bg-mist/10 text-mist',
};

// Show posts for the logged-in therapist (demo: ritsu)
const myPosts = dummyBlogPosts.filter((p) => p.therapistSlug === 'ritsu');

export default function BlogListPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl text-cream">ブログ</h2>
          <p className="text-stone text-xs mt-1">
            ブログを書いて、あなたの個性や日常を伝えましょう。承認後に公開されます。
          </p>
        </div>
        <Link href="/therapist-dashboard/blog/new" className="btn-primary text-xs py-2 px-4 flex items-center gap-2">
          <Plus size={13} />
          新しい記事を書く
        </Link>
      </div>

      {/* Info box */}
      <div className="bg-gold/5 border border-gold/20 p-4 mb-6">
        <p className="text-gold text-[10px] tracking-widest mb-2">ブログの流れ</p>
        <div className="flex flex-wrap gap-2 items-center text-[10px] text-stone">
          {['下書き保存', '運営確認待ちで提出', '運営が確認', '承認されたら公開'].map((step, i, arr) => (
            <span key={step} className="flex items-center gap-2">
              <span className="text-cream">{step}</span>
              {i < arr.length - 1 && <span className="text-mist">→</span>}
            </span>
          ))}
        </div>
      </div>

      {myPosts.length === 0 ? (
        <div className="card-luxury p-12 text-center">
          <p className="text-stone text-sm mb-4">まだブログを書いていません</p>
          <Link href="/therapist-dashboard/blog/new" className="btn-primary text-sm">
            最初の記事を書く
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {myPosts.map((post) => (
            <div key={post.id} className="card-luxury p-5 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-[10px] border px-2 py-0.5 ${STATUS_COLOR[post.status]}`}>
                    {BLOG_STATUS_LABELS[post.status]}
                  </span>
                  <span className="text-mist text-[10px]">{post.category}</span>
                  <span className="text-mist text-[10px]">
                    {new Date(post.createdAt).toLocaleDateString('ja-JP', { year: 'numeric', month: 'numeric', day: 'numeric' })}
                  </span>
                </div>
                <h3 className="text-cream text-sm font-display truncate">{post.title}</h3>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[9px] border border-border text-mist px-1.5 py-0.5">{tag}</span>
                  ))}
                </div>
                {post.status === 'rejected' && (
                  <p className="text-wine text-[10px] mt-2">
                    ※ 差し戻しになりました。内容を修正して再提出してください。
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {post.status === 'published' && (
                  <a
                    href={`/staff-blog/${post.slug}`}
                    target="_blank"
                    className="text-stone hover:text-gold transition-colors"
                  >
                    <Eye size={14} />
                  </a>
                )}
                <Link
                  href={`/therapist-dashboard/blog/edit/${post.id}`}
                  className="flex items-center gap-1 text-stone text-[10px] border border-border px-3 py-1.5 hover:border-gold/30 hover:text-gold transition-colors"
                >
                  <Pencil size={11} />
                  編集
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          { label: '公開中の記事', value: myPosts.filter(p => p.status === 'published').length, color: 'text-emerald-400' },
          { label: '確認待ち', value: myPosts.filter(p => p.status === 'pending_review').length, color: 'text-amber-400' },
          { label: '下書き', value: myPosts.filter(p => p.status === 'draft').length, color: 'text-stone' },
        ].map((s) => (
          <div key={s.label} className="card-luxury p-4 text-center">
            <p className={`text-2xl font-display ${s.color}`}>{s.value}</p>
            <p className="text-mist text-[10px] mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
