'use client';

import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { dummyTherapists } from '@/data/dummy-therapists';

const TABS = [
  { href: 'account', label: 'アカウント' },
  { href: 'profile', label: 'プロフィール' },
  { href: 'photos', label: '写真' },
  { href: 'schedule', label: '出勤' },
  { href: 'blog', label: 'ブログ' },
];

export default function TherapistDetailLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const params = useParams();
  const id = params.id as string;
  const therapist = dummyTherapists.find((t) => t.slug === id);

  return (
    <div>
      {/* Back + therapist header */}
      <div className="flex items-center gap-3 mb-5">
        <Link href="/admin-dashboard/therapists" className="text-mist hover:text-stone transition-colors">
          <ArrowLeft size={16} />
        </Link>
        <div className="flex items-center gap-3">
          {therapist?.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={therapist.image}
              alt={therapist.name}
              className="w-10 h-14 object-cover object-top"
            />
          )}
          <div>
            <h1 className="font-display text-xl text-cream">
              {therapist?.name || id}
            </h1>
            <p className="text-mist text-xs">
              {therapist ? `${therapist.age}歳 / ${therapist.areas.slice(0, 2).join('・')}` : 'セラピスト詳細'}
            </p>
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="flex border-b border-border mb-6 overflow-x-auto">
        {TABS.map((tab) => {
          const href = `/admin-dashboard/therapists/${id}/${tab.href}`;
          const active = pathname === href || pathname.startsWith(href);
          return (
            <Link
              key={tab.href}
              href={href}
              className={`px-5 py-2.5 text-xs whitespace-nowrap transition-colors border-b-2 -mb-px ${
                active
                  ? 'border-gold text-gold'
                  : 'border-transparent text-stone hover:text-cream'
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {children}
    </div>
  );
}
