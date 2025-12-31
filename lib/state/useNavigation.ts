import { create } from "zustand";

type NavigationState = {
  activePageId: string | null;
  setActivePageId: (id: string) => void;
};

export const useNavigation = create<NavigationState>((set) => ({
  activePageId: null,
  setActivePageId: (id) => set({ activePageId: id }),
}));
