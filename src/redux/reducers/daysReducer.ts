import type { AnyAction } from '@reduxjs/toolkit';
import { clearWorkingDaysStatusAction, createWorkingDaysAction } from '../api/ApiActions';

interface InitialState {
	status: string;
}
const initialState: InitialState = {
	status: '',
};

const daysReducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case createWorkingDaysAction.type.REQUEST: {
			return {
				...state,
				status: 'Started',
			};
		}

		case createWorkingDaysAction.type.SUCCESS: {
			return {
				...state,
				status: action.payload.message,
			};
		}

		case createWorkingDaysAction.type.FAILED: {
			return {
				...state,
				status: 'Something went wrong',
			};
		}

		case clearWorkingDaysStatusAction.type.REQUEST: {
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

export default daysReducer;
