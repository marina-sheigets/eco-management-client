import { AnyAction } from '@reduxjs/toolkit';
import {
	getFullDepartmentInfoAction,
	getFullEnterpriseInfoByResourceAction,
	getMonthlyConsumptionInfoAction,
} from '../api/ApiActions';

interface InitialState {
	status: string;
	statistics: { year: number; values: { [month: string]: number } }[];
	departmentStatistics: { year: number; values: { [month: string]: number } }[];
	monthlyConsumption: {
		month: string;
		values: { year: number; costs: number; days: number; average: number }[];
	};
}
const initialState: InitialState = {
	status: '',
	statistics: [],
	departmentStatistics: [],
	monthlyConsumption: { month: '', values: [] },
};

const statisticsReducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case getFullEnterpriseInfoByResourceAction.type.REQUEST: {
			return {
				...state,
				status: 'Import',
			};
		}
		case getFullEnterpriseInfoByResourceAction.type.SUCCESS: {
			return {
				...state,
				status: 'Finished',
				statistics: action.payload.statistics ?? [],
			};
		}
		case getFullDepartmentInfoAction.type.REQUEST: {
			return {
				...state,
				status: 'Import',
			};
		}

		case getFullDepartmentInfoAction.type.SUCCESS: {
			return {
				...state,
				status: 'Finished',
				departmentStatistics: action.payload.statistics ?? [],
			};
		}
		case getMonthlyConsumptionInfoAction.type.REQUEST: {
			return {
				...state,
				status: 'Import',
			};
		}
		case getMonthlyConsumptionInfoAction.type.SUCCESS: {
			return {
				...state,
				status: 'Finished',
				monthlyConsumption: action.payload.statistics ?? { month: '', values: [] },
			};
		}

		default: {
			return state;
		}
	}
};

export default statisticsReducer;
