import type { AnyAction } from '@reduxjs/toolkit';
import {
	clearDepartmentStatusMessageAction,
	createDepartmentAction,
	getListOfDepartmentsAction,
} from '../api/ApiActions';
import { DepartmentResponse } from '../types';

interface InitialState {
	status: string;
	departmentsList: DepartmentResponse[];
	deleteStatus: string;
}
const initialState: InitialState = {
	status: '',
	departmentsList: [],
	deleteStatus: '',
};

const departmentReducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case createDepartmentAction.type.REQUEST: {
			return {
				...state,
				status: 'Started',
			};
		}

		case createDepartmentAction.type.SUCCESS: {
			if (action.payload.message) {
				return {
					...state,
					status: action.payload.message,
				};
			}
			return {
				...state,
				status: 'Department was created successfully !',
			};
		}

		case createDepartmentAction.type.FAILED: {
			return {
				...state,
				status: action.payload.message,
			};
		}
		case clearDepartmentStatusMessageAction.type.REQUEST: {
			return {
				...state,
				status: '',
			};
		}
		case getListOfDepartmentsAction.type.REQUEST: {
			return {
				...state,
				status: 'Import started',
			};
		}
		case getListOfDepartmentsAction.type.SUCCESS: {
			if (!action.payload.departments.length) {
				return state;
			}
			let arr: any = [];
			action.payload.departments.forEach((department: DepartmentResponse) => {
				arr.push({ id: department._id, name: department.name });
			});

			return {
				...state,
				departmentsList: arr,
				status: 'Import finished',
			};
		}
		case getListOfDepartmentsAction.type.FAILED: {
			return state;
		}
		default: {
			return state;
		}
	}
};

export default departmentReducer;
