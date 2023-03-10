import type { AnyAction } from '@reduxjs/toolkit';
import {
	clearEnterpriseStatusMessageAction,
	createEnterpriseAction,
	getListOfEnterprisesAction,
} from '../api/ApiActions';
import { EnterpriseResponse } from '../types';

interface InitialState {
	status: string;
	enterprisesList: EnterpriseResponse[];
	deleteStatus: string;
}
const initialState: InitialState = {
	status: '',
	enterprisesList: [],
	deleteStatus: '',
};

const enterpriseReducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case createEnterpriseAction.type.REQUEST: {
			return {
				...state,
				status: 'Started',
			};
		}

		case createEnterpriseAction.type.SUCCESS: {
			if (action.payload.message) {
				return {
					...state,
					status: action.payload.message,
				};
			}
			return {
				...state,
				status: 'Enterprise was created successfully !',
			};
		}

		case createEnterpriseAction.type.FAILED: {
			return {
				...state,
				status: action.payload.message,
			};
		}
		case clearEnterpriseStatusMessageAction.type.REQUEST: {
			return {
				...state,
				status: '',
			};
		}
		case getListOfEnterprisesAction.type.SUCCESS: {
			if (!action.payload.enterprises.length) {
				return state;
			}
			let arr: any = [];
			action.payload.enterprises.forEach((enterprise: EnterpriseResponse) => {
				arr.push({ id: enterprise._id, name: enterprise.name });
			});

			return {
				...state,
				enterprisesList: arr,
			};
		}
		default: {
			return state;
		}
	}
};

export default enterpriseReducer;
