'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Sparkles, RotateCcw } from 'lucide-react';
import { dummyTherapists } from '@/data/dummy-therapists';
import type { Therapist } from '@/data/dummy-therapists';
import TherapistCard from '@/components/ui/TherapistCard';

interface Question {
  id: string;
  text: string;
  options: { label: string; value: string; tags?: string[] }[];
}

const questions: Question[] = [
  {
    id: 'purpose',
    text: '今日の目的を教えてください',
    options: [
      { label: '話を聞いてほしい', value: 'talk', tags: ['聞き上手', '傾聴力高め', '会話重視'] },
      { label: 'ただそばにいてほしい', value: 'presence', tags: ['癒し系', '穏やかな雰囲気'] },
      { label: '楽しい時間を過ごしたい', value: 'fun', tags: ['明るい雰囲気', '会話重視'] },
      { label: '一緒に食事・外出したい', value: 'date', tags: ['外出同行対応'] },
    ],
  },
  {
    id: 'mood',
    text: '今のあなたの気分は？',
    options: [
      { label: 'ゆっくり落ち着きたい', value: 'calm', tags: ['落ち着いた雰囲気', '穏やかな雰囲気'] },
      { label: '元気になりたい', value: 'energize', tags: ['明るい雰囲気', '元気系'] },
      { label: '大人っぽい時間がほしい', value: 'mature', tags: ['大人の余裕', '紳士的'] },
      { label: '気を遣いたくない', value: 'relax', tags: ['癒し系', '初めての方におすすめ'] },
    ],
  },
  {
    id: 'experience',
    text: '女風の利用経験はありますか？',
    options: [
      { label: '初めてです', value: 'first', tags: ['初めての方におすすめ', '初心者対応可'] },
      { label: '数回あります', value: 'some', tags: [] },
      { label: '定期的に使っています', value: 'regular', tags: [] },
      { label: '答えたくない', value: 'skip', tags: [] },
    ],
  },
  {
    id: 'age_pref',
    text: '希望するセラピストの年齢層は？',
    options: [
      { label: '20代前半（21〜24歳）', value: 'young', ages: [21, 22, 23, 24] },
      { label: '20代後半（25〜29歳）', value: 'mid20', ages: [25, 26, 27, 28, 29] },
      { label: '30代以上', value: 'over30', ages: [30, 31, 32, 33, 34, 35] },
      { label: 'こだわらない', value: 'any', ages: [] },
    ] as { label: string; value: string; ages?: number[] }[],
  },
  {
    id: 'area',
    text: '希望のエリアは？',
    options: [
      { label: '渋谷・恵比寿・代官山', value: 'shibuya', tags: ['渋谷', '恵比寿', '代官山'] },
      { label: '新宿・池袋', value: 'shinjuku', tags: ['新宿', '池袋', '高田馬場'] },
      { label: '銀座・六本木・表参道', value: 'ginza', tags: ['銀座', '六本木', '表参道'] },
      { label: 'こだわらない', value: 'any', tags: [] },
    ],
  },
];

interface Answer {
  questionId: string;
  value: string;
  tags?: string[];
  ages?: number[];
}

function calcResults(answers: Answer[]): Therapist[] {
  const tagScores: Record<string, number> = {};
  const areaKeywords: string[] = [];
  let ageFilter: number[] = [];

  for (const ans of answers) {
    if (ans.tags && ans.tags.length > 0) {
      for (const tag of ans.tags) {
        tagScores[tag] = (tagScores[tag] || 0) + 3;
      }
    }
    if (ans.questionId === 'area' && ans.tags && ans.tags.length > 0 && ans.value !== 'any') {
      areaKeywords.push(...ans.tags);
    }
    if (ans.questionId === 'age_pref' && ans.ages && ans.ages.length > 0) {
      ageFilter = ans.ages;
    }
  }

  const scored = dummyTherapists.map((t) => {
    let score = 0;
    for (const tag of t.tags) {
      if (tagScores[tag]) score += tagScores[tag];
    }
    if (ageFilter.length > 0 && ageFilter.includes(t.age)) score += 5;
    if (areaKeywords.length > 0) {
      const areaMatch = t.areas.some((a) => areaKeywords.some((k) => a.includes(k)));
      if (areaMatch) score += 4;
    }
    if (t.verifiedId) score += 2;
    score += t.rankScore / 20;
    return { therapist: t, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((s) => s.therapist);
}

export default function DiagnosisPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [results, setResults] = useState<Therapist[] | null>(null);

  const currentQuestion = questions[step];
  const progress = ((step) / questions.length) * 100;

  function handleAnswer(option: { label: string; value: string; tags?: string[]; ages?: number[] }) {
    const newAnswers = [
      ...answers.filter((a) => a.questionId !== currentQuestion.id),
      { questionId: currentQuestion.id, value: option.value, tags: option.tags, ages: option.ages },
    ];
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setResults(calcResults(newAnswers));
    }
  }

  function reset() {
    setStep(0);
    setAnswers([]);
    setResults(null);
  }

  if (results) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-12 h-12 border border-gold flex items-center justify-center mx-auto mb-4">
              <Sparkles size={20} className="text-gold" strokeWidth={1.5} />
            </div>
            <p className="text-gold text-[10px] tracking-[0.3em] mb-3">Result</p>
            <h1 className="font-display text-3xl md:text-4xl text-cream mb-3">
              あなたにおすすめのセラピスト
            </h1>
            <p className="text-stone text-sm">
              回答をもとに、最もマッチしそうなセラピストを3名選びました。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {results.map((t, i) => (
              <div key={t.id} className="relative">
                {i === 0 && (
                  <div className="absolute -top-3 left-0 right-0 flex justify-center z-10">
                    <span className="bg-gold text-base text-[9px] tracking-widest px-4 py-1">BEST MATCH</span>
                  </div>
                )}
                <TherapistCard therapist={t} rank={i + 1} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-stone text-sm mb-6">
              他にも気になるセラピストがいれば、一覧から探してみてください。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={reset} className="btn-secondary flex items-center gap-2">
                <RotateCcw size={14} />
                もう一度診断する
              </button>
              <Link href="/therapists" className="btn-primary">全セラピストを見る</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-5">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-gold text-[10px] tracking-[0.3em] mb-3">Diagnosis</p>
          <h1 className="font-display text-4xl text-cream mb-3">セラピスト診断</h1>
          <span className="block w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-4" />
          <p className="text-stone text-sm">
            いくつかの質問に答えるだけで、あなたにぴったりのセラピストを診断します。
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-mist text-[10px] tracking-widest">
              質問 {step + 1} / {questions.length}
            </span>
            <span className="text-mist text-[10px]">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-px bg-border">
            <div
              className="h-px bg-gold transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="card-luxury p-8 mb-6">
          <h2 className="font-display text-2xl text-cream mb-8 text-center">
            {currentQuestion.text}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQuestion.options.map((option) => {
              const selected = answers.find((a) => a.questionId === currentQuestion.id)?.value === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option as { label: string; value: string; tags?: string[]; ages?: number[] })}
                  className={`p-4 border text-left transition-all duration-200 group ${
                    selected
                      ? 'border-gold bg-gold/10 text-cream'
                      : 'border-border text-stone hover:border-gold/50 hover:text-cream hover:bg-elevated'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{option.label}</span>
                    <ArrowRight size={14} className="text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Back button */}
        {step > 0 && (
          <div className="text-center">
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 text-stone text-xs hover:text-cream transition-colors mx-auto"
            >
              <ArrowLeft size={14} />
              前の質問に戻る
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
