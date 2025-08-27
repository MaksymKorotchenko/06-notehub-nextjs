'use client';

import css from './SearchBox.module.css';

interface SearchBoxProps {
  text: string;
  onSearch: (searchQuery: string) => void;
}
export default function SearchBox({ text, onSearch }: SearchBoxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value.trim());
  };

  return (
    <input
      onChange={handleChange}
      className={css.input}
      type="text"
      placeholder="Search notes"
      defaultValue={text}
    />
  );
}
