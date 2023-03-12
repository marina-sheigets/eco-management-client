import { call, put, takeLatest } from 'redux-saga/effects';
import { createWorkingDaysRequest } from '../api';
import { createWorkingDaysAction } from '../api/ApiActions';

function* createWorkingDays(action: any) {
	try {
		// @ts-ignore
		const res = yield call(createWorkingDaysRequest, action.payload);
		yield put(createWorkingDaysAction.success(res.data));
	} catch ({ message }: any) {
		yield put(createWorkingDaysAction.failed({ message }));
	}
}

function* costsWatcher() {
	yield takeLatest(createWorkingDaysAction.type.REQUEST, createWorkingDays);
}

export default costsWatcher;
