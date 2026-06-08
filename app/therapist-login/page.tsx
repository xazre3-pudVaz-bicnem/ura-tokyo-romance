import type { Metadata } from 'next';
import Link from 'next/link';
import { Lock, UserPlus } from 'lucide-react';

export const metadata: Metadata = {
  title: 'セラピストログイン｜裏東京ロマンス',
  description: '裏東京ロマンス セラピスト管理画面へのログインページ。',
  robots: { index: false, follow: false },
};

export default function TherapistLoginPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-5 flex items-start justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 border border-gold flex items-center justify-center mx-auto mb-4">
            <Lock size={18} className="text-gold" strokeWidth={1.5} />
          </div>
          <p className="text-gold text-[10px] tracking-[0.3em] mb-2">Therapist Login</p>
          <h1 className="font-display text-3xl text-cream">セラピストログイン</h1>
        </div>

        {/* Pre-launch notice */}
        <div className="bg-wine/10 border border-wine/30 p-5 mb-6 text-center">
          <p className="text-wine text-xs leading-relaxed">
            セラピスト管理画面は<strong>2026年8月1日グランドオープン</strong>後に提供開始します。<br />
            現在は先行登録を受け付けています。
          </p>
        </div>

        <div className="card-luxury p-8">
          <div className="space-y-4">
            <div>
              <label className="block text-gold text-[10px] tracking-widest mb-2">メールアドレス</label>
              <input
                type="email"
                disabled
                placeholder="example@email.com"
                className="w-full bg-elevated border border-border text-mist px-4 py-3 text-sm placeholder:text-mist/50 outline-none cursor-not-allowed opacity-60"
              />
            </div>
            <div>
              <label className="block text-gold text-[10px] tracking-widest mb-2">パスワード</label>
              <input
                type="password"
                disabled
                placeholder="••••••••"
                className="w-full bg-elevated border border-border text-mist px-4 py-3 text-sm placeholder:text-mist/50 outline-none cursor-not-allowed opacity-60"
              />
            </div>
            <button
              disabled
              className="btn-primary w-full py-4 opacity-50 cursor-not-allowed"
            >
              ログイン（準備中）
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-mist text-xs">
              グランドオープン後にご利用いただけます
            </p>
          </div>
        </div>

        <div className="mt-6 text-center space-y-3">
          <div className="card-luxury p-5">
            <p className="text-stone text-xs mb-3">まだ登録していない方はこちら</p>
            <Link href="/register" className="btn-secondary w-full text-center flex items-center justify-center gap-2 py-3">
              <UserPlus size={14} />
              セラピスト先行登録（無料）
            </Link>
          </div>
          <Link href="/" className="text-mist text-xs hover:text-cream transition-colors block">
            トップページに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
