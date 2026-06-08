import { Star } from 'lucide-react';
import type { Review } from '@/data/dummy-reviews';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="card-luxury p-6 md:p-8">
      {/* Stars */}
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < review.rating ? 'text-gold fill-gold' : 'text-border'}
          />
        ))}
        <span className="ml-2 text-stone text-xs">{review.rating}.0</span>
      </div>

      {/* Therapist used */}
      <p className="text-gold text-[10px] tracking-widest mb-3">{review.therapistName} 担当</p>

      {/* Review text */}
      <blockquote className="text-cream text-sm leading-relaxed mb-5 font-sans">
        &ldquo;{review.content}&rdquo;
      </blockquote>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <span className="text-stone text-xs">{review.author} 様</span>
        <span className="text-mist text-xs">{review.date}</span>
      </div>
    </div>
  );
}
