import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/data/blog-posts';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <article className={`card-luxury overflow-hidden ${featured ? 'md:flex' : ''}`}>
        {/* Thumbnail */}
        <div
          className={`relative overflow-hidden ${
            featured
              ? 'md:w-2/5 aspect-video md:aspect-auto'
              : 'aspect-video'
          }`}
        >
          {post.thumbnail ? (
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="img-placeholder w-full h-full min-h-[180px]">
              <span className="text-[10px] text-stone/40 tracking-widest uppercase">Column</span>
            </div>
          )}
          {/* Category */}
          <div className="absolute top-3 left-3 bg-wine text-cream text-[10px] tracking-widest px-2.5 py-1">
            {post.category}
          </div>
        </div>

        {/* Content */}
        <div className={`p-5 md:p-6 ${featured ? 'md:flex-1 md:flex md:flex-col md:justify-center' : ''}`}>
          <p className="text-mist text-[10px] tracking-wider mb-2">{post.date}</p>
          <h3 className="text-cream text-base md:text-lg font-sans leading-snug mb-3 group-hover:text-gold transition-colors duration-300">
            {post.title}
          </h3>
          <p className="text-stone text-xs md:text-sm leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-gold text-[10px] tracking-widest">続きを読む</span>
            <span className="text-gold text-xs transition-transform duration-300 group-hover:translate-x-1">→</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
