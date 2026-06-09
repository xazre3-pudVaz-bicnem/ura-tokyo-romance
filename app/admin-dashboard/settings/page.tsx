'use client';

import { useState } from 'react';
import { Save, Globe, Bell, Shield, Database } from 'lucide-react';

export default function AdminSettingsPage() {
  const [siteName, setSiteName] = useState('裏東京ロマンス');
  const [openDate, setOpenDate] = useState('2026-08-01');
  const [notifyEmail, setNotifyEmail] = useState('info@uratokyoromance.com');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h1 className="font-display text-2xl text-cream mb-6">設定</h1>

      <div className="space-y-5">
        {/* Site settings */}
        <div className="bg-surface border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe size={15} className="text-gold" strokeWidth={1.5} />
            <p className="text-gold text-[10px] tracking-widest">サイト基本設定</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-mist text-[10px] tracking-widest mb-2">サイト名</label>
              <input
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full bg-elevated border border-border text-cream px-4 py-2.5 text-sm outline-none focus:border-gold/50"
              />
            </div>
            <div>
              <label className="block text-mist text-[10px] tracking-widest mb-2">グランドオープン日</label>
              <input
                type="date"
                value={openDate}
                onChange={(e) => setOpenDate(e.target.value)}
                className="w-full bg-elevated border border-border text-cream px-4 py-2.5 text-sm outline-none focus:border-gold/50"
              />
            </div>
            <div>
              <label className="block text-mist text-[10px] tracking-widest mb-2">サイトURL</label>
              <input
                defaultValue="https://uratokyoromance.com"
                disabled
                className="w-full bg-elevated border border-border/50 text-mist px-4 py-2.5 text-sm outline-none cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-mist text-[10px] tracking-widest mb-2">プレビューモード</label>
              <select className="w-full bg-elevated border border-border text-cream px-4 py-2.5 text-sm outline-none focus:border-gold/50">
                <option value="pre">グランドオープン前（先行登録受付中）</option>
                <option value="open">グランドオープン済み</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification settings */}
        <div className="bg-surface border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell size={15} className="text-gold" strokeWidth={1.5} />
            <p className="text-gold text-[10px] tracking-widest">通知設定</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-mist text-[10px] tracking-widest mb-2">管理者通知メール</label>
              <input
                type="email"
                value={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.value)}
                className="w-full bg-elevated border border-border text-cream px-4 py-2.5 text-sm outline-none focus:border-gold/50"
              />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {[
              { label: '新規申請があったとき', checked: true },
              { label: '新規口コミが届いたとき', checked: true },
              { label: '通報があったとき', checked: true },
              { label: 'ブログ承認待ちが届いたとき', checked: false },
            ].map((item) => (
              <label key={item.label} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={item.checked}
                  className="w-4 h-4 accent-gold"
                />
                <span className="text-stone text-sm">{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="bg-surface border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield size={15} className="text-gold" strokeWidth={1.5} />
            <p className="text-gold text-[10px] tracking-widest">セキュリティ</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <div>
                <p className="text-cream text-sm">年齢確認ゲート</p>
                <p className="text-mist text-[10px]">サイト入場時に18歳以上であることの確認を求める</p>
              </div>
              <div className="text-emerald-400 text-xs">有効</div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <div>
                <p className="text-cream text-sm">ロボット除外（robots.txt）</p>
                <p className="text-mist text-[10px]">管理画面・セラピスト管理画面を検索エンジンから除外</p>
              </div>
              <div className="text-emerald-400 text-xs">設定済み</div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-cream text-sm">法務確認ステータス</p>
                <p className="text-mist text-[10px]">正式公開前に法務確認を完了していること</p>
              </div>
              <div className="text-amber-400 text-xs">確認前（公開前に要対応）</div>
            </div>
          </div>
        </div>

        {/* Database info */}
        <div className="bg-surface border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Database size={15} className="text-gold" strokeWidth={1.5} />
            <p className="text-gold text-[10px] tracking-widest">データベース</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'バックエンド', value: 'Supabase（準備中）' },
              { label: '認証', value: 'Supabase Auth（準備中）' },
              { label: 'ストレージ', value: 'Supabase Storage（準備中）' },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-mist text-[10px] mb-1">{item.label}</p>
                <p className="text-stone text-xs">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleSave}
          className="btn-primary flex items-center gap-2 px-8"
        >
          <Save size={13} />
          {saved ? '保存しました' : '設定を保存する'}
        </button>
      </div>
    </div>
  );
}
