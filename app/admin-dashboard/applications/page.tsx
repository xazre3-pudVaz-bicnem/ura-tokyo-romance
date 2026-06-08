'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Eye, CheckCircle, XCircle, RotateCcw, ChevronDown } from 'lucide-react';
import {
  dummyApplications,
  APPLICATION_STATUS_LABELS,
  type ApplicationStatus,
} from '@/data/applications';

const STATUS_COLOR: Record<ApplicationStatus, string> = {
  new: 'border-gold/30 bg-gold/10 text-gold',
  reviewing: 'border-stone/30 bg-stone/10 text-stone',
  id_check: 'border-amber-400/30 bg-amber-400/10 text-amber-400',
  photo_check: 'border-amber-400/30 bg-amber-400/10 text-amber-400',
  interview: 'border-purple-400/30 bg-purple-400/10 text-purple-400',
  approved: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-400',
  sent_back: 'border-orange-400/30 bg-orange-400/10 text-orange-400',
  rejected: 'border-wine/30 bg-wine/10 text-wine',
};

const ALL_STATUSES = Object.entries(APPLICATION_STATUS_LABELS) as [ApplicationStatus, string][];

export default function ApplicationsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'all'>('all');

  const filtered = dummyApplications.filter((app) => {
    const matchSearch =
      !search ||
      app.stageName.includes(search) ||
      app.areas.some((a) => a.includes(search)) ||
      app.id.includes(search);
    const matchStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const counts = ALL_STATUSES.map(([s]) => ({
    status: s,
    count: dummyApplications.filter((a) => a.status === s).length,
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-cream">申請管理</h1>
          <p className="text-mist text-xs mt-1">新規登録申請の審査・管理</p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-stone">{dummyApplications.length}件</span>
        </div>
      </div>

      {/* Status filter tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        <button
          onClick={() => setStatusFilter('all')}
          className={`text-[10px] px-3 py-1.5 border transition-all ${
            statusFilter === 'all' ? 'border-cream/30 text-cream bg-cream/5' : 'border-border text-mist hover:text-stone'
          }`}
        >
          すべて ({dummyApplications.length})
        </button>
        {counts.map(({ status, count }) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`text-[10px] px-3 py-1.5 border transition-all ${
              statusFilter === status
                ? `${STATUS_COLOR[status]} border-opacity-100`
                : 'border-border text-mist hover:text-stone'
            }`}
          >
            {APPLICATION_STATUS_LABELS[status]} ({count})
          </button>
        ))}
      </div>

      {/* Search bar */}
      <div className="relative mb-5">
        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-mist" />
        <input
          type="text"
          placeholder="源氏名・エリア・申請IDで検索"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-surface border border-border text-cream text-sm pl-10 pr-4 py-2.5 outline-none focus:border-gold/50 transition-colors"
        />
      </div>

      {/* Table */}
      <div className="bg-surface border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-elevated">
                <th className="text-left text-mist text-[10px] tracking-widest px-5 py-3 font-normal">申請ID</th>
                <th className="text-left text-mist text-[10px] tracking-widest px-5 py-3 font-normal">源氏名</th>
                <th className="text-left text-mist text-[10px] tracking-widest px-5 py-3 font-normal">年齢</th>
                <th className="text-left text-mist text-[10px] tracking-widest px-5 py-3 font-normal">エリア</th>
                <th className="text-left text-mist text-[10px] tracking-widest px-5 py-3 font-normal">申請日</th>
                <th className="text-left text-mist text-[10px] tracking-widest px-5 py-3 font-normal">ステータス</th>
                <th className="text-right text-mist text-[10px] tracking-widest px-5 py-3 font-normal">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filtered.map((app) => (
                <tr key={app.id} className="hover:bg-elevated transition-colors">
                  <td className="px-5 py-3 text-mist text-xs font-mono">{app.id}</td>
                  <td className="px-5 py-3 text-cream text-sm">{app.stageName}</td>
                  <td className="px-5 py-3 text-stone text-xs">{app.age}歳</td>
                  <td className="px-5 py-3 text-stone text-xs">{app.areas.join('・')}</td>
                  <td className="px-5 py-3 text-stone text-xs">
                    {new Date(app.appliedAt).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-[10px] border px-2 py-0.5 ${STATUS_COLOR[app.status]}`}>
                      {APPLICATION_STATUS_LABELS[app.status]}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin-dashboard/applications/${app.id}`}
                        className="text-stone text-[10px] hover:text-gold transition-colors flex items-center gap-1"
                      >
                        <Eye size={12} />
                        詳細
                      </Link>
                      {app.status === 'new' && (
                        <button className="text-sky-300 text-[10px] hover:underline">確認中へ</button>
                      )}
                      {app.status === 'approved' && !app.account?.loginId && (
                        <button className="text-emerald-400 text-[10px] hover:underline">ID発行</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-mist text-sm">
                    該当する申請はありません
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notes */}
      <div className="mt-4 p-4 bg-elevated border border-border/50">
        <p className="text-mist text-[10px]">
          審査フロー: 新規申請 → 確認中 → 本人確認待ち → 写真確認待ち → 面談予定 → 審査OK → ID・PW発行 → セラピスト通知
        </p>
      </div>
    </div>
  );
}
