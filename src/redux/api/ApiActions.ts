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
