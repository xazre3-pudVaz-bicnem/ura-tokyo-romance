'use client';

import { useState } from 'react';
import { Send, Check } from 'lucide-react';

const inquiryTypes = [
  '初めての利用について',
  'セラピスト登録について',
  '料金・システムについて',
  '安全性・プライバシーについて',
  'トラブル・困りごと',
  'その他',
];

type Step = 'form' | 'confirm' | 'done';

interface FormData {
  type: string;
  content: string;
  email: string;
  age: string;
  agreedTerms: boolean;
}

export default function ConsultForm({ therapistName }: { therapistName?: string }) {
  const [step, setStep] = useState<Step>('form');
  const [data, setData] = useState<FormData>({
    type: therapistName ? 'セラピストへの予約相談' : '',
    content: '',
    email: '',
    age: '',
    agreedTerms: false,
  });

  const canSubmit =
    data.type.trim() !== '' &&
    data.content.trim().length >= 10 &&
    data.email.trim() !== '' &&
    data.age !== '' &&
    data.agreedTerms;

  if (step === 'done') {
    return (
      <div className="card-luxury p-10 text-center">
        <div className="w-12 h-12 border border-gold flex items-center justify-center mx-auto mb-5">
          <Check size={20} className="text-gold" strokeWidth={1.5} />
        </div>
        <h2 className="font-display text-2xl text-cream mb-3">相談フォームを送信しました</h2>
        <p className="text-stone text-sm leading-relaxed mb-2">
          通常2営業日以内にご入力いただいたメールアドレスにご連絡します。
        </p>
        <p className="text-mist text-xs">
          ※迷惑メールフォルダをご確認ください。
        </p>
      </div>
    );
  }

  if (step === 'confirm') {
    return (
      <div className="card-luxury p-8">
        <p className="text-gold text-[10px] tracking-widest mb-6">入力内容の確認</p>
        <div className="space-y-4 mb-8">
          {[
            { label: '相談種別', value: data.type },
            { label: 'メールアドレス', value: data.email },
            { label: '年齢', value: `${data.age}歳` },
            { label: '相談内容', value: data.content },
          ].map(({ label, value }) => (
            <div key={label} className="border-b border-border/50 pb-4">
              <p className="text-mist text-[10px] tracking-widest mb-1">{label}</p>
              <p className="text-cream text-sm whitespace-pre-wrap">{value}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setStep('form')}
            className="btn-secondary flex-1 py-3"
          >
            修正する
          </button>
          <button
            onClick={() => setStep('done')}
            className="btn-primary flex-1 py-3 flex items-center justify-center gap-2"
          >
            <Send size={14} />
            送信する
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card-luxury p-8">
      <div className="space-y-5">
        {/* Inquiry type */}
        <div>
          <label className="block text-gold text-[10px] tracking-widest mb-2">
            相談の種類 <span className="text-wine">*</span>
          </label>
          <select
            value={data.type}
            onChange={(e) => setData({ ...data, type: e.target.value })}
            className="w-full bg-elevated border border-border text-cream px-4 py-3 text-sm outline-none focus:border-gold/50 transition-colors appearance-none cursor-pointer"
          >
            <option value="">選択してください</option>
            {therapistName && (
              <option value="セラピストへの予約相談">
                {therapistName}への予約相談
              </option>
            )}
            {inquiryTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Content */}
        <div>
          <label className="block text-gold text-[10px] tracking-widest mb-2">
            相談内容 <span className="text-wine">*</span>
          </label>
          <textarea
            rows={5}
            value={data.content}
            onChange={(e) => setData({ ...data, content: e.target.value })}
            placeholder={therapistName
              ? `${therapistName}への相談内容をお書きください。ご希望の日時・エリア・コース・ご質問など。`
              : 'ご相談内容をお書きください。（10文字以上）'}
            className="w-full bg-elevated border border-border text-cream px-4 py-3 text-sm placeholder:text-mist outline-none focus:border-gold/50 transition-colors resize-none"
          />
          <p className="text-mist text-[10px] mt-1">{data.content.length}文字</p>
        </div>

        {/* Email */}
        <div>
          <label className="block text-gold text-[10px] tracking-widest mb-2">
            メールアドレス <span className="text-wine">*</span>
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            placeholder="example@email.com"
            className="w-full bg-elevated border border-border text-cream px-4 py-3 text-sm placeholder:text-mist outline-none focus:border-gold/50 transition-colors"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block text-gold text-[10px] tracking-widest mb-2">
            年齢 <span className="text-wine">*</span>
          </label>
          <select
            value={data.age}
            onChange={(e) => setData({ ...data, age: e.target.value })}
            className="w-full bg-elevated border border-border text-cream px-4 py-3 text-sm outline-none focus:border-gold/50 transition-colors appearance-none cursor-pointer"
          >
            <option value="">選択してください</option>
            {Array.from({ length: 43 }, (_, i) => i + 18).map((age) => (
              <option key={age} value={String(age)}>{age}歳</option>
            ))}
            <option value="61">61歳以上</option>
          </select>
          <p className="text-mist text-[10px] mt-1">※18歳未満の方はご利用いただけません</p>
        </div>

        {/* Terms */}
        <div className="bg-base/50 border border-border p-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.agreedTerms}
              onChange={(e) => setData({ ...data, agreedTerms: e.target.checked })}
              className="mt-0.5 flex-shrink-0 accent-wine w-4 h-4"
            />
            <span className="text-mist text-[11px] leading-relaxed">
              <a href="/terms" className="text-gold hover:underline">利用規約</a>および
              <a href="/privacy" className="text-gold hover:underline">プライバシーポリシー</a>に同意します。
              送信内容は本サービスの運営にのみ使用されます。
            </span>
          </label>
        </div>

        <button
          onClick={() => canSubmit && setStep('confirm')}
          disabled={!canSubmit}
          className="btn-primary w-full py-4 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send size={15} />
          確認画面へ進む
        </button>
      </div>
    </div>
  );
}
