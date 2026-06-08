const WP_API = process.env.WP_API_URL || 'https://cms.ura-tokyo-romance.com/wp-json/wp/v2';

// Generic fetch helper with error handling
async function wpFetch<T>(endpoint: string, params: Record<string, string> = {}): Promise<T | null> {
  try {
    const url = new URL(`${WP_API}${endpoint}`);
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

    const res = await fetch(url.toString(), {
      next: { revalidate: 300 }, // 5 minute cache
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch {
    return null;
  }
}

// ---- Types ----

export interface WpPost {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  categories: number[];
  acf?: Record<string, unknown>;
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }>;
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

// ---- Blog posts ----

export async function getWpBlogPosts(perPage = 10, page = 1): Promise<WpPost[] | null> {
  return wpFetch<WpPost[]>('/posts', {
    per_page: String(perPage),
    page: String(page),
    _embed: '1',
  });
}

export async function getWpBlogPost(slug: string): Promise<WpPost | null> {
  const posts = await wpFetch<WpPost[]>('/posts', { slug, _embed: '1' });
  return posts?.[0] ?? null;
}

// ---- Therapists (custom post type) ----

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

// ---- Schedules ----

export async function getWpSchedules(perPage = 20): Promise<WpSchedule[] | null> {
  return wpFetch<WpSchedule[]>('/schedule', { per_page: String(perPage) });
}

// ---- Reviews ----

export async function getWpReviews(perPage = 20): Promise<WpReview[] | null> {
  return wpFetch<WpReview[]>('/review', { per_page: String(perPage) });
}

// ---- Events ----

export async function getWpEvents(perPage = 10): Promise<WpEvent[] | null> {
  return wpFetch<WpEvent[]>('/event', { per_page: String(perPage) });
}

// ---- Staff Blog ----

export async function getWpStaffBlogs(perPage = 10): Promise<WpPost[] | null> {
  return wpFetch<WpPost[]>('/staff_blog', { per_page: String(perPage), _embed: '1' });
}

// ---- Recruit News ----

export async function getWpRecruitNews(perPage = 10): Promise<WpPost[] | null> {
  return wpFetch<WpPost[]>('/recruit_news', { per_page: String(perPage) });
}

// ---- Utility: strip HTML tags from WP rendered content ----

export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').trim();
}

// ---- Format WP date ----

export function formatWpDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
