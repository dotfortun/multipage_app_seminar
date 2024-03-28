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
          <p>Todo (for later):</p>
          <ul>
            <li>
              Fix the bug where removing books while at{" "}
              <span className="code">/library</span>
              doesn&apos;t appear to actually remove the book.
            </li>
            <li>Add a loading screen while the search results are loading.</li>
            <li>
              Either make the search field take you to{" "}
              <span className="code">/</span>
              when you aren&apos;t on the home page, or find a better search
              page solution thing.
            </li>
          </ul>
        </>
      )}
    </>
  );
}

export default Home;
