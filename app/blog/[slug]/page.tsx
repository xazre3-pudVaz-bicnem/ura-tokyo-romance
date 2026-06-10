'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Tag } from 'lucide-react';
import {
  formatWpDate,
  stripHtml,
  getPostFeaturedImage,
  getPostCategories,
} from '@/lib/wordpress';
import type { WpPost } from '@/lib/wordpress';

const API_BASE =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
  'https://wp.uratokyoromance.com/wp-json/wp/v2';

export default function BlogPostPage() {
  const params = useParams();
  const rawSlug = Array.isArray(params.slug) ? params.slug[0] : (params.slug ?? '');
  const slug = decodeURIComponent(rawSlug);

  const [post, setPost] = useState<WpPost | null | 'loading'>('loading');

  useEffect(() => {
    if (!slug) return;
    const url = `${API_BASE}/posts?slug=${encodeURIComponent(slug)}&_embed`;
    console.log('[blog/[slug]] fetching:', url);

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          console.error('[blog/[slug]] API error', res.status, url);
          setPost(null);
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (data === undefined) return;
        const posts = data as WpPost[];
        console.log('[blog/[slug]] posts found:', posts.length);
        setPost(posts[0] ?? null);
      })
      .catch((err) => {
        console.error('[blog/[slug]] fetch failed', err);
        setPost(null);
      });
  }, [slug]);

  /* ── Loading ── */
  if (post === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-stone text-sm">読み込み中...</p>
      </div>
    );
  }

  /* ── Not found ── */
  if (post === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-5">
        <p className="text-stone text-base">記事が見つかりませんでした</p>
        <Link href="/blog" className="text-gold text-xs tracking-widest hover:text-gold-light transition-colors">
          ← コラム一覧に戻る
        </Link>
      </div>
    );
  }

  const title = stripHtml(post.title.rendered);
  const date = formatWpDate(post.date);
  const image = getPostFeaturedImage(post);
  const categories = getPostCategories(post);
  const primaryCategory = categories[0];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-5 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            {primaryCategory && (
              <span className="bg-wine text-cream text-[10px] tracking-widest px-3 py-1">
                {primaryCategory.name}
              </span>
            )}
            <p className="text-mist text-xs">{date}</p>
          </div>

          <h1
            className="font-display text-3xl md:text-4xl text-cream mb-6 leading-snug tracking-wide"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />

          {image && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={image.src}
              alt={image.alt}
              className="w-full aspect-video object-cover"
            />
          )}
        </div>
      </section>

      {/* Article body */}
      <article className="section-py px-5 pb-24">
        <div className="max-w-3xl mx-auto">
          <p className="text-stone text-base leading-relaxed mb-10 p-6 border-l-2 border-gold bg-elevated">
            {stripHtml(post.excerpt.rendered)}
          </p>

          <div
            className="wp-content prose-luxury"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

          <div className="flex items-center flex-wrap gap-3 mt-10 pt-8 border-t border-border">
            <Tag size={13} className="text-stone flex-shrink-0" />
            {categories.map((cat) => (
              <span key={cat.id} className="tag-pill">{cat.name}</span>
            ))}
            <span className="tag-pill">東京 女性用風俗</span>
            <span className="tag-pill">女風</span>
          </div>

          <div className="mt-10 p-8 bg-surface border border-border text-center">
            <p className="text-stone text-sm mb-4">
              東京で女風セラピストを探してみませんか？本人確認済みセラピストを一覧で確認できます。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/therapists" className="btn-primary inline-flex">
                セラピストを探す
              </Link>
              <Link href="/first" className="btn-secondary inline-flex">
                初めての方へ
              </Link>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="text-gold text-xs tracking-widest hover:text-gold-light transition-colors"
            >
              ← コラム一覧に戻る
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
