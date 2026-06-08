import { useParams } from 'next/navigation';
import { Calendar } from 'lucide-react';
import { dummyTherapists } from '@/data/dummy-therapists';

export default function TherapistAdminSchedulePage() {
  return (
    <div className="space-y-5">
      <p className="text-mist text-xs">セラピストの出勤スケジュールを確認できます。</p>

      {/* Weekly view */}
      <div className="bg-surface border border-border p-6">
        <p className="text-gold text-[10px] tracking-widest mb-4">今週の出勤状況（2026年6月8日〜14日）</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-mist text-[10px] text-left py-2 px-3 font-normal w-12">曜日</th>
                <th className="text-mist text-[10px] text-left py-2 px-3 font-normal">時間</th>
                <th className="text-mist text-[10px] text-left py-2 px-3 font-normal">対応エリア</th>
                <th className="text-mist text-[10px] text-left py-2 px-3 font-normal">受付状況</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {[
                { day: '月 6/8', time: '13:00〜21:00', area: '渋谷・新宿', status: '受付中' },
                { day: '火 6/9', time: '—', area: '—', status: '休み' },
                { day: '水 6/10', time: '14:00〜20:00', area: '恵比寿・中目黒', status: '残りわずか' },
                { day: '木 6/11', time: '—', area: '—', status: '休み' },
                { day: '金 6/12', time: '13:00〜22:00', area: '全エリア', status: '受付中' },
                { day: '土 6/13', time: '11:00〜18:00', area: '渋谷', status: '満枠' },
                { day: '日 6/14', time: '要相談', area: '要相談', status: '要相談' },
              ].map((row) => (
                <tr key={row.day} className="hover:bg-elevated">
                  <td className="py-2.5 px-3 text-stone">{row.day}</td>
                  <td className="py-2.5 px-3 text-cream">{row.time}</td>
                  <td className="py-2.5 px-3 text-stone">{row.area}</td>
                  <td className="py-2.5 px-3">
                    <span className={`text-[10px] border px-2 py-0.5 ${
                      row.status === '受付中' ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-400' :
                      row.status === '残りわずか' ? 'border-amber-400/30 bg-amber-400/10 text-amber-400' :
                      row.status === '満枠' ? 'border-wine/30 bg-wine/10 text-wine' :
                      row.status === '要相談' ? 'border-stone/30 bg-stone/10 text-stone' :
                      'border-border text-mist'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-surface border border-border p-5">
        <p className="text-mist text-xs leading-relaxed">
          出勤スケジュールはセラピスト本人が管理画面から更新します。
          管理者は確認のみ行えます。問題がある場合は相談管理ページよりご連絡ください。
        </p>
      </div>
    </div>
  );
}
