'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bell, Lock, Eye, EyeOff, Save } from 'lucide-react';

export default function SettingsPage() {
  const [isPublished, setIsPublished] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifyInquiry, setNotifyInquiry] = useState(true);

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
