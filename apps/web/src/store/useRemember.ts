import { create } from "zustand"
import { persist } from "zustand/middleware"

export type RememberState = {
    email: string
    remember: (email: string) => void
    forget: () => void
}

export const useRemember = create(persist<RememberState>((set) => ({
    email: "",
    remember: (email) => set({ email }),
    forget: () => set({ email: "" }),
}), { name: "remember" }))