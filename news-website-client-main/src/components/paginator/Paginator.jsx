import React from 'react'

const Paginator = ({ currentPage, setCurrentPage, totalPages }) => {
  const arr = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleClickPreviousPage = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  }

  const handleClickNextPage = () => {
    if (currentPage === totalPages) return;
    setCurrentPage(currentPage + 1);
  }

  const handleSelectPage = (page) => {
    setCurrentPage(page);
  }

  return (
    <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`} onClick={handleClickPreviousPage}>
                <a className="page-link" href="#" aria-label="Previous">
                <span className="fa fa-angle-double-left" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
                </a>
            </li>
            { arr.map((page) => (
              <>
                <li 
                  className={`page-item ${page === currentPage ? 'active' : ''}`}
                  onClick={() => handleSelectPage(page)}
                ><a className="page-link" href="#">{ page }</a></li>
              </>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`} onClick={handleClickNextPage}>
                <a className="page-link" href="#" aria-label="Next">
                <span className="fa fa-angle-double-right" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
                </a>
            </li>
        </ul>
    </nav>
  )
}

export default Paginator