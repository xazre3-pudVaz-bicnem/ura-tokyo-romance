export interface Review {
  id: number;
  therapistName: string;
  author: string;
  rating: number;
  content: string;
  date: string;
}

export const dummyReviews: Review[] = [
  {
    id: 1,
    therapistName: '咲良',
    author: 'M.K.',
    rating: 5,
    content:
      '初めての利用でかなり緊張していましたが、丁寧な対応で最初から安心できました。話を聞いてもらえるだけで、こんなに気持ちが軽くなるのかと驚きました。また利用したいと思います。',
    date: '2026年8月',
  },
  {
    id: 2,
    therapistName: '花音',
    author: 'T.A.',
    rating: 5,
    content:
      '日頃のストレスや悩みを話せる場所がなくて相談しましたが、本当に良い時間でした。否定せず、ただ真剣に聞いてくれる姿勢に救われました。清潔感があって安心して過ごせました。',
    date: '2026年8月',
  },
  {
    id: 3,
    therapistName: '麗羅',
    author: 'Y.S.',
    rating: 5,
    content:
      '同世代の女友達とは話しにくいことも、自然と話せました。包み込まれるような温かさがあって、帰り道がなんだか軽かったです。次回も麗羅さんにお願いしたいと思います。',
    date: '2026年8月',
  },
  {
    id: 4,
    therapistName: '水希',
    author: 'R.N.',
    rating: 5,
    content:
      '初めてで不安でしたが、予約相談フォームを送ったその日のうちに丁寧な返信をいただけました。水希さんの自然な笑顔と明るいトークに、いつの間にか元気になっていました。おすすめです。',
    date: '2026年8月',
  },
  {
    id: 5,
    therapistName: '咲良',
    author: 'C.O.',
    rating: 5,
    content:
      '予約から当日まで、不安なく利用できました。会話の引き出しが多くて飽きることなく楽しく過ごせました。料金も事前に明示されていたので安心でした。',
    date: '2026年8月',
  },
  {
    id: 6,
    therapistName: '琴音',
    author: 'K.M.',
    rating: 5,
    content:
      '急かされることなく、自分のペースで過ごせたのが一番良かったです。同性スタッフのサポートも心強かったです。非日常感を上品に味わえました。',
    date: '2026年8月',
  },
];
