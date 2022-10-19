import React from "react";
import "./Pagination.css";

const Pagination = (props) => {
  const pageNumbers = [];

  // Math.ceil: rounds up the amount of pages in the app
  for (let i = 1; i <= Math.ceil(props.pokemons / props.pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      <ul className="pagination-list">
        {pageNumbers &&
          pageNumbers.map((pageNumber) => {
            return (
              <div  key={pageNumber} className="pagination-number-container">
                <li
                  className="pagination-number"
                  onClick={() => props.pagination(pageNumber)}
                >
                  {pageNumber}
                </li>
              </div>
            );
          })}
      </ul>
    </div>
  );
};

export default Pagination;
