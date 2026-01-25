import { create } from "zustand";

type SidebarStore = {
  isOpen: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  setIsOpen: (isOpen: boolean) => void;
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
  setIsOpen: (isOpen) => set({ isOpen }),

  currMenu: "menu",
  setCurrMenu: (menu) => set({ currMenu: menu }),
}));

export default useSidebarStore;
