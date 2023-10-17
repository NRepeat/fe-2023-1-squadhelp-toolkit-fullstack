import React from 'react';
import style from './Pagination.module.scss';
export default function Pagination({
  categorizedContestsData,
  activeTab,
  itemsPerPage,
  paginate,
  currentPage,
}) {
  return (
    <ul className={style.pagination}>
      {Array.from({
        length: Math.ceil(
          categorizedContestsData[activeTab].length / itemsPerPage
        ),
      }).map((_, index) => (
        <li
          key={index}
          className={`${style.pageItem} ${
            index + 1 === currentPage ? `${style.active}` : ''
          }`}
        >
          <button onClick={() => paginate(index + 1)}>{index + 1}</button>
        </li>
      ))}
    </ul>
  );
}
