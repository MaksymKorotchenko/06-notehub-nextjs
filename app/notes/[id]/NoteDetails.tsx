'use client';

import { fetchNoteById } from '@/lib/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import css from './NoteDetails.module.css';

export default function NoteAboutClient() {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.container}>
      {isLoading && <p>Loading, please wait...</p>}
      {error && !note && <p>Something went wrong.</p>}
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note?.title}</h2>
        </div>
        <p className={css.content}>{note?.content}</p>
        <p className={css.date}>{note?.createdAt}</p>
      </div>
    </div>
  );
}
