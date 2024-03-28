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
            <a href={`/book/${book.cover_edition_key}`}>
              <img
                src={getCoverURL(book.cover_edition_key)}
                className="img-fluid rounded-start"
              />
            </a>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <a href={`/book/${book.cover_edition_key}`}>
                <h4 className="card-title">
                  {book.subtitle
                    ? `${book.title}: ${book.subtitle}`
                    : book.title}
                </h4>
              </a>
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

const BookDetails = ({ book }) => {
  const { getCoverURL, isInLibrary, addToLibrary, removeFromLibrary } =
    useBookStore();

  const getRatingHTML = (num_stars) => {
    const stars = Math.round(num_stars);
    let html = [];

    for (let i = 0; i < stars; i++) {
      html.push(<i className="fa-solid fa-star"></i>);
    }
    for (let i = stars; i < 5; i++) {
      html.push(<i className="fa-regular fa-star"></i>);
    }
    return html;
  };

  return (
    <>
      <h1>
        {book.title}
        {book.subtitle ? `: ${book.subtitle}` : ""}
      </h1>
      <img src={getCoverURL(book.cover_edition_key)} alt="" />
      <ul>
        <li>
          Author: <em>{book.author_name?.join(", ")}</em>
        </li>
        <li>
          Last Published: <em>{book.publish_date?.pop()}</em>
        </li>
        <li>
          First Published: <em>{book.first_publish_year}</em>
        </li>
      </ul>
      <div className="ratings">{getRatingHTML(book.ratings_average)}</div>
      <div className="buttons">
        {isInLibrary(book) ? (
          <button
            className="btn btn-outline-secondary"
            onClick={() => removeFromLibrary(book)}
          >
            Remove From Library
          </button>
        ) : (
          <button
            className="btn btn-outline-success"
            onClick={() => addToLibrary(book)}
          >
            Add To Library
          </button>
        )}
      </div>
    </>
  );
};

export { BookCard, BookDetails };
