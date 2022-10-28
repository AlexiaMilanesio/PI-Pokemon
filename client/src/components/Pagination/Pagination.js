import React from "react";
import "./Pagination.css";

const Pagination = ({filteredPokemons, pokemonsPerPage, pagination, page, isLoading}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(filteredPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (pageNumber) => {
    pagination(pageNumber);
    window.scrollTo({top: 0});
  };

  const getPreviousPage = () => {
    pagination(page-1 > 0 ? page-1 : 1);
    window.scrollTo({top: 0});
  }

  const getNextPage = () => {
    pagination(page+1 <= pageNumbers.length ? page+1 : pageNumbers.length);
    window.scrollTo({top: 0});
  }

  return (
    <div className="pagination-container">

        <button 
          className={page === 1 ? "hidden" : "pagintation-prev-next"}
          onClick={getPreviousPage} 
        >
          <p>&#60; PREV</p>
        </button>

        {pageNumbers && pageNumbers.map((pageNumber) => {
          return (
            <div
              key={pageNumber}
              className={page !== pageNumber ? "pagination-number-container" : "active-pagination-number-container"}
              onClick={() => handleClick(pageNumber)}
            >
              <p>{pageNumber}</p>
            </div>
          );
        })}

        <button 
          className={page === pageNumbers.length || isLoading ? "hidden" : "pagintation-prev-next"}
          onClick={getNextPage} 
        >
          <p>NEXT &#62;</p>
        </button>

    </div>
  );
};

export default Pagination;
