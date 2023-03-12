import { combineReducers, type StateFromReducersMapObject } from '@reduxjs/toolkit';
import enterpriseReducer from './enterpriseReducer';
import departmentReducer from './departmentReducer';
import costsReducer from './costsReducer';
import volumesReducer from './volumesReducer';
import statisticsReducer from './statisticsReducer';
import daysReducer from './daysReducer';

const reducers = {
	days: daysReducer,
	enterprises: enterpriseReducer,
	departments: departmentReducer,
	costs: costsReducer,
	volumes: volumesReducer,
	statistics: statisticsReducer,
};
const rootReducer = combineReducers(reducers);
export type RootState = StateFromReducersMapObject<typeof reducers>;
export default rootReducer;
