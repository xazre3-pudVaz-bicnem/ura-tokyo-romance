'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import { faqData } from '@/data/faq-data';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const topFaqs = faqData.slice(0, 6);

  return (
    <section className="section-py px-5">
      <div className="max-w-3xl mx-auto">
        <SectionTitle
          en="FAQ"
          ja="よくある質問"
          description="初めての方からよくいただくご質問にお答えします。"
        />

        <div className="space-y-0">
          {topFaqs.map((faq, i) => (
            <div key={i} className="border-b border-border">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-start justify-between gap-4 py-5 text-left group"
              >
                <div className="flex items-start gap-4">
                  <span className="text-gold text-sm font-display flex-shrink-0 mt-0.5">Q</span>
                  <span className="text-cream text-sm leading-relaxed group-hover:text-gold transition-colors duration-200">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  size={16}
                  className={`flex-shrink-0 text-stone transition-transform duration-300 mt-0.5 ${
                    openIndex === i ? 'rotate-180 text-gold' : ''
                  }`}
                />
              </button>

              {openIndex === i && (
                <div className="pb-5 pl-8">
                  <p className="text-stone text-sm leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/faq" className="btn-secondary inline-flex">
            すべてのFAQを見る
          </Link>
        </div>
      </div>
    </section>
  );
}
