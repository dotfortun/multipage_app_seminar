import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useBookStore = create(
  persist(
    (set, get) => ({
      fishes: 0,
      addAFish: () => set({ fishes: get().fishes + 1 }),
    }),
    {
      name: 'food-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)

export {
  useBookStore
}
