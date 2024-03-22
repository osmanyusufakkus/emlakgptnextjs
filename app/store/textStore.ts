import { create } from "zustand";

type Store = {
  text: string;
  updateText: (text: string) => void;
};

export const textStore = create<Store>()((set) => ({
  text: "Osman",
  updateText: (text) => set(() => ({ text })),
}));
