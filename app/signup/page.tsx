'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';

export default function SignupPage() {
  const [showPass, setShowPass] = useState(false);
  const [step, setStep] = useState(1);
  const [ageChecked, setAgeChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);

  if (step === 2) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5 pt-20 pb-20">
        <div className="w-full max-w-sm text-center">
          <div className="w-16 h-16 bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} className="text-gold" strokeWidth={1} />
          </div>
          <p className="text-gold text-[10px] tracking-[0.3em] mb-2">Registration Complete</p>
          <h1 className="font-display text-3xl text-cream tracking-wide mb-4">登録完了</h1>
          <p className="text-stone text-sm leading-relaxed mb-8">
            ご登録いただきありがとうございます。<br />
            確認メールをお送りしましたので、メール内のリンクからアカウントを有効化してください。
          </p>
          <Link href="/mypage" className="btn-primary w-full py-3 flex items-center justify-center text-sm">
            マイページへ
          </Link>
          <p className="text-mist text-[10px] mt-6">
            メールが届かない場合はスパムフォルダをご確認ください
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-5 pt-20 pb-20">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="text-gold text-[10px] tracking-[0.3em] mb-2">New Member</p>
          <h1 className="font-display text-3xl text-cream tracking-wide">新規会員登録</h1>
          <span className="block w-10 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4" />
        </div>

        <div className="card-luxury p-8">
          <div className="space-y-5">
            <div>
              <label className="block text-mist text-[10px] tracking-widest mb-2">ニックネーム</label>
              <input
                type="text"
                placeholder="例：さくら"
                className="w-full bg-elevated border border-border text-cream px-4 py-3 text-sm outline-none focus:border-gold/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-mist text-[10px] tracking-widest mb-2">メールアドレス</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-elevated border border-border text-cream px-4 py-3 text-sm outline-none focus:border-gold/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-mist text-[10px] tracking-widest mb-2">パスワード</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="8文字以上"
                  className="w-full bg-elevated border border-border text-cream px-4 py-3 pr-12 text-sm outline-none focus:border-gold/50 transition-colors"
                />
                <button onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-mist hover:text-stone">
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <button
                  onClick={() => setAgeChecked(!ageChecked)}
                  className={`w-4 h-4 border flex-shrink-0 mt-0.5 transition-colors ${ageChecked ? 'border-gold bg-gold/20' : 'border-border'} flex items-center justify-center`}
                >
                  {ageChecked && <span className="text-gold text-[10px]">✓</span>}
                </button>
                <span className="text-stone text-xs">私は18歳以上であることを確認しました</span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <button
                  onClick={() => setTermsChecked(!termsChecked)}
                  className={`w-4 h-4 border flex-shrink-0 mt-0.5 transition-colors ${termsChecked ? 'border-gold bg-gold/20' : 'border-border'} flex items-center justify-center`}
                >
                  {termsChecked && <span className="text-gold text-[10px]">✓</span>}
                </button>
                <span className="text-stone text-xs">
                  <Link href="/terms" className="text-gold hover:underline">利用規約</Link>・
                  <Link href="/privacy" className="text-gold hover:underline">プライバシーポリシー</Link>
                  に同意する
                </span>
              </label>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!ageChecked || !termsChecked}
              className="btn-primary w-full py-3 flex items-center justify-center text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              無料登録する
            </button>
          </div>

          <p className="text-center mt-5">
            <Link href="/login" className="text-mist text-xs hover:text-stone transition-colors">
              すでに会員の方はこちら
            </Link>
          </p>
        </div>

        <p className="text-mist text-[10px] text-center mt-6">
          18歳未満のご利用は固く禁じております
        </p>
      </div>
    </div>
  );
}
