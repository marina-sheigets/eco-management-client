import { call, put, takeLatest } from 'redux-saga/effects';
import { createCostsRequest } from '../api';
import { createCostsAction } from '../api/ApiActions';

function* createCosts(action: any) {
	try {
		// @ts-ignore
		const res = yield call(createCostsRequest, action.payload);
		yield put(createCostsAction.success(res.data));
	} catch ({ message }: any) {
		yield put(createCostsAction.failed({ message }));
	}
}

function* costsWatcher() {
	yield takeLatest(createCostsAction.type.REQUEST, createCosts);
}

export default costsWatcher;
