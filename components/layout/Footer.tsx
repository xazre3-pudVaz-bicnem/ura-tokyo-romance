import Link from 'next/link';
import { Instagram } from 'lucide-react';

const footerLinks = {
  user: [
    { href: '/first', label: '初めての方へ' },
    { href: '/therapists', label: 'セラピストを探す' },
    { href: '/area', label: 'エリアから探す' },
    { href: '/search', label: '条件から探す' },
    { href: '/schedule', label: '本日の出勤' },
    { href: '/ranking', label: '人気ランキング' },
    { href: '/newface', label: '新人セラピスト' },
    { href: '/price', label: '料金目安' },
    { href: '/reviews', label: '口コミ' },
    { href: '/simulation', label: '料金シミュレーション' },
  ],
  therapist: [
    { href: '/register', label: 'セラピスト登録' },
    { href: '/register/info', label: 'セラピスト向け説明' },
    { href: '/register/flow', label: '審査の流れ' },
    { href: '/register/pricing', label: '掲載料金・手数料' },
  ],
  info: [
    { href: '/safety', label: '安心安全への取り組み' },
    { href: '/faq', label: 'よくある質問' },
    { href: '/blog', label: 'コラム' },
    { href: '/staff-blog', label: 'スタッフブログ' },
    { href: '/news', label: 'お知らせ' },
    { href: '/contact', label: 'お問い合わせ' },
    { href: '/report', label: '通報・相談窓口' },
  ],
  legal: [
    { href: '/terms', label: '利用規約' },
    { href: '/privacy', label: 'プライバシーポリシー' },
    { href: '/prohibited', label: '禁止事項' },
    { href: '/admin-login', label: '管理画面' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-5 py-16">
        {/* Top */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-12">
          {/* Brand */}
          <div className="lg:w-72 flex-shrink-0">
            <Link href="/" className="font-display text-2xl tracking-[0.15em] text-cream block mb-3">
              裏東京ロマンス
            </Link>
            <p className="text-stone text-xs leading-relaxed mb-4">
              東京で女性用風俗・女風を利用したい女性と、<br />
              個人で活動したいセラピストをつなぐ<br />
              マッチングプラットフォーム。<br />
              2026年8月1日 GRAND OPEN
            </p>
            <p className="text-mist text-[10px] leading-relaxed mb-6">
              当プラットフォームは掲載・マッチング支援を行うものであり、
              各サービス内容はセラピストと利用者の合意に基づきます。
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/ura_tokyo_romance/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone hover:text-gold transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
            <div>
              <p className="text-gold text-[10px] tracking-widest mb-4 uppercase">利用者向け</p>
              <ul className="space-y-2.5">
                {footerLinks.user.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-stone hover:text-cream text-xs transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-gold text-[10px] tracking-widest mb-4 uppercase">セラピスト向け</p>
              <ul className="space-y-2.5">
                {footerLinks.therapist.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-stone hover:text-cream text-xs transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-gold text-[10px] tracking-widest mb-4 uppercase">サポート</p>
              <ul className="space-y-2.5">
                {footerLinks.info.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-stone hover:text-cream text-xs transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-gold text-[10px] tracking-widest mb-4 uppercase">規約・その他</p>
              <ul className="space-y-2.5">
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-stone hover:text-cream text-xs transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider mb-8" />

        {/* Legal notices */}
        <div className="mb-6 space-y-2">
          <p className="text-mist text-[11px] leading-relaxed">
            当サービスは18歳以上の方のみご利用いただけます。18歳未満の方のアクセス・利用は固く禁じます。
          </p>
          <p className="text-mist text-[11px] leading-relaxed">
            裏東京ロマンスは情報掲載・マッチング支援を行うプラットフォームです。直接サービスを提供する店舗ではありません。
            各セラピストのサービス内容は、セラピストと利用者の合意に基づくものであり、当プラットフォームは当事者間のサービス提供に関して責任を負いません。
          </p>
          <p className="text-mist text-[11px] leading-relaxed">
            ※本サービスは正式公開前に法務確認を行い、適法性を担保したうえで運営します。
          </p>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-4">
            <Link href="/terms" className="text-mist text-xs hover:text-stone transition-colors">利用規約</Link>
            <Link href="/privacy" className="text-mist text-xs hover:text-stone transition-colors">プライバシーポリシー</Link>
            <Link href="/prohibited" className="text-mist text-xs hover:text-stone transition-colors">禁止事項</Link>
          </div>
          <p className="text-mist text-xs">
            &copy; 2026 裏東京ロマンス. All rights reserved.
          </p>
        </div>
      </div>

      {/* Bottom spacer for mobile nav */}
      <div className="h-20 lg:h-0" />
    </footer>
  );
}
