'use client';

import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { useState } from 'react';
import { fetchNotes } from '@/lib/api';
import { useDebouncedCallback } from 'use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import css from './NotesPage.module.css';

export default function Notes() {
  const [searchNote, setSearchNote] = useState('');
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const debouncedSearchNote = useDebouncedCallback((value: string) => {
    setSearchNote(value);
    setPage(1);
  }, 1000);

  const { data, isSuccess } = useQuery({
    queryKey: ['notes', searchNote, page],
    queryFn: () => fetchNotes(searchNote, page, 12),
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  function handleOpenModal() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox text={searchNote} onSearch={debouncedSearchNote} />
          {isSuccess && data?.totalPages > 1 && (
            <Pagination
              totalPages={data?.totalPages || 0}
              currentPage={page}
              onClick={({ selected }) => setPage(selected + 1)}
            />
          )}
          <button className={css.button} onClick={handleOpenModal}>
            Create note +
          </button>
        </header>
        {data && isSuccess && <NoteList notes={data.notes} />}
        {isOpen && (
          <Modal onClose={handleCloseModal}>
            <NoteForm
              onCancel={handleCloseModal}
              onSubmit={handleCloseModal}
            ></NoteForm>
          </Modal>
        )}
      </div>
    </>
  );
}
