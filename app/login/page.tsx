'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Heart } from 'lucide-react';

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center px-5 pt-20 pb-20">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="text-gold text-[10px] tracking-[0.3em] mb-2">Member Login</p>
          <h1 className="font-display text-3xl text-cream tracking-wide">ログイン</h1>
          <span className="block w-10 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4" />
        </div>

        <div className="card-luxury p-8">
          <div className="space-y-5">
            <div>
              <label className="block text-mist text-[10px] tracking-widest mb-2">メールアドレス</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-elevated border border-border text-cream px-4 py-3 text-sm outline-none focus:border-gold/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-mist text-[10px] tracking-widest mb-2">パスワード</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-elevated border border-border text-cream px-4 py-3 pr-12 text-sm outline-none focus:border-gold/50 transition-colors"
                />
                <button onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-mist hover:text-stone">
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
            <Link href="/mypage" className="btn-primary w-full py-3 flex items-center justify-center text-sm">
              ログイン
            </Link>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-mist text-[10px]">または</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <p className="text-center mt-4">
            <Link href="/signup" className="text-gold text-xs hover:underline">
              新規会員登録（無料）
            </Link>
          </p>

          <p className="text-mist text-[10px] text-center mt-4">
            <Link href="#" className="hover:text-stone transition-colors">パスワードを忘れた方</Link>
          </p>
        </div>

        <div className="mt-6 card-luxury p-5">
          <div className="flex items-center gap-2 mb-3">
            <Heart size={14} className="text-gold" strokeWidth={1.5} />
            <p className="text-gold text-[10px] tracking-widest">会員になると</p>
          </div>
          <ul className="space-y-1.5">
            {[
              'お気に入りリストを保存・管理できます',
              '閲覧履歴を保存できます',
              '相談・予約履歴を確認できます',
              '口コミを投稿できます',
              '出勤通知を受け取れます（8月以降）',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-stone text-xs">
                <span className="text-gold">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-mist text-[10px] text-center mt-6">
          18歳未満のご利用は禁止されています
        </p>
      </div>
    </div>
  );
}
