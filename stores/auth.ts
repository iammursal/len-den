import { applyMiddlewares, persist } from "@/stores/common/middlewares"
import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

export type AuthStore = {
    auth: any
    setAuth: (auth: any) => any
    clearAuth: () => any
}

const useAuthStore = create<AuthStore>(
    applyMiddlewares(
        (set: any): AuthStore => ({
            auth: undefined,
            setAuth: (auth: any) => set((state: AuthStore) => ({ ...state, auth })),
            clearAuth: () => set((state: AuthStore) => ({ auth: false })),
        }),
        [persist, immer, devtools],
    ),
)

export { useAuthStore }
