interface FSA {
	type: string;
	payload?: any;
	meta?: any;
}

const defaultActionCreator = (payload?: any, meta?: any) => ({
	payload,
	...(meta && { meta }),
});

export const createAction = (type: string, actionCreator = defaultActionCreator) => {
	const creator = (payload?: any, meta?: any): FSA => ({
		...actionCreator(payload, meta),
		type,
	});

	return Object.assign(creator, { type });
};

export const createActions = (type: string) => {
	const types = createRequestActionTypes(type);
	return {
		request: createAction(types.REQUEST),
		success: createAction(types.SUCCESS),
		failed: createAction(types.FAILED),
		type: types,
		types: Object.values(types),
	};
};

export const mergeReducers =
	(reducers: Function[], initialState: any) =>
	(state = initialState, action: any) =>
		reducers.reduce((resultState, reducer) => {
			const oneCaseUsed = resultState !== state;

			if (oneCaseUsed) {
				return resultState;
			}

			return reducer(state, action);
		}, state);

export const createRequestActionTypes = (name: string) => ({
	REQUEST: `${name}_REQUEST`,
	SUCCESS: `${name}_SUCCESS`,
	FAILED: `${name}_FAILED`,
});
