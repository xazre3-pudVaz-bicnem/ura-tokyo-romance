'use client';

import { useState } from 'react';
import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ type: 'general', name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className="pt-32 pb-20 px-5 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold text-[10px] tracking-[0.3em] mb-4">Contact</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-5 tracking-wide">お問い合わせ</h1>
          <span className="block w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-stone leading-relaxed">
            ご不明な点・ご意見・通報などはこちらのフォームからご連絡ください。
            セラピストへの予約相談はセラピストプロフィールの予約相談フォームをご利用ください。
          </p>
        </div>
      </section>

      <section className="section-py px-5">
        <div className="max-w-2xl mx-auto">
          {/* Quick links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <Link href="/faq" className="p-5 border border-border bg-elevated hover:border-gold transition-colors text-center">
              <p className="text-gold text-[10px] tracking-widest mb-2">FAQ</p>
              <p className="text-cream text-xs">よくある質問</p>
            </Link>
            <Link href="/report" className="p-5 border border-border bg-elevated hover:border-gold transition-colors text-center">
              <p className="text-gold text-[10px] tracking-widest mb-2">Report</p>
              <p className="text-cream text-xs">通報・報告窓口</p>
            </Link>
            <Link href="/safety" className="p-5 border border-border bg-elevated hover:border-gold transition-colors text-center">
              <p className="text-gold text-[10px] tracking-widest mb-2">Safety</p>
              <p className="text-cream text-xs">安心安全について</p>
            </Link>
          </div>

          {/* Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="card-luxury p-8 md:p-10 space-y-6">
              <SectionTitle en="Form" ja="お問い合わせフォーム" align="left" className="mb-0" />

              {/* Type */}
              <div>
                <label className="text-gold text-[10px] tracking-widest block mb-3">お問い合わせ種別</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'general', label: '一般的なお問い合わせ' },
                    { id: 'register', label: 'セラピスト登録について' },
                    { id: 'first', label: '初めての利用相談' },
                    { id: 'other', label: 'その他' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setForm({ ...form, type: t.id })}
                      className={`py-3 px-4 text-xs border text-left transition-all ${
                        form.type === t.id ? 'border-gold text-gold bg-elevated' : 'border-border text-stone'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="text-gold text-[10px] tracking-widest block mb-2">お名前（ニックネーム可）</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-elevated border border-border text-cream text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                  placeholder="例：Mさん"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-gold text-[10px] tracking-widest block mb-2">メールアドレス</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-elevated border border-border text-cream text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                  placeholder="example@email.com"
                />
              </div>

              {/* Message */}
              <div>
                <label className="text-gold text-[10px] tracking-widest block mb-2">お問い合わせ内容</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-elevated border border-border text-cream text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors resize-none"
                  placeholder="ご質問・ご要望をご記入ください"
                />
              </div>

              <p className="text-mist text-xs">
                ご入力いただいた情報は、お問い合わせへの返答にのみ使用します。第三者に提供することは一切ありません。
              </p>

              <button type="submit" className="btn-primary w-full py-4">
                送信する
              </button>
            </form>
          ) : (
            <div className="card-luxury p-12 text-center">
              <p className="text-gold text-2xl font-display mb-4">ありがとうございます</p>
              <p className="text-stone text-sm leading-relaxed">
                お問い合わせを受け付けました。<br />
                内容を確認次第、メールにてご返信いたします。<br />
                通常2〜3営業日以内にご返信します。
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
