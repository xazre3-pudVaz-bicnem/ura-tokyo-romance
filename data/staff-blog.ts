export type BlogStatus = 'draft' | 'pending_review' | 'published' | 'rejected' | 'private';

export interface BlogPost {
  id: string;
  therapistSlug: string;
  therapistName: string;
  therapistImage?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  category: string;
  tags: string[];
  areas: string[];
  status: BlogStatus;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
}

export const BLOG_STATUS_LABELS: Record<BlogStatus, string> = {
  draft: '下書き',
  pending_review: '運営確認待ち',
  published: '公開中',
  rejected: '差し戻し',
  private: '非公開',
};

export const BLOG_CATEGORIES = [
  'お知らせ',
  '出勤情報',
  '日常・プライベート',
  '初めての方へ',
  'おすすめの過ごし方',
  'エリア情報',
  '体験談・感想',
];

export const BLOG_TAGS = [
  '初めて', '女風', '渋谷', '新宿', '池袋', '銀座', '六本木',
  '上野', '品川', '恵比寿', '中目黒', '吉祥寺',
  '癒し', 'リラックス', '会話', '外出デート', '即日', '今日会える',
];

export const dummyBlogPosts: BlogPost[] = [
  {
    id: 'blog-001',
    therapistSlug: 'ren',
    therapistName: '蓮',
    therapistImage: '/images/t01.png',
    title: 'グランドオープンに向けて',
    slug: 'grand-open',
    excerpt: '2026年8月1日のグランドオープンに向けて、プロフィールを準備中です。プラットフォームを通じて、より多くの方の心が少し楽になるお手伝いができれば嬉しいです。',
    content: `2026年8月1日のグランドオープンに向けて、日々準備を進めています。

裏東京ロマンスというプラットフォームで活動を始めることを決めたのは、日常の中で「ただ話したい」「傍にいてほしい」という女性の声をもっと受け止めたかったからです。

恋愛でも友達でもなく、純粋に心地よい時間を一緒に過ごせる存在として、皆さんのお役に立てればと思っています。

グランドオープン後は渋谷・新宿エリアを中心に活動する予定です。プロフィールもぜひご覧ください。`,
    image: '/images/t01.png',
    category: 'お知らせ',
    tags: ['初めて', '女風', '渋谷', '新宿'],
    areas: ['渋谷', '新宿'],
    status: 'published',
    seoTitle: 'グランドオープンに向けて｜蓮のブログ',
    seoDescription: '裏東京ロマンスでグランドオープンに向けて準備中の蓮のブログ。渋谷・新宿エリアで活動します。',
    keywords: ['女風 渋谷', '女風 新宿', '女風 セラピスト'],
    publishedAt: '2026-06-01T10:00:00',
    createdAt: '2026-06-01T09:00:00',
    updatedAt: '2026-06-01T10:00:00',
    viewCount: 124,
  },
  {
    id: 'blog-002',
    therapistSlug: 'ao',
    therapistName: '蒼',
    therapistImage: '/images/t05.png',
    title: '初めての方へ伝えたいこと',
    slug: 'for-first-timers',
    excerpt: '初めてのご利用で不安な方も多いかと思います。事前の相談フォームで気になることを何でも聞いてください。あなたのペースで、心地よい時間をご一緒しましょう。',
    content: `初めて女風を利用しようと思っている方へ、少しだけ伝えさせてください。

不安なのは、当然です。

どんな人が来るんだろう、何を話せばいいんだろう、そういう気持ちは誰でも持っています。でも、それを言ってもらえれば、一緒に解消していけます。

私がいつも心がけているのは「相手のペース」に合わせること。

話したいなら話す。静かに過ごしたいなら、ただそこにいる。それだけで十分です。

事前の相談フォームから、どんな些細なことでも聞いてください。`,
    image: '/images/t05.png',
    category: '初めての方へ',
    tags: ['初めて', '女風', '癒し'],
    areas: ['渋谷', '代官山', '恵比寿'],
    status: 'published',
    seoTitle: '初めての女風、何を話せばいい？｜蒼のブログ',
    seoDescription: '初めての女風利用で不安な方へ。セラピスト・蒼が事前相談から当日の流れまで丁寧に解説します。',
    keywords: ['女風 初めて', '女風 不安', '女風 流れ'],
    publishedAt: '2026-06-03T12:00:00',
    createdAt: '2026-06-03T11:00:00',
    updatedAt: '2026-06-03T12:00:00',
    viewCount: 89,
  },
  {
    id: 'blog-003',
    therapistSlug: 'reo',
    therapistName: '玲央',
    therapistImage: '/images/t04.png',
    title: '渋谷・恵比寿エリアで活動しています',
    slug: 'shibuya-ebisu-area',
    excerpt: '渋谷・恵比寿・中目黒エリアを中心に活動しています。待ち合わせスポットや雰囲気についても書いていますので、参考にしてみてください。',
    content: `渋谷・恵比寿・中目黒エリアを主な活動エリアとして登録しています。

どのエリアも、ちょっと落ち着いて話せる場所を知っているので、待ち合わせ後のルートも含めて相談してもらえると助かります。

恵比寿ガーデンプレイス周辺は特にゆっくりできる場所が多く、会話を楽しみながら歩くのにちょうど良い雰囲気です。

外出デートにも対応していますので、「どこかに一緒に行きたい」という方もお気軽にご相談ください。`,
    image: '/images/t04.png',
    category: 'エリア情報',
    tags: ['渋谷', '恵比寿', '中目黒', '外出デート'],
    areas: ['渋谷', '恵比寿', '中目黒'],
    status: 'published',
    seoTitle: '渋谷・恵比寿で女風｜玲央のブログ',
    seoDescription: '渋谷・恵比寿・中目黒エリア対応のセラピスト・玲央。エリア情報や待ち合わせスポットをご紹介。',
    keywords: ['女風 渋谷', '女風 恵比寿', '女風 外出デート'],
    publishedAt: '2026-06-05T09:00:00',
    createdAt: '2026-06-05T08:00:00',
    updatedAt: '2026-06-05T09:00:00',
    viewCount: 67,
  },
  {
    id: 'blog-004',
    therapistSlug: 'ritsu',
    therapistName: '律',
    therapistImage: '/images/t06.png',
    title: '今週の出勤スケジュール',
    slug: 'schedule-0608',
    excerpt: '今週の出勤情報をお知らせします。今週は月・水・金の13時〜21時で対応可能です。',
    content: `今週の出勤情報をお知らせします。

■今週のスケジュール
月曜日：13:00〜21:00（渋谷・新宿エリア）
水曜日：14:00〜20:00（渋谷・恵比寿エリア）
金曜日：13:00〜22:00（全エリア対応）

初めての方も大歓迎です。まずはお気軽にご相談フォームからご連絡ください。

出勤情報は変更になる場合があります。最新情報はプロフィールページの出勤カレンダーをご確認ください。`,
    image: '/images/t06.png',
    category: '出勤情報',
    tags: ['今日会える', '即日', '渋谷', '新宿'],
    areas: ['渋谷', '新宿', '恵比寿'],
    status: 'pending_review',
    createdAt: '2026-06-07T19:00:00',
    updatedAt: '2026-06-07T19:00:00',
    viewCount: 0,
  },
  {
    id: 'blog-005',
    therapistSlug: 'yuma',
    therapistName: '悠真',
    therapistImage: '/images/t02.png',
    title: '六本木・銀座エリアで活動を始めます',
    slug: 'roppongi-ginza-start',
    excerpt: 'グランドオープンに合わせて六本木・銀座エリアでの活動を開始します。大人の空気感が好きな方とゆっくり過ごしたいと思っています。',
    content: `グランドオープンに合わせて、六本木・銀座エリアでの活動を開始します。

どちらのエリアも、ゆっくり話せる場所が多く、個人的にも好きな街です。

普段はあまり多くを語らないタイプですが、一対一でじっくり話すと、思った以上にいろんなことを話してしまいます。そういう時間が、私は好きです。

初回の方は、まず相談フォームからどうぞ。急かすことはしません。`,
    image: '/images/t02.png',
    category: 'お知らせ',
    tags: ['六本木', '銀座', 'リラックス'],
    areas: ['六本木', '銀座', '麻布十番'],
    status: 'draft',
    createdAt: '2026-06-06T20:00:00',
    updatedAt: '2026-06-06T20:30:00',
    viewCount: 0,
  },
];
