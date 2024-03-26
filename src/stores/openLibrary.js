import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useBookStore = create(
  persist(
    (set, get) => ({
      library: [],
      search_results: [],

      getBookByISBN: async (isbn) => {
        const resp = await fetch(`https://openlibrary.org/books/${encodeURIComponent(isbn)}.json`);
        if (resp.ok) {
          const data = await resp.json();
          set({
            search_results: [data]
          })
        }
      },

      getBooksBySearch: async (s) => {
        const resp = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(s)}`);
        if (resp.ok) {
          const data = await resp.json();
          set({
            search_results: [data.docs]
          })
        }
      },

      addBookToLibrary: (book) => {
        set({
          library: [book, ...get().library]
        })
      },

      removeBookByOCAID: (ocaid) => {
        set({
          library: get().library.filter((b) => b.ocaid !== ocaid)
        })
      },
    }),

    // Persist options.
    {
      name: 'book-shelf',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)

export {
  useBookStore
}
