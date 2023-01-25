import { create } from "zustand";

type TaskModalState = {
    isOpen: boolean;
    toggle: () => void;
}

export const useTaskModalStore = create<TaskModalState>((set) => ({
    isOpen: false,
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}))