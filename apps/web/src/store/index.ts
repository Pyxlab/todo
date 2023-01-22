import { create } from "zustand";
import { SortItem, sortList } from "~/utils/sort-list";

interface State {
    total: number;
    setTotal: (total: number) => void;
    sortBy: SortItem;
    handleSortChange: (item: SortItem) => void;
}

export const useStore = create<State>((set) => ({
    total: 0,
    sortBy: sortList[0],
    handleSortChange: (item) => set({ sortBy: item }),
    setTotal: (total) => set({ total }),
}));

export * from "./useThemeStore";