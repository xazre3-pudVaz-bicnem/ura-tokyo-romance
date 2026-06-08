'use client';

import { useState, useEffect } from 'react';
import { BarChart2 } from 'lucide-react';
import { isInCompare, toggleCompare } from '@/lib/compare';

interface CompareButtonProps {
  slug: string;
  name: string;
  className?: string;
  size?: 'sm' | 'md';
}

export default function CompareButton({ slug, name, className = '', size = 'md' }: CompareButtonProps) {
  const [inCompare, setInCompare] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);

  useEffect(() => {
    setInCompare(isInCompare(slug));
    const handler = () => setInCompare(isInCompare(slug));
    window.addEventListener('compareUpdate', handler);
    return () => window.removeEventListener('compareUpdate', handler);
  }, [slug]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const result = toggleCompare(slug);
    setInCompare(isInCompare(slug));
    if (!result.added && result.reason === 'max_reached') {
      setFlash('比較は最大3名まで');
      setTimeout(() => setFlash(null), 2000);
    }
  };

  const iconSize = size === 'sm' ? 14 : 18;
  const padding = size === 'sm' ? 'p-1.5' : 'p-2.5';

  return (
    <div className="relative">
      {flash && (
        <div className="absolute bottom-full mb-1 right-0 bg-wine text-cream text-[10px] px-2 py-1 whitespace-nowrap z-10">
          {flash}
        </div>
      )}
      <button
        onClick={handleClick}
        aria-label={inCompare ? `${name}を比較から削除` : `${name}を比較に追加`}
        className={`${padding} rounded-full transition-all duration-200 ${
          inCompare
            ? 'bg-gold/20 text-gold border border-gold/40 hover:bg-gold/30'
            : 'bg-base/80 backdrop-blur-sm text-stone border border-border/60 hover:border-gold/40 hover:text-gold'
        } ${className}`}
      >
        <BarChart2
          size={iconSize}
          strokeWidth={1.5}
        />
      </button>
    </div>
  );
}
