import { create } from "zustand";

type Store = {
  choice: string;
  updateChoice: (choice: string) => void;
};

export const searchStore = create<Store>()((set) => ({
  choice: "",
  updateChoice: (choice) => set(() => ({ choice })),
}));
