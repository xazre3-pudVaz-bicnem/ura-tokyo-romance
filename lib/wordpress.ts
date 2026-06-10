const WP_API =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
  'https://wp.uratokyoromance.com/wp-json/wp/v2';

// ─── Fetch helper ─────────────────────────────────────────────────────────────

async function wpFetch<T>(
  endpoint: string,
  params: Record<string, string> = {},
  noStore = false,
): Promise<T | null> {
  try {
    const url = new URL(`${WP_API}${endpoint}`);
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

    console.log('Fetching:', url.toString());

    const res = await fetch(
      url.toString(),
      noStore ? { cache: 'no-store' } : { next: { revalidate: 300 } },
    );

    if (!res.ok) {
      console.error('WordPress API Error', res.status, res.statusText, url.toString());
      return null;
    }
    return res.json() as Promise<T>;
  } catch (error) {
    console.error('WordPress Fetch Failed', error);
    return null;
  }
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface WpCategory {
  id: number;
  name: string;
  slug: string;
}

export interface WpPost {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  categories: number[];
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }>;
    // [0] = categories, [1] = tags
    'wp:term'?: Array<WpCategory[]>;
  };
}

export interface WpTherapist extends WpPost {
  acf: {
    therapist_name?: string;
    age?: number;
    height?: number;
    tags?: string;
    areas?: string;
    intro?: string;
    recommended?: string;
    is_new?: boolean;
    show_in_ranking?: boolean;
    schedule_note?: string;
    photo?: { url: string; alt: string } | string;
    booking_cta?: string;
  };
}

export interface WpSchedule extends WpPost {
  acf: {
    therapist_name?: string;
    date?: string;
    status?: 'attending' | 'off';
    note?: string;
  };
}

export interface WpReview extends WpPost {
  acf: {
    therapist_name?: string;
    author_name?: string;
    rating?: number;
    review_content?: string;
  };
}

export interface WpEvent extends WpPost {
  acf: {
    event_date?: string;
    event_type?: string;
    discount?: string;
    detail?: string;
  };
}

// ─── Blog posts ───────────────────────────────────────────────────────────────

export async function getWpBlogPosts(perPage = 12, page = 1): Promise<WpPost[] | null> {
  return wpFetch<WpPost[]>('/posts', {
    per_page: String(perPage),
    page: String(page),
    _embed: '1',
  });
}

export async function getWpBlogPost(slug: string): Promise<WpPost | null> {
  const posts = await wpFetch<WpPost[]>('/posts', { slug, _embed: '1' }, true);
  return posts?.[0] ?? null;
}

// ─── Therapists (custom post type) ───────────────────────────────────────────

export async function getWpTherapists(perPage = 20): Promise<WpTherapist[] | null> {
  return wpFetch<WpTherapist[]>('/therapist', {
    per_page: String(perPage),
    _embed: '1',
  });
}

export async function getWpTherapist(slug: string): Promise<WpTherapist | null> {
  const items = await wpFetch<WpTherapist[]>('/therapist', { slug, _embed: '1' });
  return items?.[0] ?? null;
}

// ─── Schedules ────────────────────────────────────────────────────────────────

export async function getWpSchedules(perPage = 20): Promise<WpSchedule[] | null> {
  return wpFetch<WpSchedule[]>('/schedule', { per_page: String(perPage) });
}

// ─── Reviews ─────────────────────────────────────────────────────────────────

export async function getWpReviews(perPage = 20): Promise<WpReview[] | null> {
  return wpFetch<WpReview[]>('/review', { per_page: String(perPage) });
}

// ─── Events ──────────────────────────────────────────────────────────────────

export async function getWpEvents(perPage = 10): Promise<WpEvent[] | null> {
  return wpFetch<WpEvent[]>('/event', { per_page: String(perPage) });
}

// ─── Staff Blog ───────────────────────────────────────────────────────────────

export async function getWpStaffBlogs(perPage = 10): Promise<WpPost[] | null> {
  return wpFetch<WpPost[]>('/staff_blog', { per_page: String(perPage), _embed: '1' });
}

// ─── Recruit News ─────────────────────────────────────────────────────────────

export async function getWpRecruitNews(perPage = 10): Promise<WpPost[] | null> {
  return wpFetch<WpPost[]>('/recruit_news', { per_page: String(perPage) });
}

// ─── Utilities ───────────────────────────────────────────────────────────────

export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;/g, "'").trim();
}

export function formatWpDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getPostFeaturedImage(
  post: WpPost,
): { src: string; alt: string } | null {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  if (!media) return null;
  return { src: media.source_url, alt: media.alt_text || stripHtml(post.title.rendered) };
}

export function getPostCategories(post: WpPost): WpCategory[] {
  return post._embedded?.['wp:term']?.[0] ?? [];
}
