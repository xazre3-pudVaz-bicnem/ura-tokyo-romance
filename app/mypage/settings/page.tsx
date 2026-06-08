'use client';

import { useState } from 'react';
import { User, Mail, Lock, Shield, Trash2, Save } from 'lucide-react';

export default function SettingsPage() {
  const [nickname, setNickname] = useState('ゲストユーザー');
  const [email] = useState('guest@example.com');
  const [ageConfirmed, setAgeConfirmed] = useState(true);

  return (
    <div>
      <h1 className="font-display text-2xl text-cream mb-6">設定</h1>

      <div className="space-y-5">
        {/* Profile */}
        <div className="card-luxury">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
            <User size={14} className="text-gold" strokeWidth={1.5} />
            <h2 className="text-cream text-sm">プロフィール設定</h2>
          </div>
          <div className="px-5 py-5 space-y-4">
            <div>
              <label className="block text-mist text-[10px] tracking-widest mb-2">ニックネーム</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full md:w-80 bg-elevated border border-border text-cream px-4 py-2.5 text-sm outline-none focus:border-gold/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-mist text-[10px] tracking-widest mb-2">メールアドレス</label>
              <p className="text-stone text-sm">{email}</p>
              <p className="text-mist text-[10px] mt-1">メールアドレスの変更はサポートにお問い合わせください</p>
            </div>
            <button className="flex items-center gap-2 btn-primary text-xs px-5 py-2.5">
              <Save size={12} />
              保存する
            </button>
          </div>
        </div>

        {/* Security */}
        <div className="card-luxury">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
            <Lock size={14} className="text-gold" strokeWidth={1.5} />
            <h2 className="text-cream text-sm">セキュリティ</h2>
          </div>
          <div className="px-5 py-5 space-y-4">
            <button className="flex items-center gap-2 btn-secondary text-xs px-5 py-2.5">
              <Lock size={12} />
              パスワードを変更する
            </button>
          </div>
        </div>

        {/* Age verification */}
        <div className="card-luxury">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
            <Shield size={14} className="text-gold" strokeWidth={1.5} />
            <h2 className="text-cream text-sm">年齢確認</h2>
          </div>
          <div className="px-5 py-5">
            <div className="flex items-start gap-3">
              <div className={`w-4 h-4 border flex-shrink-0 mt-0.5 flex items-center justify-center ${ageConfirmed ? 'border-gold bg-gold/20' : 'border-border'}`}>
                {ageConfirmed && <span className="text-gold text-[10px]">✓</span>}
              </div>
              <div>
                <p className="text-stone text-xs">18歳以上であることを確認しました</p>
                <p className="text-mist text-[10px] mt-1">当サービスは18歳未満のご利用を禁止しています</p>
              </div>
            </div>
          </div>
        </div>

        {/* Email notifications */}
        <div className="card-luxury">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
            <Mail size={14} className="text-gold" strokeWidth={1.5} />
            <h2 className="text-cream text-sm">メール通知設定</h2>
          </div>
          <div className="px-5 py-5 space-y-3">
            {[
              { label: 'お気に入りセラピストの出勤通知', defaultOn: true },
              { label: '相談への返信通知', defaultOn: true },
              { label: 'サービスからのお知らせ', defaultOn: false },
            ].map((item) => {
              const [on, setOn] = useState(item.defaultOn);
              return (
                <label key={item.label} className="flex items-center justify-between cursor-pointer">
                  <span className="text-stone text-xs">{item.label}</span>
                  <button
                    onClick={() => setOn(!on)}
                    className={`w-9 h-5 relative transition-colors ${on ? 'bg-gold/30' : 'bg-elevated border border-border'} flex items-center px-1`}
                  >
                    <div className={`w-3 h-3 transition-all ${on ? 'bg-gold ml-auto' : 'bg-border'}`} />
                  </button>
                </label>
              );
            })}
          </div>
        </div>

        {/* Danger zone */}
        <div className="card-luxury border-wine/20">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-wine/20">
            <Trash2 size={14} className="text-wine" strokeWidth={1.5} />
            <h2 className="text-cream text-sm">アカウントの削除</h2>
          </div>
          <div className="px-5 py-5">
            <p className="text-stone text-xs mb-4">アカウントを削除すると、お気に入りや閲覧履歴などのすべてのデータが削除されます。この操作は取り消せません。</p>
            <button className="text-wine border border-wine/30 text-xs px-5 py-2.5 hover:bg-wine/10 transition-colors">
              アカウントを削除する
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
