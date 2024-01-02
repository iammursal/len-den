import { create } from "zustand"
import { devtools } from "zustand/middleware"
import {persist, applyMiddlewares, logger} from "@/stores"
import { immer } from "zustand/middleware/immer"

type GeneralStore = any

const useGeneralStore = create<GeneralStore>(
  applyMiddlewares(
    (set: any, get: any) => ({
      dashboard: {
        sidebarExpanded: false,
      },
      setDashboard: (data: {}) =>
        set((state: GeneralStore) => {
          state.dashboard = { ...get().dashboard, ...data }
        }),
      toggleSidebar: (sidebarExpanded?: boolean) =>
        set((state: GeneralStore) => {
          state.dashboard = {
            ...get().dashboard,
            sidebarExpanded:
              sidebarExpanded || !get().dashboard.sidebarExpanded,
          }
        }),
    }),
    [
      immer,
      [
        persist,
        {
          // exclude state from persisting
          partialize: (state:any) =>
            Object.fromEntries(
              Object.entries(state).filter(
                ([key]) => ![''].includes(key),
              ),
            ),
        },
      ],
      devtools,
      logger,
    ],
  ),
)

export default useGeneralStore
