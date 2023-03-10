import type { AnyAction } from '@reduxjs/toolkit';
import { clearVolumesStatusAction, createVolumesAction } from '../api/ApiActions';

interface InitialState {
	status: string;
}
const initialState: InitialState = {
	status: '',
};

const volumesReducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case createVolumesAction.type.REQUEST: {
			return {
				...state,
				status: 'Started',
			};
		}

		case createVolumesAction.type.SUCCESS: {
			return {
				...state,
				status: action.payload.message,
			};
		}

		case createVolumesAction.type.FAILED: {
			return {
				...state,
				status: 'Something went wrong',
			};
		}

		case clearVolumesStatusAction.type.REQUEST: {
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

export default volumesReducer;
