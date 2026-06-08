'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { isFavorited, toggleFavorite } from '@/lib/favorites';

interface FavoriteButtonProps {
  slug: string;
  name: string;
  className?: string;
  size?: 'sm' | 'md';
}

export default function FavoriteButton({ slug, name, className = '', size = 'md' }: FavoriteButtonProps) {
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    setFavorited(isFavorited(slug));
    const handler = () => setFavorited(isFavorited(slug));
    window.addEventListener('favoritesUpdate', handler);
    return () => window.removeEventListener('favoritesUpdate', handler);
  }, [slug]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(slug);
    setFavorited(isFavorited(slug));
  };

  const iconSize = size === 'sm' ? 14 : 18;
  const padding = size === 'sm' ? 'p-1.5' : 'p-2.5';

  return (
    <button
      onClick={handleClick}
      aria-label={favorited ? `${name}をお気に入りから削除` : `${name}をお気に入りに追加`}
      className={`${padding} rounded-full transition-all duration-200 ${
        favorited
          ? 'bg-wine/20 text-wine border border-wine/40 hover:bg-wine/30'
          : 'bg-base/80 backdrop-blur-sm text-stone border border-border/60 hover:border-wine/40 hover:text-wine'
      } ${className}`}
    >
      <Heart
        size={iconSize}
        strokeWidth={1.5}
        className={favorited ? 'fill-wine' : ''}
      />
    </button>
  );
}
