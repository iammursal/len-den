import { create } from "zustand"
import { combine, devtools } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
import { applyMiddlewares , persist} from "@/stores/common/middlewares"

type AuthStore = {
  setAuth: (auth: {}) => {}
  clearAuth: () => {}
  [x: string]: {
    [x: string]: any
  }
}

const useAuthStore = create<AuthStore>(
  applyMiddlewares(
    (set: any) => ({
      auth: false,
      setAuth: (auth: any) => set((state: AuthStore) => ({ ...state, auth })),
      clearAuth: () => set((state: AuthStore) => ({ auth: false })),
    }),
    [persist, immer, devtools],
  ),
)

export { useAuthStore }
