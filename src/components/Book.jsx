import { useBookStore } from "../stores/openLibrary";

import "./Book.css";

const BookCard = ({ book }) => {
  const { getCoverURL, isInLibrary, addToLibrary, removeFromLibrary } =
    useBookStore();

  const handleClick = () => {
    if (isInLibrary(book)) {
      removeFromLibrary(book);
    } else {
      addToLibrary(book);
    }
  };

  return (
    <>
      <div className="card book-card">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={getCoverURL(book.cover_edition_key)}
              className="img-fluid rounded-start"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h4 className="card-title">
                {book.subtitle ? `${book.title}: ${book.subtitle}` : book.title}
              </h4>
              <h5 className="card-title">{book.author_name?.join(", ")}</h5>
              <div className="d-flex gap-3">
                <button
                  className={
                    isInLibrary(book)
                      ? "btn btn-outline-secondary"
                      : "btn btn-outline-success"
                  }
                  onClick={handleClick}
                >
                  {isInLibrary(book) ? "Remove From Library" : "Add To Library"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const BookDetails = ({ book, image }) => {
  return <></>;
};

export { BookCard, BookDetails };
