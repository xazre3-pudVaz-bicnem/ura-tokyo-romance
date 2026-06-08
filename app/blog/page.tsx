import type { Metadata } from 'next';
import SectionTitle from '@/components/ui/SectionTitle';
import BlogCard from '@/components/ui/BlogCard';
import { blogPosts, blogCategories } from '@/data/blog-posts';

export const metadata: Metadata = {
  title: 'コラム｜東京 女風マッチング 裏東京ロマンス',
  description:
    '東京の女性用風俗・女風に関するコラム。初めての女風利用ガイド・セラピストの探し方・料金の仕組み・女風マッチングの使い方など10本以上の記事を掲載。',
  alternates: { canonical: 'https://ura-tokyo-romance.com/blog' },
};

export default function BlogPage() {
  return (
    <>
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

      <section className="section-py px-5">
        <div className="max-w-6xl mx-auto">
          {/* Category filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            <button className="px-4 py-2 text-[10px] tracking-widest border border-gold text-gold">すべて</button>
            {blogCategories.map((cat) => (
              <button key={cat} className="px-4 py-2 text-[10px] tracking-widest border border-border text-stone hover:border-stone transition-colors">
                {cat}
              </button>
            ))}
          </div>

          {/* Featured */}
          {blogPosts[0] && (
            <div className="mb-8">
              <BlogCard post={blogPosts[0]} featured />
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogPosts.slice(1).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
