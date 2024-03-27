import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useBookStore = create(
  persist(
    (set, get) => ({
      // Here's the shape of the data the book store
      // needs to know about to display pages:
      library: {},
      known_books: {},
      search_query: "",
      search_results: [],
      is_loading: false,

      // Here's the actions that we've defined for this data:
      setSearchQuery: (s) => set({ search_query: s }),
      clearSearchResults: () => set({ search_results: [] }),

      isInLibrary: (book) => {
        return book.cover_edition_key in get().library;
      },

      addToLibrary: (book) => {
        let library = get().library;
        if (!get().isInLibrary(book)) {
          library[book.cover_edition_key] = book;
          set({ library: library })
        }
      },

      removeFromLibrary: (book) => {
        let library = get().library;
        if (get().isInLibrary(book)) {
          delete library[book.cover_edition_key];
          set({
            library: library
          })
        }
      },

      isISBN: (isbn) => {
        /**
         * Stolen shamelessley from here: https://gist.github.com/oscarmorrison/3744fa216dcfdb3d0bcb
         */
        let rgx_10 = /^(?:ISBN(?:-10)?:?\s)?(?=[0-9X]{10}$|(?=(?:[0-9]+[-\s]){3})[-\s0-9X]{13}$)[0-9]{1,5}[-\s]?[0-9]+[-\s]?[0-9]+[-\s]?[0-9X]$/
        let rgx_13 = /^(?:ISBN(?:-13)?:?\s)?(?=[0-9]{13}$|(?=(?:[0-9]+[-\s]){4})[-\s0-9]{17}$)97[89][-\s]?[0-9]{1,5}[-\s]?[0-9]+[-\s]?[0-9]+[-\s]?[0-9]$/
        return rgx_10.test(isbn) || rgx_13.test(isbn);
      },

      getCoverURL: (isbn) => {
        return `https://covers.openlibrary.org/b/olid/${isbn}-L.jpg`
      },

      getBooksBySearch: async () => {
        // We set is_loading to true here so we can disable the search button.
        set({ is_loading: true });

        // Here we make an API request to openlibrary.org with our search query.
        const resp = await fetch(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(get().search_query)}&limit=10`,
          { redirect: "follow" }
        );

        // If the request comes back okay, we take the response and turn it
        // from text into data that the JS interpreter understands.
        if (resp.ok) {
          const data = await resp.json();
          let known_books = get().known_books;

          // Next we iterate over the book data we got, and we
          // see if these books are stored in known_books.
          for (let book of data.docs) {
            // If they are known, we don't do anything with the data
            // because we've already saved it.
            if (!book.cover_edition_key) {
              continue;
            }

            // If not, we add it to the saved data for later use.
            if (!(book.cover_edition_key in known_books)) {
              known_books[book.cover_edition_key] = book;
            }
          }

          // Then we update our application state with
          // our new books and our search results.
          set({
            search_results: data.docs,
            known_books: known_books,
          })
        }

        // Finally, we set loading to false, so that we can
        // reenable the buttons.
        set({ is_loading: false });
      },
    }),

    // Persist options.
    {
      name: 'book-shelf',
      // We're saving to sesseionStorage for the seminar because it isn't permanent.
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => ![
            'search_results',
            'search_query',
            'is_loading',
          ].includes(key)),
        ),

    },
  ),
)

export {
  useBookStore
}
