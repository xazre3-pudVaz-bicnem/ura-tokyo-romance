'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { CheckCircle, XCircle, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { dummyTherapists } from '@/data/dummy-therapists';

type PhotoStatus = 'approved' | 'pending' | 'rejected';

interface Photo {
  id: string;
  type: 'main' | 'sub' | 'card' | 'blog';
  src: string;
  status: PhotoStatus;
  isPublic: boolean;
}

export default function TherapistAdminPhotosPage() {
  const params = useParams();
  const id = params.id as string;
  const therapist = dummyTherapists.find((t) => t.slug === id);

  const [photos, setPhotos] = useState<Photo[]>(
    therapist?.image
      ? [
          { id: 'p1', type: 'main', src: therapist.image, status: 'approved', isPublic: true },
          { id: 'p2', type: 'card', src: therapist.image, status: 'pending', isPublic: false },
          { id: 'p3', type: 'sub', src: therapist.image, status: 'pending', isPublic: false },
        ]
      : []
  );

  const approve = (pid: string) =>
    setPhotos((prev) => prev.map((p) => p.id === pid ? { ...p, status: 'approved', isPublic: true } : p));
  const reject = (pid: string) =>
    setPhotos((prev) => prev.map((p) => p.id === pid ? { ...p, status: 'rejected' } : p));
  const togglePublic = (pid: string) =>
    setPhotos((prev) => prev.map((p) => p.id === pid ? { ...p, isPublic: !p.isPublic } : p));

  const STATUS_COLOR: Record<PhotoStatus, string> = {
    approved: 'text-emerald-400',
    pending: 'text-amber-400',
    rejected: 'text-wine',
  };

  const STATUS_LABELS: Record<PhotoStatus, string> = {
    approved: '承認済み',
    pending: '確認待ち',
    rejected: '差し戻し',
  };

  const TYPE_LABELS: Record<string, string> = {
    main: 'メイン写真',
    sub: 'サブ写真',
    card: 'カード写真',
    blog: 'ブログ写真',
  };

  if (!therapist) return <p className="text-stone text-sm">セラピストが見つかりません。</p>;

  return (
    <div className="space-y-5">
      <p className="text-mist text-xs">写真の確認・承認・差し戻しを行います。承認された写真のみ公開されます。</p>

      {photos.length === 0 ? (
        <div className="bg-surface border border-border p-10 text-center">
          <AlertCircle size={24} className="text-mist mx-auto mb-3" strokeWidth={1} />
          <p className="text-stone text-sm">写真がまだ登録されていません</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="bg-surface border border-border overflow-hidden">
              <div className="flex gap-0">
                <div className="w-28 aspect-[3/4] flex-shrink-0 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo.src} alt="therapist photo" className="w-full h-full object-cover object-top" />
                </div>
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <p className="text-stone text-[10px] mb-1">{TYPE_LABELS[photo.type]}</p>
                    <div className={`flex items-center gap-1.5 text-xs mb-3 ${STATUS_COLOR[photo.status]}`}>
                      {photo.status === 'approved' ? <CheckCircle size={12} /> :
                       photo.status === 'rejected' ? <XCircle size={12} /> :
                       <AlertCircle size={12} />}
                      {STATUS_LABELS[photo.status]}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-mist">
                      {photo.isPublic ? <Eye size={12} /> : <EyeOff size={12} />}
                      {photo.isPublic ? '公開中' : '非公開'}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {photo.status !== 'approved' && (
                      <button
                        onClick={() => approve(photo.id)}
                        className="text-[10px] border border-emerald-400/30 text-emerald-400 px-2.5 py-1 hover:bg-emerald-400/10 transition-colors"
                      >
                        承認
                      </button>
                    )}
                    {photo.status !== 'rejected' && (
                      <button
                        onClick={() => reject(photo.id)}
                        className="text-[10px] border border-wine/30 text-wine px-2.5 py-1 hover:bg-wine/10 transition-colors"
                      >
                        差し戻し
                      </button>
                    )}
                    <button
                      onClick={() => togglePublic(photo.id)}
                      className="text-[10px] border border-border text-stone px-2.5 py-1 hover:bg-elevated transition-colors"
                    >
                      {photo.isPublic ? '非公開に' : '公開に'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="bg-surface border border-border p-5">
        <p className="text-gold text-[10px] tracking-widest mb-3">写真ステータス集計</p>
        <div className="flex gap-5 text-sm">
          <div>
            <span className="text-emerald-400">{photos.filter(p => p.status === 'approved').length}</span>
            <span className="text-mist text-xs ml-1">承認済み</span>
          </div>
          <div>
            <span className="text-amber-400">{photos.filter(p => p.status === 'pending').length}</span>
            <span className="text-mist text-xs ml-1">確認待ち</span>
          </div>
          <div>
            <span className="text-wine">{photos.filter(p => p.status === 'rejected').length}</span>
            <span className="text-mist text-xs ml-1">差し戻し</span>
          </div>
        </div>
      </div>
    </div>
  );
}
