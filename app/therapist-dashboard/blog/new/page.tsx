'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Send, Image, HelpCircle, ChevronDown, Sparkles, Loader2 } from 'lucide-react';
import { BLOG_CATEGORIES, BLOG_TAGS } from '@/data/staff-blog';

const AREAS = ['渋谷', '新宿', '池袋', '銀座', '六本木', '上野', '品川', '恵比寿', '中目黒', '吉祥寺', '立川', '吉祥寺'];

function DiscoverabilityScore({ title, description, keywords, content }: {
  title: string;
  description: string;
  keywords: string[];
  content: string;
}) {
  const score = useMemo(() => {
    let s = 0;
    if (title.length >= 10) s += 25;
    else if (title.length > 0) s += 10;
    if (description.length >= 50) s += 25;
    else if (description.length > 0) s += 10;
    if (keywords.length >= 2) s += 25;
    else if (keywords.length === 1) s += 10;
    if (content.length >= 200) s += 25;
    else if (content.length >= 50) s += 10;
    return s;
  }, [title, description, keywords, content]);

  const level = score >= 80 ? '高い' : score >= 50 ? '普通' : '低い';
  const color = score >= 80 ? 'text-emerald-400' : score >= 50 ? 'text-amber-400' : 'text-wine';
  const barColor = score >= 80 ? 'bg-emerald-400' : score >= 50 ? 'bg-amber-400' : 'bg-wine';

  return (
    <div className="card-luxury p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-gold text-[10px] tracking-widest">見つかりやすさスコア</p>
        <div className={`text-sm font-display ${color}`}>{score}点 / 100点</div>
      </div>
      <div className="w-full h-2 bg-elevated rounded-full mb-3 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <p className="text-stone text-xs mb-3">
        見つかりやすさ: <span className={color}>{level}</span>
      </p>
      <div className="space-y-2">
        {[
          { label: '検索で表示されるタイトル', done: title.length >= 10, hint: '10文字以上入力してください' },
          { label: '検索結果用の説明文', done: description.length >= 50, hint: '50文字以上入力してください' },
          { label: '見つけてもらいたい言葉', done: keywords.length >= 2, hint: '2つ以上入力してください' },
          { label: '記事の本文', done: content.length >= 200, hint: '200文字以上書いてください' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={`w-4 h-4 flex-shrink-0 border flex items-center justify-center ${
              item.done ? 'border-emerald-400 bg-emerald-400/10' : 'border-border'
            }`}>
              {item.done && <span className="text-emerald-400 text-[10px]">✓</span>}
            </div>
            <div>
              <span className={`text-xs ${item.done ? 'text-stone' : 'text-mist'}`}>{item.label}</span>
              {!item.done && <p className="text-[9px] text-mist">{item.hint}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BlogNewPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [keywordInput, setKeywordInput] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [showSeoSection, setShowSeoSection] = useState(false);
  const [saved, setSaved] = useState<'draft' | 'submitted' | null>(null);
  const [aiTheme, setAiTheme] = useState('');
  const [aiArea, setAiArea] = useState('');
  const [aiAudience, setAiAudience] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiResult, setAiResult] = useState<{ title: string; headings: string[]; draft: string } | null>(null);

  const toggleTag = (tag: string) =>
    setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
  const toggleArea = (area: string) =>
    setSelectedAreas((prev) => prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]);

  const addKeyword = () => {
    const kw = keywordInput.trim();
    if (kw && !keywords.includes(kw)) {
      setKeywords((prev) => [...prev, kw]);
      setKeywordInput('');
    }
  };

  const generateAiBlog = () => {
    if (!aiTheme) return;
    setAiGenerating(true);
    setAiResult(null);
    setTimeout(() => {
      setAiGenerating(false);
      const area = aiArea || '渋谷';
      const theme = aiTheme;
      setAiResult({
        title: `${area}で感じる${theme}｜セラピストのリアルな日常`,
        headings: [
          `${area}で${theme}を体験して思ったこと`,
          '癒しの時間とは何か、私なりの考え',
          `${aiAudience || '初めての方'}へ伝えたいこと`,
          'お会いできることを楽しみにしています',
        ],
        draft: `最近、${area}で${theme}を体験する機会がありました。\n\n日常の忙しさから少し離れて、ゆっくりとした時間を過ごすことで、気持ちがふっと軽くなるような感覚がありました。\n\n${aiAudience || '初めての方'}も、緊張せずにお声がけください。お話することが好きなので、最初は雑談からでも大丈夫です。\n\n${area}エリアでお会いできることを楽しみにしております。`,
      });
    }, 1800);
  };

  const applyAiDraft = () => {
    if (!aiResult) return;
    setTitle(aiResult.title);
    setContent(aiResult.draft);
    setAiResult(null);
  };

  const handleSave = (mode: 'draft' | 'submitted') => {
    setSaved(mode);
    setTimeout(() => setSaved(null), 3000);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/therapist-dashboard/blog" className="text-mist hover:text-stone transition-colors">
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h2 className="font-display text-2xl text-cream">新しい記事を書く</h2>
          <p className="text-mist text-xs mt-0.5">書き終えたら「確認のために提出する」を押してください</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main editor */}
        <div className="flex-1 space-y-5">
          {/* Title */}
          <div className="card-luxury p-5">
            <label className="block text-mist text-[10px] tracking-widest mb-2">タイトル<span className="text-wine ml-1">*</span></label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例：渋谷での出勤が始まります"
              className="w-full bg-elevated border border-border text-cream px-4 py-3 text-sm outline-none focus:border-gold/50"
            />
          </div>

          {/* Content */}
          <div className="card-luxury p-5">
            <label className="block text-mist text-[10px] tracking-widest mb-2">本文<span className="text-wine ml-1">*</span></label>
            <textarea
              rows={12}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="あなたの日常、思い、活動情報などを自由に書いてください。"
              className="w-full bg-elevated border border-border text-cream px-4 py-3 text-sm outline-none focus:border-gold/50 resize-none placeholder:text-mist leading-relaxed"
            />
            <p className="text-mist text-[10px] mt-1">{content.length}文字（200文字以上推奨）</p>
          </div>

          {/* Excerpt */}
          <div className="card-luxury p-5">
            <label className="block text-mist text-[10px] tracking-widest mb-2">
              一覧に表示するひとこと紹介（任意）
            </label>
            <textarea
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="記事のポイントを2〜3文で説明してください"
              className="w-full bg-elevated border border-border text-cream px-4 py-3 text-sm outline-none focus:border-gold/50 resize-none placeholder:text-mist"
            />
          </div>

          {/* Photo */}
          <div className="card-luxury p-5">
            <p className="text-mist text-[10px] tracking-widest mb-3">記事の写真（任意）</p>
            <div className="border border-dashed border-border flex flex-col items-center justify-center py-8 gap-2 cursor-pointer hover:border-gold/30 transition-colors">
              <Image size={20} className="text-mist" strokeWidth={1.5} />
              <p className="text-mist text-xs">クリックして写真をアップロード</p>
              <p className="text-mist text-[9px]">（グランドオープン後に利用可能）</p>
            </div>
          </div>

          {/* Category & Tags */}
          <div className="card-luxury p-5">
            <p className="text-mist text-[10px] tracking-widest mb-4">カテゴリ・タグ</p>
            <div className="mb-4">
              <label className="block text-stone text-xs mb-2">カテゴリ</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-elevated border border-border text-cream text-sm px-3 py-2 outline-none focus:border-gold/50"
              >
                <option value="">選択してください</option>
                {BLOG_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-stone text-xs mb-2">タグ（複数選択可）</label>
              <div className="flex flex-wrap gap-1.5">
                {BLOG_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`text-[10px] px-2.5 py-1 border transition-all ${
                      selectedTags.includes(tag)
                        ? 'border-gold text-gold bg-gold/10'
                        : 'border-border text-mist hover:border-gold/30 hover:text-stone'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-stone text-xs mb-2">活動エリア（複数選択可）</label>
              <div className="flex flex-wrap gap-1.5">
                {AREAS.map((area) => (
                  <button
                    key={area}
                    onClick={() => toggleArea(area)}
                    className={`text-[10px] px-2.5 py-1 border transition-all ${
                      selectedAreas.includes(area)
                        ? 'border-gold text-gold bg-gold/10'
                        : 'border-border text-mist hover:border-gold/30 hover:text-stone'
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SEO section — using friendly language */}
          <div className="card-luxury overflow-hidden">
            <button
              onClick={() => setShowSeoSection(!showSeoSection)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <div>
                <p className="text-gold text-[10px] tracking-widest">もっと見つかりやすくする（任意）</p>
                <p className="text-stone text-xs mt-0.5">入力すると、検索からあなたを見つけやすくなります</p>
              </div>
              <ChevronDown size={14} className={`text-mist transition-transform ${showSeoSection ? 'rotate-180' : ''}`} />
            </button>

            {showSeoSection && (
              <div className="border-t border-border p-5 space-y-4">
                <div>
                  <label className="block text-stone text-xs mb-2">
                    検索で表示されるタイトル
                    <span className="text-mist ml-2 text-[10px]">（タイトルと別にできます）</span>
                  </label>
                  <input
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder="例：渋谷で今日会える女風セラピスト｜律のブログ"
                    className="w-full bg-elevated border border-border text-cream px-4 py-2.5 text-sm outline-none focus:border-gold/50"
                  />
                  <p className="text-mist text-[10px] mt-1">{seoTitle.length} / 60文字推奨</p>
                </div>

                <div>
                  <label className="block text-stone text-xs mb-2">
                    検索結果用の説明文
                    <span className="text-mist ml-2 text-[10px]">（検索画面に表示されるひとこと）</span>
                  </label>
                  <textarea
                    rows={2}
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    placeholder="例：渋谷・新宿エリアで活動中のセラピスト・律の出勤情報ブログ。初めての方も安心してご相談ください。"
                    className="w-full bg-elevated border border-border text-cream px-4 py-2.5 text-sm outline-none focus:border-gold/50 resize-none placeholder:text-mist"
                  />
                  <p className="text-mist text-[10px] mt-1">{seoDescription.length} / 120文字推奨</p>
                </div>

                <div>
                  <label className="block text-stone text-xs mb-2">
                    見つけてもらいたい言葉
                    <span className="text-mist ml-2 text-[10px]">（検索されそうな言葉を追加）</span>
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addKeyword()}
                      placeholder="例：女風 渋谷"
                      className="flex-1 bg-elevated border border-border text-cream px-3 py-2 text-sm outline-none focus:border-gold/50"
                    />
                    <button
                      onClick={addKeyword}
                      className="border border-border text-stone text-xs px-3 hover:border-gold/30 hover:text-cream transition-colors"
                    >
                      追加
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {keywords.map((kw) => (
                      <span
                        key={kw}
                        className="text-[10px] border border-gold/30 text-gold px-2 py-0.5 flex items-center gap-1 cursor-pointer"
                        onClick={() => setKeywords((prev) => prev.filter((k) => k !== kw))}
                      >
                        {kw} ×
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-elevated/50 p-3 flex items-start gap-2">
                  <HelpCircle size={13} className="text-gold flex-shrink-0 mt-0.5" />
                  <p className="text-stone text-[10px] leading-relaxed">
                    「女風 渋谷」「セラピスト 癒し」などの言葉を入力すると、検索結果に表示されやすくなります。
                    あなたのエリアや特徴に合わせて入力しましょう。
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Submit buttons */}
          {saved && (
            <div className={`p-4 border text-sm ${
              saved === 'draft' ? 'border-stone/30 text-stone bg-stone/5' : 'border-emerald-400/30 text-emerald-400 bg-emerald-400/5'
            }`}>
              {saved === 'draft' ? '下書きとして保存しました' : '運営に確認のために提出しました。承認をお待ちください。'}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => handleSave('submitted')}
              className="btn-primary flex items-center gap-2 flex-1 justify-center"
            >
              <Send size={13} />
              確認のために提出する
            </button>
            <button
              onClick={() => handleSave('draft')}
              className="btn-secondary flex items-center gap-2 px-6"
            >
              <Save size={13} />
              下書き保存
            </button>
          </div>
        </div>

        {/* Sidebar: score + tips */}
        <div className="lg:w-64 space-y-4">
          <DiscoverabilityScore
            title={seoTitle || title}
            description={seoDescription}
            keywords={keywords}
            content={content}
          />

          {/* AI blog assist */}
          <div className="card-luxury border border-gold/20">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-border/50">
              <Sparkles size={14} className="text-gold" strokeWidth={1.5} />
              <p className="text-gold text-[10px] tracking-widest">AIブログ補助</p>
            </div>
            <div className="p-5 space-y-3">
              <p className="text-mist text-[10px]">テーマ・エリア・読み手を入力すると、タイトル案・見出し・下書きを生成します</p>
              <div>
                <label className="block text-mist text-[10px] mb-1.5">テーマ<span className="text-wine ml-1">*</span></label>
                <input
                  value={aiTheme}
                  onChange={(e) => setAiTheme(e.target.value)}
                  placeholder="例：癒し、出勤情報、日常"
                  className="w-full bg-elevated border border-border text-cream text-xs px-3 py-2 outline-none focus:border-gold/50"
                />
              </div>
              <div>
                <label className="block text-mist text-[10px] mb-1.5">エリア</label>
                <input
                  value={aiArea}
                  onChange={(e) => setAiArea(e.target.value)}
                  placeholder="例：渋谷、新宿"
                  className="w-full bg-elevated border border-border text-cream text-xs px-3 py-2 outline-none focus:border-gold/50"
                />
              </div>
              <div>
                <label className="block text-mist text-[10px] mb-1.5">読んでほしい方</label>
                <input
                  value={aiAudience}
                  onChange={(e) => setAiAudience(e.target.value)}
                  placeholder="例：初めての方、リピーターの方"
                  className="w-full bg-elevated border border-border text-cream text-xs px-3 py-2 outline-none focus:border-gold/50"
                />
              </div>
              <button
                onClick={generateAiBlog}
                disabled={!aiTheme || aiGenerating}
                className="w-full flex items-center justify-center gap-2 border border-gold/30 text-gold text-xs py-2.5 hover:bg-gold/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {aiGenerating ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={13} />}
                {aiGenerating ? '生成中...' : '下書きを生成する'}
              </button>

              {aiResult && (
                <div className="space-y-3 border-t border-border pt-3 mt-3">
                  <div>
                    <p className="text-mist text-[10px] mb-1">タイトル案</p>
                    <p className="text-cream text-xs bg-elevated px-3 py-2">{aiResult.title}</p>
                  </div>
                  <div>
                    <p className="text-mist text-[10px] mb-1">見出し案</p>
                    <ul className="space-y-1">
                      {aiResult.headings.map((h, i) => (
                        <li key={i} className="text-stone text-[10px] flex items-start gap-1.5">
                          <span className="text-gold">H{i + 2}.</span>{h}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={applyAiDraft}
                    className="w-full text-emerald-400 border border-emerald-400/30 text-xs py-2 hover:bg-emerald-400/10 transition-colors"
                  >
                    この下書きを使う
                  </button>
                  <p className="text-mist text-[9px]">適用後、自由に編集できます</p>
                </div>
              )}
            </div>
          </div>

          <div className="card-luxury p-5">
            <p className="text-gold text-[10px] tracking-widest mb-3">投稿のヒント</p>
            <ul className="space-y-2">
              {[
                '出勤情報は具体的な日時とエリアを書く',
                '初めての方への気持ちや雰囲気を伝える',
                '自分の得意なことや個性を書く',
                '1記事200文字以上を目安に',
                'エリア名を含めると検索されやすい',
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-2 text-stone text-[10px]">
                  <span className="text-gold flex-shrink-0 mt-0.5">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
