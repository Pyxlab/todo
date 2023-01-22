import { create } from "zustand";
import { persist } from "zustand/middleware";

type Mode = "light" | "dark";

type ThemeState = {
    mode: Mode;
    toggle: () => void;
};

export const useThemeStore = create(persist<ThemeState>((set) => ({
    mode: "light",
    toggle: () =>
        set((state) => ({ mode: state.mode === "light" ? "dark" : "light" })),
}), {
    name: "theme",
}));
