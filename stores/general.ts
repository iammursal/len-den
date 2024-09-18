import { applyMiddlewares, logger, persist } from "@/stores";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type GeneralStore = {
    dashboard: {
        sidebarExpanded: boolean
    }
    IsOfflineOnly: boolean
    IsSplashScreenShown: boolean
    GoogleSpreadsheetId: string
    setGoogleSpreadsheetId: (GoogleSpreadsheetId: string) => void
    setIsOfflineOnly: (IsOfflineOnly: boolean) => void
    setIsSplashScreenShown: (IsSplashScreenShown: boolean) => void
    setDashboard: (data: {}) => void
    toggleSidebar: (sidebarExpanded?: boolean) => void
}

const useGeneralStore = create<GeneralStore>(
    applyMiddlewares(
        (set: any, get: any) => ({
            dashboard: {
                sidebarExpanded: false,
            },
            IsOfflineOnly: false,
            IsSplashScreenShown: false,
            GoogleSpreadsheetId: '',
            setGoogleSpreadsheetId: (GoogleSpreadsheetId: string) =>
                set((state: GeneralStore) => {
                    state.GoogleSpreadsheetId = GoogleSpreadsheetId
                }),
            setIsOfflineOnly: (IsOfflineOnly: boolean) =>
                set((state: GeneralStore) => {
                    state.IsOfflineOnly = IsOfflineOnly
                }),
            setIsSplashScreenShown: (IsSplashScreenShown: boolean) =>
                set((state: GeneralStore) => {
                    state.IsSplashScreenShown = IsSplashScreenShown
                }),
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
                    partialize: (state: any) =>
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
