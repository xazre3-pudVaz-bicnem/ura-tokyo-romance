import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';
import BlogCard from '@/components/ui/BlogCard';
import { blogPosts } from '@/data/blog-posts';

export default function BlogSection() {
  const recent = blogPosts.slice(0, 3);

  return (
    <section className="section-py px-5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
          <SectionTitle
            en="Column"
            ja="コラム"
            align="left"
            className="mb-0"
            description="東京の女性用風俗・女風に関する情報を発信しています。"
          />
          <Link href="/blog" className="text-gold text-xs tracking-widest hover:text-gold-light transition-colors mt-6 md:mt-0 flex items-center gap-2">
            コラムをすべて見る <span>→</span>
          </Link>
        </div>

        {/* Featured first post */}
        {recent[0] && (
          <div className="mb-5">
            <BlogCard post={recent[0]} featured />
          </div>
        )}

        {/* 2 column grid for rest */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {recent.slice(1).map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/blog" className="btn-secondary inline-flex">
            すべての記事を見る
          </Link>
        </div>
      </div>
    </section>
  );
}
