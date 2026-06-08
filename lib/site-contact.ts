// ─── Site Contact Configuration ─────────────────────────────────────────────
// 連絡先・SNSのURL設定を一元管理。後から1箇所変更すれば全ページに反映される。

export const SITE_CONTACT = {
  // 公式LINE（未確定 → 正式公開前に変更）
  lineUrl: 'https://line.me/R/ti/p/@xxxxxxxxx',
  lineName: '裏東京ロマンス公式LINE',

  // 電話（未確定 → 正式公開前に変更）
  phoneNumber: '000-0000-0000',
  telHref: 'tel:00000000000',

  // メール
  email: 'info@ura-tokyo-romance.com',
  mailtoHref: 'mailto:info@ura-tokyo-romance.com',

  // 公式SNS（仮URL → 正式公開前に変更）
  instagramUrl: 'https://www.instagram.com/ura_tokyo_romance/',
  xUrl: 'https://x.com/ura_tokyo_romance',
} as const;
