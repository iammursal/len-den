import { merge } from 'lodash-es'
import { createJSONStorage, persist as p } from 'zustand/middleware'

export function persist(store: any, options: any = {}) {
	return p(store, {
		name: process.env.NEXT_PUBLIC_APP_NAME + '-zustand-persist',
		// getStorage: () => localStorage,
		storage: createJSONStorage(() => localStorage),
		merge: (persistedState: any, currentState: any) =>
			merge(currentState, persistedState),
		...options,
	})
}
