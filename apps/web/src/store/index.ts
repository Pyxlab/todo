import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SortItem, sortList } from "~/utils/sort-list";

interface State {
    total: number;
    setTotal: (total: number) => void;
    sortBy: SortItem;
    handleSortChange: (item: SortItem) => void;
    directoryId: string | null;
    handleDirectoryId: (id: string | null) => void;
    sideNavOpen: boolean;
    toggleSideNav: () => void;
    asideOpen: boolean;
    toggleAside: () => void;
    newTaskOpen: boolean;
    toggleNewTask: () => void;
    listView: "list" | "grid";
    toggleListView: () => void;
}

export const useStore = create(
    persist<State>(
        (set) => ({
            total: 0,
            sortBy: sortList[0],
            handleSortChange: (item) => set({ sortBy: item }),
            directoryId: null,
            handleDirectoryId: (id) => set({ directoryId: id }),
            setTotal: (total) => set({ total }),
            sideNavOpen: false,
            toggleSideNav: () =>
                set((state) => ({ sideNavOpen: !state.sideNavOpen })),
            asideOpen: false,
            toggleAside: () =>
                set((state) => ({ asideOpen: !state.asideOpen })),
            newTaskOpen: false,
            toggleNewTask: () =>
                set((state) => ({ newTaskOpen: !state.newTaskOpen })),
            listView: "list",
            toggleListView: () =>
                set((state) => ({
                    listView: state.listView === "list" ? "grid" : "list",
                })),
        }),
        {
            name: "store",
            partialize: (state) =>
                ({
                    total: state.total,
                    sortBy: state.sortBy,
                    listView: state.listView,
                } as State),
        }
    )
);

export * from "./useTheme";
export * from "./useRemember";
