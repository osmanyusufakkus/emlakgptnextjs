import { create } from 'zustand'

type Store = {
  choice: string
  updateChoice: (choice: string) => void
  text: string
  updateText: (text: string) => void
}

export const searchStore = create<Store>()((set) => ({
  choice: "",
  updateChoice: (choice) => set(()=> ({ choice })),
  text: "",
  updateText: (text) => set(()=> ({ text })),
}))