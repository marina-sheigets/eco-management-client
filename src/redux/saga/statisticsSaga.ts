import { call, put, takeLatest } from 'redux-saga/effects';
import {
	getFullEnterpriseInfoByResourceRequest,
	getMonthlyConsumptionInfoRequest,
	getFullDepartmentInfoRequest,
} from '../api/statistics';
import {
	getFullDepartmentInfoAction,
	getFullEnterpriseInfoByResourceAction,
	getMonthlyConsumptionInfoAction,
} from '../api/ApiActions';

function* getFullEnterpriseInfo(action: any) {
	try {
		// @ts-ignore
		const res = yield call(getFullEnterpriseInfoByResourceRequest, action.payload);
		yield put(getFullEnterpriseInfoByResourceAction.success(res.data));
	} catch ({ message }: any) {
		yield put(getFullEnterpriseInfoByResourceAction.failed({ message }));
	}
}

function* getFullDepartmentInfo(action: any) {
	try {
		// @ts-ignore
		const res = yield call(getFullDepartmentInfoRequest, action.payload);
		yield put(getFullDepartmentInfoAction.success(res.data));
	} catch ({ message }: any) {
		yield put(getFullDepartmentInfoAction.failed({ message }));
	}
}

function* getMonthlyConsumptionInfo(action: any) {
	try {
		// @ts-ignore
		const res = yield call(getMonthlyConsumptionInfoRequest, action.payload);
		yield put(getMonthlyConsumptionInfoAction.success(res.data));
	} catch ({ message }: any) {
		yield put(getMonthlyConsumptionInfoAction.failed({ message }));
	}
}

function* statisticsWatcher() {
	yield takeLatest(getFullEnterpriseInfoByResourceAction.type.REQUEST, getFullEnterpriseInfo);
	yield takeLatest(getFullDepartmentInfoAction.type.REQUEST, getFullDepartmentInfo);
	yield takeLatest(getMonthlyConsumptionInfoAction.type.REQUEST, getMonthlyConsumptionInfo);
}

export default statisticsWatcher;
