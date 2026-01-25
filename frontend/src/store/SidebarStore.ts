import { create } from "zustand";

type SidebarStore = {
  isOpen: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  currMenu: "menu" | "add" | "ai";
  setCurrMenu: (menu: "menu" | "add" | "ai") => void;
};

const useSidebarStore = create<SidebarStore>((set) => ({
  isOpen: true,
  toggleSidebar: () =>
    set((state) => ({
      isOpen: !state.isOpen,
    })),
  openSidebar: () => set({ isOpen: true }),
  closeSidebar: () => set({ isOpen: false }),

  currMenu: "menu",
  setCurrMenu: (menu) => set({ currMenu: menu }),
}));

export default useSidebarStore;
