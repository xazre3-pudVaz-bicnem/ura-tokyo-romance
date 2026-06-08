'use client';

import { useEffect } from 'react';
import { X, MessageCircle, Phone, Mail, Calendar, MapPin, ExternalLink } from 'lucide-react';
import { SITE_CONTACT } from '@/lib/site-contact';

interface ContactContext {
  therapistName: string;
  dateLabel?: string;   // 例: "6月14日（日）"
  timeLabel?: string;   // 例: "12:00〜15:00"
  areaLabel?: string;   // 例: "六本木"
}

interface ContactMethodModalProps {
  context: ContactContext;
  onEmailForm: () => void;
  onClose: () => void;
}

export default function ContactMethodModal({
  context,
  onEmailForm,
  onClose,
}: ContactMethodModalProps) {
  // Trap body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleLine = () => {
    window.open(SITE_CONTACT.lineUrl, '_blank', 'noopener,noreferrer');
  };

  const handlePhone = () => {
    window.location.href = SITE_CONTACT.telHref;
  };

  const handleEmailForm = () => {
    onEmailForm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-base/90 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-surface border border-border md:rounded-sm modal-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <p className="text-gold text-[10px] tracking-widest mb-0.5">Contact Method</p>
            <h2 className="text-cream text-sm font-display">ご相談方法を選んでください</h2>
          </div>
          <button onClick={onClose} className="text-mist hover:text-stone transition-colors p-1">
            <X size={18} />
          </button>
        </div>

        {/* Context summary */}
        {(context.dateLabel || context.areaLabel) && (
          <div className="mx-5 mt-4 bg-elevated border border-border p-3.5 flex flex-wrap gap-x-4 gap-y-1.5">
            <div className="flex items-center gap-1.5">
              <MessageCircle size={12} className="text-gold/70" strokeWidth={1.5} />
              <span className="text-cream text-xs">{context.therapistName}</span>
            </div>
            {context.dateLabel && (
              <div className="flex items-center gap-1.5">
                <Calendar size={12} className="text-gold/70" strokeWidth={1.5} />
                <span className="text-stone text-xs">
                  {context.dateLabel}
                  {context.timeLabel && <span className="ml-1">{context.timeLabel}</span>}
                </span>
              </div>
            )}
            {context.areaLabel && (
              <div className="flex items-center gap-1.5">
                <MapPin size={12} className="text-gold/70" strokeWidth={1.5} />
                <span className="text-stone text-xs">{context.areaLabel}</span>
              </div>
            )}
          </div>
        )}

        {/* Options */}
        <div className="px-5 py-4 space-y-3">
          {/* ① LINE — Primary */}
          <button
            onClick={handleLine}
            className="w-full flex items-center gap-4 p-4 rounded-sm transition-all duration-200 group"
            style={{ background: '#06C755' }}
          >
            {/* LINE icon SVG */}
            <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 48 48" width="22" height="22" fill="white">
                <path d="M40 20.9C40 13.2 32.8 7 24 7S8 13.2 8 20.9c0 6.9 6.1 12.7 14.4 13.8.6.1 1.4.4 1.5.8.2.4.1.9 0 1.3l-.2 1.5c-.1.4-.3 1.5 1.3.8s8.6-5.1 11.7-8.7c2.2-2.3 3.3-4.7 3.3-7.5z"/>
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="text-white font-sans text-sm font-medium tracking-wide">
                LINEで相談する
              </p>
              <p className="text-white/80 text-[10px] mt-0.5 leading-snug">
                空き状況の確認や初めてのご相談は、公式LINEが最もスムーズです。
              </p>
            </div>
            <ExternalLink size={14} className="text-white/70 flex-shrink-0" />
          </button>

          {/* ② 電話 — Secondary */}
          <button
            onClick={handlePhone}
            className="w-full flex items-center gap-4 p-4 bg-sky-400/10 border border-sky-400/30 transition-all duration-200 hover:bg-sky-400/20 hover:border-sky-400/50 group"
          >
            <div className="flex-shrink-0 w-10 h-10 bg-sky-400/15 border border-sky-400/30 flex items-center justify-center">
              <Phone size={18} className="text-sky-300" strokeWidth={1.5} />
            </div>
            <div className="flex-1 text-left">
              <p className="text-cream text-sm font-sans tracking-wide">電話で相談する</p>
              <p className="text-stone/70 text-[10px] mt-0.5 leading-snug">
                お急ぎの場合や当日の空き状況確認はお電話でもご相談いただけます。
              </p>
              {/* Desktop: show number; Mobile: tap to call */}
              <p className="text-sky-300 text-[11px] mt-1 hidden md:block tracking-wider">
                {SITE_CONTACT.phoneNumber}
              </p>
              <p className="text-sky-300 text-[10px] mt-0.5 md:hidden">
                タップで発信
              </p>
            </div>
          </button>

          {/* ③ メールフォーム — Sub */}
          <button
            onClick={handleEmailForm}
            className="w-full flex items-center gap-4 p-4 border border-border text-stone hover:border-gold/30 hover:text-cream transition-all duration-200"
          >
            <div className="flex-shrink-0 w-10 h-10 bg-elevated border border-border flex items-center justify-center">
              <Mail size={16} className="text-mist" strokeWidth={1.5} />
            </div>
            <div className="flex-1 text-left">
              <p className="text-stone text-sm font-sans tracking-wide">メールフォームで相談する</p>
              <p className="text-mist text-[10px] mt-0.5 leading-snug">
                LINEや電話が難しい方は、フォームからもご相談いただけます。
              </p>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="px-5 pb-5">
          <p className="text-mist text-[10px] leading-relaxed text-center">
            当サービスは情報掲載とマッチングを提供します。18歳未満利用禁止。
          </p>
        </div>
      </div>
    </div>
  );
}
