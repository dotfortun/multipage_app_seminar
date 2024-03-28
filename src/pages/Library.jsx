import { useEffect, useState } from "react";
import { useBookStore } from "../stores/openLibrary";
import { BookCard } from "../components/Book";

function Library() {
  const { library } = useBookStore();
  const [books, setBooks] = useState([]);

  // Doesn't run when library changes.
  useEffect(() => {
    let shelf = [];
    for (let olid in library) {
      shelf.push(library[olid]);
    }
    setBooks(shelf);
  }, [library]);

  return (
    <>
      <h1>My Library</h1>
      <div className="d-flex flex-column gap-3">
        {books.map((book, idx) => (
          <BookCard book={book} key={idx} />
        ))}
      </div>
    </>
  );
}

export default Library;
