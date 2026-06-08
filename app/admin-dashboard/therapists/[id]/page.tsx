import { redirect } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TherapistDetailRoot({ params }: PageProps) {
  const { id } = await params;
  redirect(`/admin-dashboard/therapists/${id}/account`);
}
