import React, { useState } from "react";
import "./Pagination.css";

export default function usePagination({ filteredData, pagination }) {
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line
  const [itemsPerPage, setItemsPerPage] = useState(10); 
const totalItems = filteredData.length;
const totalPages = Math.ceil(totalItems / itemsPerPage);
const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const currentData = filteredData.slice(startIndex, endIndex);


  return {
    currentData,
    currentPage,
    setCurrentPage,
    itemsPerPage,

    render: (
      <div className="paginate-container">
        <div className="paginate-wrapper">
          <button
            className={`skip-button ${currentPage > 1 ? "active" : ""}`}
            onClick={() => setCurrentPage(1)}
          >
            {"<<"}
          </button>
          <button
            className={`skip-button ${currentPage > 1 ? "active" : ""}`}
            onClick={() => {
              currentPage > 1 && setCurrentPage(currentPage - 1);
            }}
          >
            {"<"}
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => pagination(index)}
              className={`pagination-button ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            className={`skip-button ${
              currentPage < totalPages ? "active" : ""
            }`}
            onClick={() => {
              currentPage < totalPages && setCurrentPage(currentPage + 1);
            }}
          >
            {">"}
          </button>
          <button
            className={`skip-button ${
              currentPage < totalPages ? "active" : ""
            }`}
            onClick={() => setCurrentPage(totalPages)}
          >
            {">>"}
          </button>
        </div>
      </div>
    ),
  };
}
