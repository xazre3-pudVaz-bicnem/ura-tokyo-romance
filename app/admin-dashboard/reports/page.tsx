'use client';

import { useState } from 'react';
import { AlertTriangle, CheckCircle, Eye } from 'lucide-react';

type ReportStatus = 'new' | 'investigating' | 'resolved' | 'dismissed';

interface Report {
  id: string;
  targetType: 'therapist' | 'blog' | 'inquiry';
  targetName: string;
  reason: string;
  details: string;
  status: ReportStatus;
  createdAt: string;
}

const STATUS_LABELS: Record<ReportStatus, string> = {
  new: '新規',
  investigating: '調査中',
  resolved: '対応済み',
  dismissed: '却下',
};

const STATUS_COLOR: Record<ReportStatus, string> = {
  new: 'text-wine',
  investigating: 'text-amber-400',
  resolved: 'text-emerald-400',
  dismissed: 'text-mist',
};

const dummyReports: Report[] = [
  {
    id: 'RPT-001',
    targetType: 'therapist',
    targetName: '悠真',
    reason: '虚偽情報',
    details: 'プロフィールの年齢と実際の年齢が異なる可能性があります。',
    status: 'new',
    createdAt: '2026-06-07T12:00:00',
  },
  {
    id: 'RPT-002',
    targetType: 'blog',
    targetName: '蓮 - グランドオープンに向けて',
    reason: '不適切なコンテンツ',
    details: '連絡先情報が含まれています。',
    status: 'investigating',
    createdAt: '2026-06-06T09:30:00',
  },
];

export default function ReportsPage() {
  const [reports, setReports] = useState(dummyReports);

  const updateStatus = (id: string, status: ReportStatus) =>
    setReports((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-cream">通報管理</h1>
          <p className="text-mist text-xs mt-1">ユーザーからの通報を確認・対応</p>
        </div>
        <span className="text-wine text-xs">{reports.filter(r => r.status === 'new').length}件 未対応</span>
      </div>

      {reports.length === 0 ? (
        <div className="bg-surface border border-border p-10 text-center">
          <AlertTriangle size={24} className="text-mist mx-auto mb-3" strokeWidth={1} />
          <p className="text-stone text-sm">通報はありません</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="bg-surface border border-border p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle size={13} className="text-wine" />
                    <span className="text-cream text-sm">{report.targetName}</span>
                    <span className="text-mist text-[10px]">
                      {report.targetType === 'therapist' ? 'セラピスト' : report.targetType === 'blog' ? 'ブログ' : '相談'}
                    </span>
                  </div>
                  <span className="text-wine text-xs">{report.reason}</span>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className={`text-xs ${STATUS_COLOR[report.status]}`}>
                    {STATUS_LABELS[report.status]}
                  </span>
                  <span className="text-mist text-[10px]">
                    {new Date(report.createdAt).toLocaleDateString('ja-JP')}
                  </span>
                </div>
              </div>

              <p className="text-stone text-xs leading-relaxed mb-4 border-l-2 border-border pl-3">
                {report.details}
              </p>

              <div className="flex items-center gap-2">
                <span className="text-mist text-[10px]">対応:</span>
                <select
                  value={report.status}
                  onChange={(e) => updateStatus(report.id, e.target.value as ReportStatus)}
                  className="bg-elevated border border-border text-stone text-[10px] px-2 py-1 outline-none focus:border-gold/50"
                >
                  {(Object.entries(STATUS_LABELS) as [ReportStatus, string][]).map(([s, label]) => (
                    <option key={s} value={s}>{label}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
