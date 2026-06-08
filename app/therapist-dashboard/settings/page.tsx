'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bell, Lock, Eye, EyeOff, Copy, CheckCheck, MessageSquare, Star } from 'lucide-react';

const THERAPIST = { referralCode: 'REN-2026', planType: 'standard' };

export default function SettingsPage() {
  const [isPublished, setIsPublished] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifyInquiry, setNotifyInquiry] = useState(true);
  const [copied, setCopied] = useState(false);

  const copyReferral = () => {
    navigator.clipboard.writeText(THERAPIST.referralCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div>
      <h2 className="font-display text-2xl text-cream mb-6">設定</h2>

      <div className="space-y-6">
        {/* Publish status */}
        <div className="card-luxury p-6">
          <p className="text-gold text-[10px] tracking-widest mb-4">掲載状態</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isPublished ? <Eye size={16} className="text-gold" strokeWidth={1.5} /> : <EyeOff size={16} className="text-mist" strokeWidth={1.5} />}
              <div>
                <p className="text-cream text-sm">{isPublished ? 'プロフィール公開中' : 'プロフィール非公開'}</p>
                <p className="text-stone text-xs mt-0.5">{isPublished ? 'セラピスト一覧に表示されています' : '現在非公開設定中'}</p>
              </div>
            </div>
            <button
              onClick={() => setIsPublished(!isPublished)}
              className={`w-12 h-6 rounded-full transition-colors duration-200 relative ${isPublished ? 'bg-gold' : 'bg-border'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${isPublished ? 'translate-x-6' : ''}`} />
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="card-luxury p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell size={16} className="text-gold" strokeWidth={1.5} />
            <p className="text-cream text-sm">通知設定</p>
          </div>
          <div className="space-y-4">
            {[
              { label: '相談受信時にメール通知', desc: '新しい相談が来たらメールで通知', state: notifyInquiry, setter: setNotifyInquiry },
              { label: 'お気に入り追加時に通知', desc: '誰かがお気に入りに追加したとき', state: notifyEmail, setter: setNotifyEmail },
            ].map(({ label, desc, state, setter }) => (
              <div key={label} className="flex items-center justify-between">
                <div>
                  <p className="text-stone text-sm">{label}</p>
                  <p className="text-mist text-xs">{desc}</p>
                </div>
                <button
                  onClick={() => setter(!state)}
                  className={`w-12 h-6 rounded-full transition-colors duration-200 relative ${state ? 'bg-gold' : 'bg-border'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${state ? 'translate-x-6' : ''}`} />
                </button>
              </div>
            ))}
          </div>
          <p className="text-mist text-[10px] mt-4">通知機能はグランドオープン後に有効になります</p>
        </div>

        {/* Password */}
        <div className="card-luxury p-6">
          <div className="flex items-center gap-3 mb-4">
            <Lock size={16} className="text-gold" strokeWidth={1.5} />
            <p className="text-cream text-sm">パスワード変更</p>
          </div>
          <p className="text-stone text-xs mb-4">グランドオープン後にご利用いただけます。</p>
          <button disabled className="btn-secondary opacity-50 cursor-not-allowed text-sm py-2 px-4">
            パスワードを変更（準備中）
          </button>
        </div>

        {/* Plan info */}
        <div className="card-luxury p-6">
          <div className="flex items-center gap-3 mb-4">
            <Star size={16} className="text-gold" strokeWidth={1.5} />
            <p className="text-cream text-sm">掲載プラン</p>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-cream text-sm capitalize">
                {THERAPIST.planType === 'standard' ? 'スタンダードプラン' : THERAPIST.planType === 'premium' ? 'プレミアムプラン' : '無料プラン'}
              </p>
              <p className="text-mist text-xs mt-0.5">正式料金はグランドオープン前に確定します</p>
            </div>
            <span className={`text-[10px] px-3 py-1 border ${
              THERAPIST.planType === 'premium' ? 'border-gold text-gold' :
              THERAPIST.planType === 'standard' ? 'border-sky-300 text-sky-300' :
              'border-border text-mist'
            }`}>
              {THERAPIST.planType.toUpperCase()}
            </span>
          </div>
          <button disabled className="text-gold text-xs hover:underline disabled:opacity-50 disabled:cursor-not-allowed">
            プランをアップグレードする（グランドオープン後）
          </button>
        </div>

        {/* Referral code */}
        <div className="card-luxury p-6">
          <p className="text-gold text-[10px] tracking-widest mb-4">紹介コード</p>
          <p className="text-stone text-xs mb-3">このコードを友人のセラピストに共有してください。紹介した方が登録完了すると特典が付与されます（グランドオープン後）。</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-elevated border border-border px-4 py-2.5 flex items-center justify-between">
              <span className="text-cream text-sm font-mono tracking-widest">{THERAPIST.referralCode}</span>
            </div>
            <button onClick={copyReferral} className="flex items-center gap-2 btn-secondary text-xs px-4 py-2.5">
              {copied ? <CheckCheck size={13} className="text-emerald-400" /> : <Copy size={13} />}
              {copied ? 'コピー済み' : 'コピー'}
            </button>
          </div>
        </div>

        {/* LINE connect */}
        <div className="card-luxury p-6">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare size={16} className="text-gold" strokeWidth={1.5} />
            <p className="text-cream text-sm">LINE通知連携</p>
          </div>
          <p className="text-stone text-xs mb-4">相談受信・お気に入り追加・ランキング入りをLINEで受け取れます。グランドオープン後に対応予定です。</p>
          <button disabled className="btn-secondary opacity-50 cursor-not-allowed text-sm py-2 px-4">
            LINEと連携する（準備中）
          </button>
        </div>

        {/* Danger zone */}
        <div className="card-luxury p-6 border border-wine/30">
          <p className="text-wine text-[10px] tracking-widest mb-4">アカウント管理</p>
          <div className="space-y-3">
            <button disabled className="text-stone text-xs hover:text-wine transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              プロフィールを一時的に非公開にする
            </button>
            <br />
            <button disabled className="text-wine text-xs hover:text-wine/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              アカウントを削除する（グランドオープン後）
            </button>
          </div>
        </div>

        <div className="text-center">
          <Link href="/contact" className="text-gold text-xs hover:underline">
            サポートに問い合わせる →
          </Link>
        </div>
      </div>
    </div>
  );
}
