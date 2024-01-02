export const applyMiddlewares = (f: any, middlewares: any[]) => {
	return middlewares.reduce((accumulator, middlewares) => {
		if (middlewares) {
			if (Array.isArray(middlewares))
				return middlewares[0](accumulator, middlewares[1])
			return middlewares(accumulator)
		}
	}, f)
}

export * from './persist'
export * from './logger'
