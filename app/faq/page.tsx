'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import { faqData, faqCategories } from '@/data/faq-data';

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('すべて');

  const filtered = activeCategory === 'すべて'
    ? faqData
    : faqData.filter((f) => f.category === activeCategory);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="pt-32 pb-20 px-5 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold text-[10px] tracking-[0.3em] mb-4">FAQ</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-5 tracking-wide">よくある質問</h1>
          <span className="block w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-stone leading-relaxed">
            初めてご利用の方が特に多くお寄せいただくご質問をまとめました。
          </p>
        </div>
      </section>

      <section className="section-py px-5">
        <div className="max-w-3xl mx-auto">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            <button
              onClick={() => setActiveCategory('すべて')}
              className={`px-4 py-2 text-[10px] tracking-widest border transition-all ${activeCategory === 'すべて' ? 'border-gold text-gold' : 'border-border text-stone'}`}
            >
              すべて
            </button>
            {faqCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-[10px] tracking-widest border transition-all ${activeCategory === cat ? 'border-gold text-gold' : 'border-border text-stone'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-0 mb-12">
            {filtered.map((faq, i) => (
              <div key={`${activeCategory}-${i}`} className="border-b border-border">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-start justify-between gap-4 py-5 text-left group"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-gold text-sm font-display flex-shrink-0 mt-0.5">Q</span>
                    <div>
                      <span className="text-mist text-[10px] tracking-widest block mb-1">{faq.category}</span>
                      <span className="text-cream text-sm leading-relaxed group-hover:text-gold transition-colors">
                        {faq.question}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`flex-shrink-0 text-stone mt-1 transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-gold' : ''}`}
                  />
                </button>
                {openIndex === i && (
                  <div className="pb-5 pl-9">
                    <div className="flex items-start gap-3">
                      <span className="text-gold text-sm font-display flex-shrink-0">A</span>
                      <p className="text-stone text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center p-8 bg-surface border border-border">
            <p className="text-stone text-sm mb-4">ご質問が解決しない場合はお問い合わせフォームからご連絡ください。</p>
            <Link href="/contact" className="btn-primary inline-flex">
              お問い合わせはこちら
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
