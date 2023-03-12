import { RootState } from '../reducers/rootReducer';

export const getEnterpriseStatus = (state: RootState) => state.enterprises.status;
export const getListOfEnterprises = (state: RootState) => state.enterprises.enterprisesList;

export const getDepartmentStatus = (state: RootState) => state.departments.status;
export const getListOfDepartments = (state: RootState) => state.departments.departmentsList;

export const getCostsStatus = (state: RootState) => state.costs.status;
export const getVolumesStatus = (state: RootState) => state.volumes.status;
export const getWorkingDaysStatus = (state: RootState) => state.days.status;

export const getFullEnterpriseInfoStatus = (state: RootState) => state.statistics.status;
export const getFullEnterpriseInfo = (state: RootState) => state.statistics.statistics;
export const getFullDepartmentInfo = (state: RootState) => state.statistics.departmentStatistics;
export const getMonthlyConsumptionInfo = (state: RootState) => state.statistics.monthlyConsumption;
