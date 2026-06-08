'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Key, RefreshCw, Ban, ShieldCheck, Copy, CheckCircle } from 'lucide-react';
import { dummyTherapists } from '@/data/dummy-therapists';

const mockAccounts: Record<string, {
  loginId: string;
  status: 'not_issued' | 'issued' | 'active' | 'suspended' | 'withdrawn';
  issuedAt?: string;
  lastLoginAt?: string;
}> = {
  ren: { loginId: 'ren_ura001', status: 'active', issuedAt: '2026-05-15T12:00:00', lastLoginAt: '2026-06-07T20:30:00' },
  yuma: { loginId: 'yuma_ura002', status: 'active', issuedAt: '2026-05-16T14:00:00', lastLoginAt: '2026-06-06T11:00:00' },
  ao: { loginId: 'ao_ura005', status: 'active', issuedAt: '2026-05-20T10:00:00', lastLoginAt: '2026-06-07T15:45:00' },
  reo: { loginId: 'reo_ura004', status: 'issued', issuedAt: '2026-06-01T09:00:00' },
  kyohei: { loginId: 'kyohei_ura007', status: 'issued', issuedAt: '2026-06-03T10:00:00' },
  ritsu: { loginId: 'ritsu_ura006', status: 'active', issuedAt: '2026-05-25T13:00:00', lastLoginAt: '2026-06-07T09:00:00' },
  iori: { loginId: 'iori_ura003', status: 'active', issuedAt: '2026-05-18T11:00:00', lastLoginAt: '2026-06-05T16:00:00' },
  minato: { loginId: '', status: 'not_issued' },
};

const STATUS_LABELS: Record<string, string> = {
  not_issued: '未発行',
  issued: '発行済み（未ログイン）',
  active: '有効',
  suspended: '停止中',
  withdrawn: '退会',
};

const STATUS_COLOR: Record<string, string> = {
  not_issued: 'text-mist',
  issued: 'text-gold',
  active: 'text-emerald-400',
  suspended: 'text-wine',
  withdrawn: 'text-mist',
};

export default function TherapistAccountPage() {
  const params = useParams();
  const id = params.id as string;
  const therapist = dummyTherapists.find((t) => t.slug === id);
  const account = mockAccounts[id] || { loginId: '', status: 'not_issued' as const };

  const [copied, setCopied] = useState(false);
  const [confirmAction, setConfirmAction] = useState<string | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(account.loginId).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!therapist) {
    return <p className="text-stone text-sm">セラピストが見つかりません。</p>;
  }

  return (
    <div className="space-y-5">
      {/* Account status card */}
      <div className="bg-surface border border-border p-6">
        <p className="text-gold text-[10px] tracking-widest mb-5">アカウント情報</p>

        <div className="flex items-center gap-4 mb-6">
          <div className={`text-lg font-display ${STATUS_COLOR[account.status]}`}>
            {STATUS_LABELS[account.status]}
          </div>
          {account.status === 'active' && (
            <div className="flex items-center gap-1.5 text-emerald-400 text-xs">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              稼働中
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <p className="text-mist text-[10px] tracking-widest mb-2">ログインID</p>
            {account.loginId ? (
              <div className="flex items-center gap-2">
                <p className="text-cream text-sm font-mono">{account.loginId}</p>
                <button onClick={handleCopy} className="text-mist hover:text-stone transition-colors">
                  {copied ? <CheckCircle size={13} className="text-emerald-400" /> : <Copy size={13} />}
                </button>
              </div>
            ) : (
              <p className="text-mist text-sm">未発行</p>
            )}
          </div>

          <div>
            <p className="text-mist text-[10px] tracking-widest mb-2">発行日時</p>
            <p className="text-cream text-sm">
              {account.issuedAt
                ? new Date(account.issuedAt).toLocaleString('ja-JP', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                : '—'}
            </p>
          </div>

          <div>
            <p className="text-mist text-[10px] tracking-widest mb-2">最終ログイン</p>
            <p className="text-cream text-sm">
              {account.lastLoginAt
                ? new Date(account.lastLoginAt).toLocaleString('ja-JP', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                : '—'}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-surface border border-border p-6">
        <p className="text-gold text-[10px] tracking-widest mb-5">アカウント操作</p>
        <div className="flex flex-wrap gap-3">
          {account.status === 'not_issued' && (
            <button className="flex items-center gap-2 border border-gold/50 text-gold px-5 py-2.5 text-sm hover:bg-gold/10 transition-colors">
              <Key size={14} />
              ログインID・パスワードを発行
            </button>
          )}
          {(account.status === 'active' || account.status === 'issued') && (
            <>
              <button className="flex items-center gap-2 border border-stone/30 text-stone px-5 py-2.5 text-sm hover:bg-elevated hover:text-cream transition-colors">
                <RefreshCw size={14} />
                パスワードを再発行
              </button>
              <button
                onClick={() => setConfirmAction('suspend')}
                className="flex items-center gap-2 border border-wine/30 text-wine px-5 py-2.5 text-sm hover:bg-wine/10 transition-colors"
              >
                <Ban size={14} />
                ログイン停止
              </button>
            </>
          )}
          {account.status === 'suspended' && (
            <button className="flex items-center gap-2 border border-emerald-400/30 text-emerald-400 px-5 py-2.5 text-sm hover:bg-emerald-400/10 transition-colors">
              <ShieldCheck size={14} />
              停止を解除する
            </button>
          )}
        </div>
      </div>

      {/* Confirm dialog */}
      {confirmAction && (
        <div className="fixed inset-0 bg-base/80 backdrop-blur-sm flex items-center justify-center z-50 px-5">
          <div className="bg-surface border border-border p-8 max-w-sm w-full">
            <p className="text-cream text-sm mb-2">ログイン停止の確認</p>
            <p className="text-stone text-xs mb-6 leading-relaxed">
              {therapist.name} のアカウントを停止します。停止中はログインできなくなります。
              いつでも再開できます。
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmAction(null)}
                className="btn-primary flex-1 text-xs py-2.5"
              >
                停止する
              </button>
              <button
                onClick={() => setConfirmAction(null)}
                className="btn-secondary flex-1 text-xs py-2.5"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login history */}
      <div className="bg-surface border border-border p-6">
        <p className="text-gold text-[10px] tracking-widest mb-4">ログイン履歴</p>
        {account.lastLoginAt ? (
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-mist text-[10px] py-2 font-normal">日時</th>
                <th className="text-left text-mist text-[10px] py-2 font-normal">IPアドレス</th>
                <th className="text-left text-mist text-[10px] py-2 font-normal">結果</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {[
                { date: account.lastLoginAt, ip: '203.0.113.1', result: '成功' },
                { date: '2026-06-06T14:20:00', ip: '203.0.113.1', result: '成功' },
                { date: '2026-06-05T22:11:00', ip: '198.51.100.42', result: '成功' },
              ].map((log, i) => (
                <tr key={i}>
                  <td className="py-2 text-stone">
                    {new Date(log.date).toLocaleString('ja-JP', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="py-2 text-mist font-mono">{log.ip}</td>
                  <td className="py-2 text-emerald-400">{log.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-mist text-xs">ログイン履歴はありません</p>
        )}
      </div>
    </div>
  );
}
