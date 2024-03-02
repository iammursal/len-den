import { isEqual } from 'lodash-es'
import { useEffect, useRef } from 'react'

import { DependencyList, EffectCallback } from 'react'

export function useDeepCompareEffect(
	callback: EffectCallback,
	dependencies: DependencyList
) {
	const firstRenderRef = useRef(true)
	const dependenciesRef = useRef<DependencyList>(dependencies)

	if (!isEqual(dependencies, dependenciesRef.current)) {
		dependenciesRef.current = dependencies
	}

	useEffect(() => {
		if (firstRenderRef.current) {
			firstRenderRef.current = false
			return
		}

		return callback()
	}, [dependenciesRef.current])
}
