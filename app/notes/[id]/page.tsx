import { fetchNoteById } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NoteAboutClient from './NoteDetails.client';

type NoteAboutProps = {
  params: Promise<{ id: string }>;
};

export default async function NoteAbout({ params }: NoteAboutProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteAboutClient />
      </HydrationBoundary>
    </div>
  );
}
