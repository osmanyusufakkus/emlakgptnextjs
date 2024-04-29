import { create } from "zustand";

type Store = {
  listingCount: number;
  setListingCount: (listingCount: number) => void;
};

export const listingCountStore = create<Store>()((set) => ({
  listingCount: 0,
  setListingCount: (listingCount) => set(() => ({ listingCount })),
}));
