import { useBookStore } from "../stores/openLibrary";

import "./Navbar.css";

const Navbar = () => {
  const { is_loading, search_query, getBooksBySearch, setSearchQuery } =
    useBookStore();

  const handleSearch = (ev) => {
    ev.preventDefault();
    if (!is_loading) {
      getBooksBySearch();
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a href="/" className="navbar-brand">
            BookApp
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse w-100 justify-content-between gap-3"
            id="navbarSupportedContent"
          >
            <div className="navbar-nav">
              <a href="/library" className="nav-link">
                My Library
              </a>
            </div>
            <form
              className="d-flex ml-auto"
              role="search"
              onSubmit={(ev) => handleSearch(ev)}
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search_query}
                onChange={(ev) => setSearchQuery(ev.target.value)}
              />
              <button
                className={
                  is_loading
                    ? "btn btn-outline-secondary"
                    : "btn btn-outline-success"
                }
                style={{
                  cursor: is_loading ? "wait" : "auto",
                }}
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export { Navbar };
