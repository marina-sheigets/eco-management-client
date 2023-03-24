import { createActions } from '../../utils/actionCreator';

export const createEnterpriseAction = createActions('CREATE_ENTERPRISE');
export const clearEnterpriseStatusMessageAction = createActions('CLEAR_ENTERPRISE_STATUS_MESSAGE');

export const getListOfEnterprisesAction = createActions('GET_LIST_OF_ENTERPRISES');

export const createDepartmentAction = createActions('CREATE_DEPARTMENT');
export const clearDepartmentStatusMessageAction = createActions('CLEAR_DEPARTMENT_STATUS_MESSAGE');

export const getListOfDepartmentsAction = createActions('GET_LIST_OF_DEPARTMENTS');
export const getDepartmentByIdAction = createActions('GET_DEPARTMENTS_BY_ID');

export const createCostsAction = createActions('CREATE_COSTS');
export const clearCostsStatusAction = createActions('CLEAR_COSTS_STATUS');

export const createVolumesAction = createActions('CREATE_VOLUMES');
export const clearVolumesStatusAction = createActions('CLEAR_VOLUMES_STATUS');

export const getAllEnterpriseStatisticsAction = createActions('GET_ALL_ENTERPRISES_STATISTICS');
export const getFullEnterpriseInfoByResourceAction = createActions(
	'GET_FULL_ENTERPRISE_INFO_BY_RESOURCE'
);
export const getFullDepartmentInfoAction = createActions('GET_FULL_DEPARTMENT_INFO');
export const getFullDepartmentInfoForYearAction = createActions(
	'GET_FULL_DEPARTMENT_INFO_FOR_YEAR'
);
// 2 lab
export const createWorkingDaysAction = createActions('CREATE_WORKING_DAYS');
export const clearWorkingDaysStatusAction = createActions('CLEAR_WORKING_DAYS_STATUS');

export const getMonthlyConsumptionInfoAction = createActions('GET_MONTHLY_CONSUMPTION_INFO');
export const getDailyConsumptionInEnterpriseAction = createActions(
	'GET_DAILY_CONSUMPTION_IN_ENTERPRISE'
);
