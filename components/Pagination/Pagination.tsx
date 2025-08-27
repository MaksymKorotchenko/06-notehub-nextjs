import css from './Pagination.module.css';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onClick: (selectedPage: { selected: number }) => void;
}

export default function Pagination({
  totalPages,
  currentPage,
  onClick,
}: PaginationProps) {
  return (
    <ReactPaginate
      nextLabel=">"
      previousLabel="<"
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      forcePage={currentPage - 1}
      onPageChange={onClick}
      pageCount={totalPages}
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
}
