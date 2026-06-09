// ─── Site Contact Configuration ─────────────────────────────────────────────
// 連絡先・SNSのURL設定を一元管理。後から1箇所変更すれば全ページに反映される。

export const SITE_CONTACT = {
  // 公式LINE
  lineUrl: 'https://lin.ee/8rIIzPg',
  lineName: '裏東京ロマンス公式LINE',

  // 電話
  phoneNumber: '070-5656-0632',
  telHref: 'tel:07056560632',

  // メール
  email: 'info@uratokyoromance.com',
  mailtoHref: 'mailto:info@uratokyoromance.com',
  formRecipient: 'info@uratokyoromance.com',

  // 公式SNS
  instagramUrl: 'https://www.instagram.com/ura_tokyo_romance/',
  xUrl: 'https://x.com/ura_tokyo_romance',
} as const;
