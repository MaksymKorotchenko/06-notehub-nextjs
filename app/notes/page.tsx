import { fetchNotes } from '@/lib/api';
import Notes from './Notes.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

export default async function App() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['tasks', { search: '', page: 1, perPage: 12 }],
    queryFn: () => fetchNotes('', 1, 12),
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Notes />
      </HydrationBoundary>
    </div>
  );
}
