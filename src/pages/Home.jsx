import { BookCard } from "../components/Book";
import { useBookStore } from "../stores/openLibrary";
import "./Home.css";

function Home() {
  const { search_results } = useBookStore();

  return (
    <>
      {search_results.length ? (
        <>
          <div className="d-flex flex-column gap-3">
            {search_results.map((book, idx) => (
              <BookCard book={book} key={idx} />
            ))}
          </div>
        </>
      ) : (
        <>
          <h1>Welcome to BookApp!</h1>
          <p>This app is meant to do the following things:</p>
          <ul>
            <li>
              Let you search for books (check out{" "}
              <span className="code">/src/stores/openLibrary.js</span> to see
              how that&apos;s done!)
            </li>
            <li>View details about individual books.</li>
            <li>Add and remove your favorite books from your library.</li>
          </ul>
          <p>
            To that end, there&apos;s some non-functional routes set up already:
          </p>
          <ul>
            <li>
              <span className="code">
                <a href="/library">/library</a>
              </span>
              , which is where we will be able to interact with our library.
            </li>
            <li>
              <span className="code">
                <a href="/book">/book</a>
              </span>
              , which is where we will be able to interact with individual
              books. This one needs the most work, because we want to have URLs
              for every book, e.g.:{" "}
              <span className="code">/books/some_book_id</span>.
            </li>
          </ul>
        </>
      )}
    </>
  );
}

export default Home;
