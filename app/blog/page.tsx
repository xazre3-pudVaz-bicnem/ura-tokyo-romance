'use client';

import { useEffect, useState } from 'react';
import type { WpPost, WpCategory } from '@/lib/wordpress';
import { getPostCategories } from '@/lib/wordpress';
import WpBlogCard from '@/components/ui/WpBlogCard';

const API_BASE =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
  'https://wp.uratokyoromance.com/wp-json/wp/v2';

export default function BlogPage() {
  const [posts, setPosts] = useState<WpPost[] | null | 'loading'>('loading');

  useEffect(() => {
    const url = `${API_BASE}/posts?_embed&per_page=12`;
    console.log('Fetching blog posts:', url);

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          console.error('WordPress API Error', res.status, res.statusText, url);
          setPosts(null);
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (data !== undefined) setPosts(data as WpPost[]);
      })
      .catch((error) => {
        console.error('WordPress Fetch Failed', error);
        setPosts(null);
      });
  }, []);

  // Extract unique categories
  const categoryMap = new Map<number, WpCategory>();
  if (Array.isArray(posts)) {
    posts.forEach((post) => {
      getPostCategories(post).forEach((cat) => {
        if (!categoryMap.has(cat.id)) categoryMap.set(cat.id, cat);
      });
    });
  }
  const uniqueCategories = Array.from(categoryMap.values());

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-5 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold text-[10px] tracking-[0.3em] mb-4">Column</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-5 tracking-wide">コラム</h1>
          <span className="block w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-stone leading-relaxed">
            東京の女性用風俗・女風に関する情報や、女性のための癒しコンテンツをお届けします。
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="section-py px-5">
        <div className="max-w-6xl mx-auto">
          {posts === 'loading' ? (
            <div className="text-center py-20">
              <p className="text-stone text-base">読み込み中...</p>
            </div>
          ) : posts === null ? (
            <div className="text-center py-20">
              <p className="text-stone text-base mb-2">記事を取得できませんでした</p>
              <p className="text-mist text-sm">しばらく経ってから再度お試しください。</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-stone text-base">記事がありません</p>
              <p className="text-mist text-sm mt-2">近日中に記事を公開予定です。</p>
            </div>
          ) : (
            <>
              {/* Category filter */}
              {uniqueCategories.length > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
                  <span className="px-4 py-2 text-[10px] tracking-widest border border-gold text-gold">
                    すべて
                  </span>
                  {uniqueCategories.map((cat) => (
                    <span
                      key={cat.id}
                      className="px-4 py-2 text-[10px] tracking-widest border border-border text-stone hover:border-stone transition-colors cursor-default"
                    >
                      {cat.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Featured — first post */}
              <div className="mb-8">
                <WpBlogCard post={posts[0]} featured />
              </div>

              {/* Grid — remaining posts */}
              {posts.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {posts.slice(1).map((post) => (
                    <WpBlogCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
