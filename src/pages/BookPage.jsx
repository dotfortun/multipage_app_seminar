import { useEffect, useState } from "react";
import { useBookStore } from "../stores/openLibrary";
import { BookDetails } from "../components/Book";
import { useParams } from "react-router-dom";

function BookPage() {
  const { olid } = useParams();
  const { known_books } = useBookStore();
  const [book, setBook] = useState({});

  useEffect(() => {
    setBook(known_books[olid]);
  }, [olid, known_books]);

  return (
    <>
      <BookDetails book={book} />
    </>
  );
}

export default BookPage;
