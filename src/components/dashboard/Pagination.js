import React from 'react'

function Pagination({ currentPage, rowsPerPage, totalRows, paginate }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++) {
        pageNumbers.push(i);
    }
  return (
    <nav className='pagination'>
        <p>Page {currentPage}</p>
        {pageNumbers.map(number => (
            <li key={number} className='page-item'>
                <button onClick={() => paginate(number)} href="" className='page-link'>
                    {number}
                </button>
            </li>
        ))}
    </nav>
  )
}

export default Pagination