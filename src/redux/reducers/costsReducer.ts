import type { AnyAction } from '@reduxjs/toolkit';
import { clearCostsStatusAction, createCostsAction } from '../api/ApiActions';

interface InitialState {
	status: string;
}
const initialState: InitialState = {
	status: '',
};

const costsReducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case createCostsAction.type.REQUEST: {
			return {
				...state,
				status: 'Started',
			};
		}

		case createCostsAction.type.SUCCESS: {
			return {
				...state,
				status: action.payload.message,
			};
		}

		case createCostsAction.type.FAILED: {
			return {
				...state,
				status: 'Something went wrong',
			};
		}

		case clearCostsStatusAction.type.REQUEST: {
			return {
				...state,
				status: '',
			};
		}

		default: {
			return state;
		}
	}
};

export default costsReducer;
