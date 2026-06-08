import { MessageSquare, Clock } from 'lucide-react';

const sampleInquiries = [
  { id: 1, from: 'ユーザーA', subject: '来週土曜日の予約相談', time: 'グランドオープン後', status: '未読', preview: '来週の土曜日に渋谷エリアで...' },
  { id: 2, from: 'ユーザーB', subject: '60分コースについて', time: 'グランドオープン後', status: '返信済', preview: '60分のコース詳細を教えて...' },
];

export default function InquiriesPage() {
  return (
    <div>
      <h2 className="font-display text-2xl text-cream mb-6">相談受信</h2>

      <div className="bg-wine/10 border border-wine/30 p-4 mb-6">
        <p className="text-wine text-xs">
          相談受信機能はグランドオープン後に提供されます。以下はプレビューです。
        </p>
      </div>

      <div className="space-y-3">
        {sampleInquiries.map((item) => (
          <div key={item.id} className="card-luxury p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 bg-elevated border border-border flex items-center justify-center flex-shrink-0">
                  <MessageSquare size={14} className="text-mist" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <p className="text-cream text-sm mb-1">{item.subject}</p>
                  <p className="text-stone text-xs truncate">{item.preview}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className={`text-[9px] tracking-widest px-2 py-0.5 ${
                  item.status === '未読' ? 'bg-wine/20 text-wine' : 'bg-border text-mist'
                }`}>
                  {item.status}
                </span>
                <div className="flex items-center gap-1 text-mist">
                  <Clock size={10} />
                  <span className="text-[10px]">{item.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card-luxury p-6 mt-6 text-center">
        <p className="text-stone text-xs">
          実際の相談受信はグランドオープン後に表示されます
        </p>
      </div>
    </div>
  );
}
