import { call, put, takeLatest } from 'redux-saga/effects';
import { createEnterpriseRequest, getListOfEnterprisesRequest } from '../api';
import { createEnterpriseAction, getListOfEnterprisesAction } from '../api/ApiActions';

function* createEnterprise(action: any) {
	try {
		// @ts-ignore
		const res = yield call(createEnterpriseRequest, action.payload);
		yield put(createEnterpriseAction.success(res.data));
	} catch ({ message }: any) {
		yield put(createEnterpriseAction.failed({ message }));
	}
}

function* getListOfEnterprises() {
	try {
		// @ts-ignore
		const res = yield call(getListOfEnterprisesRequest);
		yield put(getListOfEnterprisesAction.success(res.data));
	} catch ({ message }: any) {
		yield put(getListOfEnterprisesAction.failed({ message }));
	}
}
function* authWatcher() {
	yield takeLatest(createEnterpriseAction.type.REQUEST, createEnterprise);
	yield takeLatest(getListOfEnterprisesAction.type.REQUEST, getListOfEnterprises);
}

export default authWatcher;
