import { combineReducers, type StateFromReducersMapObject } from '@reduxjs/toolkit';
import enterpriseReducer from './enterpriseReducer';
import departmentReducer from './departmentReducer';
import costsReducer from './costsReducer';
import volumesReducer from './volumesReducer';

const reducers = {
	enterprises: enterpriseReducer,
	departments: departmentReducer,
	costs: costsReducer,
	volumes: volumesReducer,
};
const rootReducer = combineReducers(reducers);
export type RootState = StateFromReducersMapObject<typeof reducers>;
export default rootReducer;
