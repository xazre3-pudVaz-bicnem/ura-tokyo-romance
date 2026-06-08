import Link from 'next/link';
import { Plus, Eye, ShieldCheck } from 'lucide-react';
import { dummyTherapists } from '@/data/dummy-therapists';

const ACCOUNT_STATUS_COLOR: Record<string, string> = {
  not_issued: 'text-mist',
  issued: 'text-gold',
  active: 'text-emerald-400',
  suspended: 'text-wine',
  withdrawn: 'text-mist line-through',
};

const ACCOUNT_STATUS_LABELS: Record<string, string> = {
  not_issued: '未発行',
  issued: '発行済み',
  active: '有効',
  suspended: '停止中',
  withdrawn: '退会',
};

// Mock account statuses for demo
const mockAccountStatus: Record<string, string> = {
  ren: 'active',
  yuma: 'active',
  iori: 'active',
  reo: 'issued',
  ao: 'active',
  ritsu: 'active',
  kyohei: 'issued',
  minato: 'not_issued',
};

export default function AdminTherapistsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-cream">セラピスト管理</h1>
          <p className="text-mist text-xs mt-1">登録セラピストの一覧・アカウント管理</p>
        </div>
        <Link href="/admin-dashboard/therapists/new" className="btn-primary text-xs py-2 px-4 flex items-center gap-2">
          <Plus size={13} />
          セラピスト登録
        </Link>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: '総セラピスト数', value: dummyTherapists.length, color: 'text-cream' },
          { label: 'アカウント有効', value: 5, color: 'text-emerald-400' },
          { label: '発行済み（未ログイン）', value: 2, color: 'text-gold' },
          { label: '未発行', value: 1, color: 'text-mist' },
        ].map((s) => (
          <div key={s.label} className="bg-surface border border-border p-4">
            <p className={`text-2xl font-display ${s.color}`}>{s.value}</p>
            <p className="text-mist text-[10px] mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-surface border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-elevated">
                <th className="text-left text-mist text-[10px] tracking-widest px-5 py-3 font-normal">セラピスト</th>
                <th className="text-left text-mist text-[10px] tracking-widest px-5 py-3 font-normal">年齢</th>
                <th className="text-left text-mist text-[10px] tracking-widest px-5 py-3 font-normal">エリア</th>
                <th className="text-left text-mist text-[10px] tracking-widest px-5 py-3 font-normal">本人確認</th>
                <th className="text-left text-mist text-[10px] tracking-widest px-5 py-3 font-normal">アカウント</th>
                <th className="text-left text-mist text-[10px] tracking-widest px-5 py-3 font-normal">公開状態</th>
                <th className="text-right text-mist text-[10px] tracking-widest px-5 py-3 font-normal">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {dummyTherapists.map((t) => {
                const acctStatus = mockAccountStatus[t.slug] || 'not_issued';
                return (
                  <tr key={t.id} className="hover:bg-elevated transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-12 bg-elevated overflow-hidden flex-shrink-0">
                          {t.image && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={t.image} alt={t.name} className="w-full h-full object-cover object-top" />
                          )}
                        </div>
                        <div>
                          <p className="text-cream text-sm">{t.name}</p>
                          <p className="text-mist text-[10px] font-mono">TH-{t.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-stone text-xs">{t.age}歳</td>
                    <td className="px-5 py-3 text-stone text-xs">{t.areas.slice(0, 2).join('・')}</td>
                    <td className="px-5 py-3">
                      {t.verifiedId ? (
                        <div className="flex items-center gap-1 text-emerald-400 text-xs">
                          <ShieldCheck size={12} />
                          済
                        </div>
                      ) : (
                        <span className="text-mist text-xs">未確認</span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs ${ACCOUNT_STATUS_COLOR[acctStatus]}`}>
                        {ACCOUNT_STATUS_LABELS[acctStatus]}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs ${t.isNew ? 'text-gold' : 'text-emerald-400'}`}>
                        {t.isNew ? '準備中' : '公開中'}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Link
                        href={`/admin-dashboard/therapists/${t.slug}`}
                        className="text-stone text-[10px] hover:text-gold transition-colors flex items-center gap-1 justify-end"
                      >
                        <Eye size={12} />
                        管理
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
