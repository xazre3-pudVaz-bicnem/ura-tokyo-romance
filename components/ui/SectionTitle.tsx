import { clsx } from 'clsx';

interface SectionTitleProps {
  en: string;
  ja: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionTitle({
  en,
  ja,
  description,
  align = 'center',
  className,
}: SectionTitleProps) {
  return (
    <div
      className={clsx(
        'mb-12 md:mb-16',
        align === 'center' && 'text-center',
        className
      )}
    >
      <p className="text-gold text-[10px] tracking-[0.3em] uppercase mb-3 font-sans">{en}</p>
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-cream tracking-wide mb-4">
        {ja}
      </h2>
      <span
        className={clsx(
          'block h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-5',
          align === 'center' ? 'mx-auto w-24' : 'w-24'
        )}
      />
      {description && (
        <p className="text-stone text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
