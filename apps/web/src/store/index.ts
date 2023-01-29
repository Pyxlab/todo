import { create } from "zustand";
import { SortItem, sortList } from "~/utils/sort-list";


interface State {
    total: number;
    setTotal: (total: number) => void;
    sortBy: SortItem;
    handleSortChange: (item: SortItem) => void;
    sideNavOpen: boolean;
    toggleSideNav: () => void;
    asideOpen: boolean;
    toggleAside: () => void;
    newTaskOpen: boolean;
    toggleNewTask: () => void;
}

export const useStore = create<State>((set) => ({
    total: 0,
    sortBy: sortList[0],
    handleSortChange: (item) => set({ sortBy: item }),
    setTotal: (total) => set({ total }),
    sideNavOpen: false,
    toggleSideNav: () => set((state) => ({ sideNavOpen: !state.sideNavOpen })),
    asideOpen: false,
    toggleAside: () => set((state) => ({ asideOpen: !state.asideOpen })),
    newTaskOpen: false,
    toggleNewTask: () => set((state) => ({ newTaskOpen: !state.newTaskOpen })),
}));

export * from "./useTheme";
export * from "./useRemember";