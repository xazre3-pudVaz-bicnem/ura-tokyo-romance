import Link from 'next/link';
import { MessageSquare, ChevronRight } from 'lucide-react';

type InquiryStatus = 'sent' | 'replied' | 'confirmed' | 'completed' | 'cancelled';

const STATUS_LABEL: Record<InquiryStatus, string> = {
  sent: '送信済み',
  replied: '返信あり',
  confirmed: '確認中',
  completed: '完了',
  cancelled: 'キャンセル',
};

const STATUS_COLOR: Record<InquiryStatus, string> = {
  sent: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
  replied: 'text-gold border-gold/30 bg-gold/10',
  confirmed: 'text-sky-300 border-sky-300/30 bg-sky-300/10',
  completed: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
  cancelled: 'text-mist border-border bg-elevated',
};

const dummyInquiries: Array<{
  id: string;
  therapistName: string;
  therapistSlug: string;
  status: InquiryStatus;
  date: string;
  message: string;
  hasReply: boolean;
}> = [
  {
    id: 'INQ-001',
    therapistName: '蓮',
    therapistSlug: 'ren',
    status: 'replied',
    date: '2026年6月7日',
    message: '初めてのご利用を検討しています。どのようなコースがおすすめでしょうか？',
    hasReply: true,
  },
  {
    id: 'INQ-002',
    therapistName: '蒼',
    therapistSlug: 'so',
    status: 'sent',
    date: '2026年6月5日',
    message: '出勤スケジュールについて教えていただけますか？',
    hasReply: false,
  },
];

export default function InquiriesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-cream">相談履歴</h1>
          <p className="text-mist text-xs mt-1">{dummyInquiries.length}件の相談履歴があります</p>
        </div>
      </div>

      {dummyInquiries.length > 0 ? (
        <div className="space-y-3">
          {dummyInquiries.map((inq) => (
            <div key={inq.id} className="card-luxury">
              <div className="flex items-center justify-between px-5 py-3 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <Link href={`/therapists/${inq.therapistSlug}`} className="text-cream text-sm hover:text-gold transition-colors">
                    {inq.therapistName}への相談
                  </Link>
                  <span className={`text-[10px] px-2 py-0.5 border ${STATUS_COLOR[inq.status]}`}>
                    {STATUS_LABEL[inq.status]}
                  </span>
                </div>
                <span className="text-mist text-[10px]">{inq.date}</span>
              </div>
              <div className="px-5 py-4">
                <p className="text-stone text-xs leading-relaxed line-clamp-2">{inq.message}</p>
                {inq.hasReply && (
                  <div className="mt-3 pl-3 border-l-2 border-gold/30">
                    <p className="text-mist text-[10px] mb-1">セラピストからの返信があります</p>
                    <button className="text-gold text-[10px] hover:underline flex items-center gap-1">
                      返信を見る <ChevronRight size={10} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card-luxury p-12 text-center">
          <MessageSquare size={32} className="text-border mx-auto mb-4" strokeWidth={1} />
          <p className="text-stone text-sm mb-2">相談履歴はありません</p>
          <p className="text-mist text-xs mb-6">セラピストのプロフィールページから相談を送ることができます</p>
          <Link href="/therapists" className="btn-primary text-xs px-6 py-2.5">セラピストを探す</Link>
        </div>
      )}

      <div className="mt-6 bg-surface border border-border p-4">
        <p className="text-mist text-[10px]">
          ※ 相談・予約機能はグランドオープン（2026年8月1日）後に本格提供開始します。当サービスは情報掲載とマッチングを提供します。実際のサービス内容は当事者間の合意に基づきます。
        </p>
      </div>
    </div>
  );
}
