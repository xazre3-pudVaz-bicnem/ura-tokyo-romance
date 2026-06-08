export interface TherapistPlan {
  name: string;
  duration: number;
  price: number;
}

export interface Therapist {
  id: number;
  slug: string;
  name: string;
  age: number;
  height: number;
  tags: string[];
  areas: string[];
  intro: string;
  recommended: string;
  messageToUser?: string;
  image?: string;
  subImages?: string[];
  scheduleNote?: string;
  isNew: boolean;
  showInRanking: boolean;
  rankScore: number;
  verifiedId: boolean;
  consultAvailable: boolean;
  reviewCount: number;
  favoriteCount: number;
  plans: TherapistPlan[];
  instagram?: string;
  blogPosts?: { title: string; slug: string }[];
}

export const dummyTherapists: Therapist[] = [
  {
    id: 1,
    slug: 'sakura',
    name: '咲良（さくら）',
    age: 24,
    height: 158,
    tags: ['癒し系', '聞き上手', '初めての方におすすめ', '会話重視', '優しい雰囲気'],
    areas: ['渋谷', '新宿', '恵比寿', '目黒'],
    intro:
      '日常から離れた特別な時間を一緒に過ごしませんか。会話が大好きで、初めての方でもリラックスしていただけるよう丁寧に接します。どんなご要望も遠慮なくお申し付けください。東京各所に出向きます。',
    recommended:
      '「一緒にいるだけで心が軽くなる」というお声を多くいただいています。一人で抱えていることを話してみませんか。',
    messageToUser:
      '初めての方でも大歓迎です。まずは気軽にご相談ください。プロフィールを見てピンときた方は、ぜひお声がけを。',
    image: undefined,
    scheduleNote: '月・水・金・土 出勤',
    isNew: false,
    showInRanking: true,
    rankScore: 98,
    verifiedId: true,
    consultAvailable: true,
    reviewCount: 47,
    favoriteCount: 132,
    plans: [
      { name: '60分', duration: 60, price: 18000 },
      { name: '90分', duration: 90, price: 25000 },
      { name: '120分', duration: 120, price: 33000 },
      { name: '180分', duration: 180, price: 48000 },
    ],
    blogPosts: [
      { title: '女風を初めて利用した女性からよく聞かれること', slug: 'sakura-blog-1' },
    ],
  },
  {
    id: 2,
    slug: 'hana',
    name: '花音（かのん）',
    age: 26,
    height: 162,
    tags: ['落ち着いた雰囲気', '大人の余裕', '清潔感', '傾聴力高め', '紳士的'],
    areas: ['銀座', '六本木', '赤坂', '麻布十番'],
    intro:
      '落ち着いた空間でゆっくりと過ごしたい方へ。聴くことが得意で、ただただ話を聞いてほしい、そんなご要望にも真摯に向き合います。心理学を学んでいた経験から、気持ちに寄り添う会話が得意です。',
    recommended:
      '深い対話を求める方にぜひ。年齢を問わず、じっくりと会話を楽しみたい方に選んでいただいています。',
    messageToUser:
      '話しにくいことも、ここでなら話せる、そんな時間にしたいと思っています。どうぞ遠慮なく。',
    image: undefined,
    scheduleNote: '火・木・土・日 出勤',
    isNew: false,
    showInRanking: true,
    rankScore: 95,
    verifiedId: true,
    consultAvailable: true,
    reviewCount: 38,
    favoriteCount: 110,
    plans: [
      { name: '60分', duration: 60, price: 17000 },
      { name: '90分', duration: 90, price: 24000 },
      { name: '120分', duration: 120, price: 32000 },
      { name: '180分', duration: 180, price: 46000 },
    ],
  },
  {
    id: 3,
    slug: 'mizuki',
    name: '水希（みずき）',
    age: 22,
    height: 155,
    tags: ['癒し系', '優しい雰囲気', '初めての方におすすめ', '新人'],
    areas: ['池袋', '新宿', '渋谷', '原宿'],
    intro:
      'ゆるっとした雰囲気で、気づいたら笑顔になっている、そんな時間を提供します。初めての方も、男性が少し苦手な方も、まず気楽にお話しましょう。アニメや旅行の話も大好きです。',
    recommended:
      '「久しぶりに声を出して笑った」という感想をいただくことも多いです。一緒に楽しい時間を作りましょう。',
    messageToUser:
      '新人ですが一生懸命に対応します。初めての方も、緊張している方も、ゆっくり慣れていきましょう。',
    image: undefined,
    scheduleNote: '土・日・月 出勤（週3日）',
    isNew: true,
    showInRanking: true,
    rankScore: 82,
    verifiedId: true,
    consultAvailable: true,
    reviewCount: 12,
    favoriteCount: 56,
    plans: [
      { name: '60分', duration: 60, price: 15000 },
      { name: '90分', duration: 90, price: 22000 },
      { name: '120分', duration: 120, price: 29000 },
    ],
  },
  {
    id: 4,
    slug: 'reira',
    name: '麗羅（れいら）',
    age: 28,
    height: 165,
    tags: ['大人の余裕', '癒し系', '落ち着いた雰囲気', '外出デート対応', '高身長'],
    areas: ['銀座', '日本橋', '新橋', '六本木'],
    intro:
      '大人の女性の余裕と温かさで、非日常の特別な時間をお届けします。仕事や日常のストレスで疲れたとき、そっと傍に寄り添わせてください。外出デートのご要望にも対応しています。',
    recommended:
      '30代のお客様からのご相談が特に多いです。年齢を重ねた女性ならではの包容力をお伝えできます。',
    messageToUser:
      '無理のない範囲でゆっくりと過ごしましょう。何でも話してください。秘密は守ります。',
    image: undefined,
    scheduleNote: '月・水・金 出勤',
    isNew: false,
    showInRanking: true,
    rankScore: 91,
    verifiedId: true,
    consultAvailable: false,
    reviewCount: 29,
    favoriteCount: 88,
    plans: [
      { name: '60分', duration: 60, price: 20000 },
      { name: '90分', duration: 90, price: 28000 },
      { name: '120分', duration: 120, price: 36000 },
      { name: '180分', duration: 180, price: 52000 },
    ],
  },
  {
    id: 5,
    slug: 'yuina',
    name: '唯奈（ゆいな）',
    age: 23,
    height: 160,
    tags: ['癒し系', '会話重視', '初めての方におすすめ', '優しい雰囲気', '夜対応'],
    areas: ['渋谷', '代官山', '中目黒', '恵比寿'],
    intro:
      '明るい笑顔と元気なトークで、会っている間中ずっと楽しい時間を作ります。笑いたいとき、ただ誰かと一緒にいたいとき、ぜひお声がけください。夜遅い時間の対応も可能です。',
    recommended:
      '「久しぶりに声を出して笑った」という感想をいただくことも多いです。一緒に楽しい時間を作りましょう。',
    messageToUser:
      '笑顔でいることが好きです。一緒にいる間は、全力で楽しい時間にします。',
    image: undefined,
    scheduleNote: '水・木・土 出勤',
    isNew: true,
    showInRanking: false,
    rankScore: 75,
    verifiedId: true,
    consultAvailable: true,
    reviewCount: 8,
    favoriteCount: 34,
    plans: [
      { name: '60分', duration: 60, price: 15000 },
      { name: '90分', duration: 90, price: 21000 },
      { name: '120分', duration: 120, price: 28000 },
    ],
  },
  {
    id: 6,
    slug: 'kotone',
    name: '琴音（ことね）',
    age: 25,
    height: 157,
    tags: ['落ち着いた雰囲気', '聞き上手', '清潔感', '会話重視'],
    areas: ['新宿', '渋谷', '表参道', '青山'],
    intro:
      '静かで穏やかな時間を一緒に過ごしましょう。読書や映画の話から、日常のふとした悩みまで、ゆっくりと丁寧に向き合います。急かされることなく、自分のペースで過ごしたい方に。',
    recommended:
      '沈黙も心地よい、そんな時間を一緒に作りたいと思っています。焦らずゆっくり話しましょう。',
    messageToUser:
      'ゆっくり話しましょう。どんな話でも、否定せずに聞きます。',
    image: undefined,
    scheduleNote: '火・金・日 出勤',
    isNew: false,
    showInRanking: true,
    rankScore: 87,
    verifiedId: true,
    consultAvailable: true,
    reviewCount: 22,
    favoriteCount: 74,
    plans: [
      { name: '60分', duration: 60, price: 16000 },
      { name: '90分', duration: 90, price: 23000 },
      { name: '120分', duration: 120, price: 30000 },
      { name: '180分', duration: 180, price: 44000 },
    ],
  },
  {
    id: 7,
    slug: 'noa',
    name: 'のあ',
    age: 21,
    height: 161,
    tags: ['癒し系', '即日相談可', '新人', '初めての方におすすめ'],
    areas: ['池袋', '新宿', '高田馬場', '渋谷'],
    intro:
      '大学生をしながら週末を中心に活動しています。若いですがしっかりとしたコミュニケーションを心がけています。初めての方でも緊張しないように、丁寧に対応します。',
    recommended:
      '同世代の方や、年上の方も気軽に話しかけてください。初めての方向けのコースも相談できます。',
    messageToUser:
      '当日の急なご相談も歓迎です。お気軽にどうぞ。',
    image: undefined,
    scheduleNote: '土・日 出勤（週2日）',
    isNew: true,
    showInRanking: false,
    rankScore: 68,
    verifiedId: true,
    consultAvailable: true,
    reviewCount: 5,
    favoriteCount: 28,
    plans: [
      { name: '60分', duration: 60, price: 14000 },
      { name: '90分', duration: 90, price: 20000 },
    ],
  },
  {
    id: 8,
    slug: 'amane',
    name: '天音（あまね）',
    age: 29,
    height: 164,
    tags: ['大人の余裕', '外出デート対応', '落ち着いた雰囲気', '紳士的'],
    areas: ['表参道', '青山', '恵比寿', '銀座'],
    intro:
      '品のある大人の時間を提供します。食事や散歩など外出デートのご要望も得意です。会話はもちろん、ただ一緒に過ごすだけでも構いません。あなたのペースに合わせます。',
    recommended:
      '「大人同士の上質な時間」を求める方に選んでいただいています。シンプルで丁寧な対応が得意です。',
    messageToUser:
      '気張らなくていいです。ただここにいる、そんな時間でも。',
    image: undefined,
    scheduleNote: '水・木・土 出勤',
    isNew: false,
    showInRanking: true,
    rankScore: 89,
    verifiedId: true,
    consultAvailable: false,
    reviewCount: 33,
    favoriteCount: 95,
    plans: [
      { name: '60分', duration: 60, price: 19000 },
      { name: '90分', duration: 90, price: 27000 },
      { name: '120分', duration: 120, price: 35000 },
      { name: '180分', duration: 180, price: 50000 },
    ],
  },
];

export const newFaceTherapists = dummyTherapists.filter((t) => t.isNew);
export const rankingTherapists = [...dummyTherapists]
  .filter((t) => t.showInRanking)
  .sort((a, b) => b.rankScore - a.rankScore);
