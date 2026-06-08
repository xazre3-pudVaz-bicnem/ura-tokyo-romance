import type { Metadata } from 'next';
import Link from 'next/link';
import { Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: '管理画面ログイン｜裏東京ロマンス',
  description: '裏東京ロマンス管理画面へのログインページ。',
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <>
      <section className="min-h-screen flex items-center justify-center px-5 bg-base">
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <Link href="/" className="font-display text-2xl tracking-[0.15em] text-cream hover:text-gold transition-colors">
              裏東京ロマンス
            </Link>
            <p className="text-mist text-xs tracking-wider mt-2">管理画面</p>
          </div>

          <div className="card-luxury p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 border border-gold/30 flex items-center justify-center">
                <Lock size={20} className="text-gold" strokeWidth={1.5} />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gold text-[10px] tracking-widest mb-2">メールアドレス</label>
                <input
                  type="email"
                  placeholder="admin@example.com"
                  className="w-full bg-elevated border border-border text-cream px-4 py-3 text-sm placeholder:text-mist outline-none focus:border-gold/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-gold text-[10px] tracking-widest mb-2">パスワード</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-elevated border border-border text-cream px-4 py-3 text-sm placeholder:text-mist outline-none focus:border-gold/50 transition-colors"
                />
              </div>
              <button className="btn-primary w-full flex items-center justify-center gap-2 py-4 mt-6">
                <Lock size={15} />
                ログイン
              </button>
            </div>
          </div>

          <p className="text-center text-mist text-[10px] mt-6">
            管理者以外のアクセスは禁止されています
          </p>
        </div>
      </section>
    </>
  );
}
