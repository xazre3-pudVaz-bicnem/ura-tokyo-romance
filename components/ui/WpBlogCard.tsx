import Link from 'next/link';
import type { WpPost } from '@/lib/wordpress';
import { formatWpDate, stripHtml, getPostFeaturedImage, getPostCategories } from '@/lib/wordpress';

interface WpBlogCardProps {
  post: WpPost;
  featured?: boolean;
}

export default function WpBlogCard({ post, featured }: WpBlogCardProps) {
  const title = stripHtml(post.title.rendered);
  const excerpt = stripHtml(post.excerpt.rendered);
  const date = formatWpDate(post.date);
  const image = getPostFeaturedImage(post);
  const categories = getPostCategories(post);
  const primaryCategory = categories[0];

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <article className={`card-luxury overflow-hidden ${featured ? 'md:flex' : ''}`}>
        {/* Thumbnail */}
        <div
          className={`relative overflow-hidden bg-elevated ${
            featured ? 'md:w-2/5 aspect-video md:aspect-auto' : 'aspect-video'
          }`}
        >
          {image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="img-placeholder w-full h-full min-h-[180px]">
              <span className="text-[10px] text-stone/40 tracking-widest uppercase">Column</span>
            </div>
          )}
          {primaryCategory && (
            <div className="absolute top-3 left-3 bg-wine text-cream text-[10px] tracking-widest px-2.5 py-1">
              {primaryCategory.name}
            </div>
          )}
        </div>

        {/* Content */}
        <div className={`p-5 md:p-6 ${featured ? 'md:flex-1 md:flex md:flex-col md:justify-center' : ''}`}>
          <p className="text-mist text-[10px] tracking-wider mb-2">{date}</p>
          <h3 className="text-cream text-base md:text-lg font-sans leading-snug mb-3 group-hover:text-gold transition-colors duration-300 line-clamp-2">
            {title}
          </h3>
          <p className="text-stone text-xs md:text-sm leading-relaxed line-clamp-3">{excerpt}</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-gold text-[10px] tracking-widest">続きを読む</span>
            <span className="text-gold text-xs transition-transform duration-300 group-hover:translate-x-1">→</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
