import type { Metadata } from 'next';
import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';

export const metadata: Metadata = {
  title: 'セラピスト審査の流れ｜女風セラピスト登録 裏東京ロマンス',
  description:
    '裏東京ロマンスへのセラピスト登録・審査の流れを詳しくご説明します。申請から掲載開始まで最短5営業日。東京の女風マッチングプラットフォーム。',
  alternates: { canonical: 'https://ura-tokyo-romance.com/register/flow' },
};

const steps = [
  {
    num: '01',
    title: '登録申請フォームを送る',
    duration: 'すぐに完了',
    desc: '登録申請フォームに源氏名・年齢・活動エリア・連絡先メールアドレスなどを入力して送信してください。',
    notes: ['源氏名（活動名）を入力してください', '本名は不要です', '申請は無料です'],
  },
  {
    num: '02',
    title: '運営からの確認連絡',
    duration: '2営業日以内',
    desc: '申請を受け付けたら運営からメールでご連絡します。本人確認書類の提出方法と、次のステップをご案内します。',
    notes: ['迷惑メールフォルダのご確認をお願いします', '2営業日以内に返信がない場合はお問い合わせください'],
  },
  {
    num: '03',
    title: '本人確認書類の提出',
    duration: '1〜2日',
    desc: '運転免許証・パスポート・マイナンバーカードなどの本人確認書類を、運営が指定する方法で提出してください。',
    notes: ['提出書類は個人情報として厳重に管理します', '利用者に公開されることはありません', '書類の種類は複数対応予定'],
  },
  {
    num: '04',
    title: 'プロフィール入力',
    duration: '自由に入力',
    desc: '運営が提供するプロフィール入力フォームに、自己紹介・対応エリア・出勤予定・料金・雰囲気タグなどを入力してください。',
    notes: ['写真は任意です（後から追加可）', '料金は自分で設定できます', 'プロフィールはいつでも編集できます'],
  },
  {
    num: '05',
    title: '運営審査',
    duration: '2〜5営業日',
    desc: '入力されたプロフィール・写真・本人確認書類を運営が確認します。審査基準を満たしていれば承認します。',
    notes: ['審査基準は非公開ですが、誠実・正確な情報記載が重要です', '不合格の場合は理由とともにご連絡します', '修正後に再審査が可能です'],
  },
  {
    num: '06',
    title: '掲載開始',
    duration: '審査完了後すぐ',
    desc: '審査合格後、プロフィールが公開されます。検索・ランキングに表示され、利用者から見つけてもらえるようになります。',
    notes: ['初期は新人枠で露出が増えます', '口コミが増えるほど検索順位が上がります', '出勤情報はいつでも更新できます'],
  },
];

export default function RegisterFlowPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-5 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold text-[10px] tracking-[0.3em] mb-4">Registration Flow</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-5 tracking-wide">セラピスト審査の流れ</h1>
          <span className="block w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-stone leading-relaxed">
            申請から掲載開始まで、最短5営業日を目安にご案内します。
            各ステップを確認して、安心してご登録ください。
          </p>
        </div>
      </section>

      {/* Flow */}
      <section className="section-py px-5">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {steps.map((step) => (
              <div key={step.num} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 border border-gold flex-shrink-0 flex items-center justify-center text-gold text-sm font-display">
                    {step.num}
                  </div>
                  <div className="flex-1 w-px bg-border mt-2" />
                </div>
                <div className="pb-10 flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-cream text-base">{step.title}</h3>
                    <span className="text-gold text-[10px] tracking-wider border border-gold/30 px-2 py-0.5">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-stone text-sm leading-relaxed mb-4">{step.desc}</p>
                  <ul className="space-y-1.5">
                    {step.notes.map((note) => (
                      <li key={note} className="text-mist text-xs flex items-start gap-2">
                        <span className="text-gold/60 flex-shrink-0 mt-0.5">•</span>
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-stone text-sm mb-6">流れを確認できたら、登録申請をお送りください。</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register" className="btn-primary">登録申請する（無料）</Link>
              <Link href="/contact" className="btn-secondary">ご不明点はお問い合わせ</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
