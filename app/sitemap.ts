import type { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blog-posts';
import { dummyTherapists } from '@/data/dummy-therapists';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ura-tokyo-romance.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: siteUrl, priority: 1.0, changeFrequency: 'daily' as const },
    { url: `${siteUrl}/first`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${siteUrl}/service`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${siteUrl}/price`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${siteUrl}/simulation`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${siteUrl}/therapists`, priority: 0.9, changeFrequency: 'daily' as const },
    { url: `${siteUrl}/newface`, priority: 0.8, changeFrequency: 'daily' as const },
    { url: `${siteUrl}/ranking`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${siteUrl}/schedule`, priority: 0.9, changeFrequency: 'daily' as const },
    { url: `${siteUrl}/reviews`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${siteUrl}/events`, priority: 0.7, changeFrequency: 'weekly' as const },
    { url: `${siteUrl}/blog`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${siteUrl}/staff-blog`, priority: 0.7, changeFrequency: 'weekly' as const },
    { url: `${siteUrl}/access`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${siteUrl}/recruit`, priority: 0.7, changeFrequency: 'weekly' as const },
    { url: `${siteUrl}/faq`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${siteUrl}/contact`, priority: 0.6, changeFrequency: 'monthly' as const },
    { url: `${siteUrl}/privacy`, priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  const blogPages = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
    lastModified: new Date(),
  }));

  const therapistPages = dummyTherapists.map((t) => ({
    url: `${siteUrl}/therapists/${t.slug}`,
    priority: 0.7,
    changeFrequency: 'weekly' as const,
  }));

  return [
    ...staticPages.map((p) => ({ ...p, lastModified: new Date() })),
    ...blogPages,
    ...therapistPages,
  ];
}
