import { call, put, takeLatest } from 'redux-saga/effects';
import { createDepartmentRequest, getListOfDepartmentsRequest } from '../api';
import { createDepartmentAction, getListOfDepartmentsAction } from '../api/ApiActions';

function* createDepartment(action: any) {
	try {
		// @ts-ignore
		const res = yield call(createDepartmentRequest, action.payload);
		yield put(createDepartmentAction.success(res.data));
	} catch ({ message }: any) {
		yield put(createDepartmentAction.failed({ message }));
	}
}

function* getListOfDepartments(action: any) {
	try {
		// @ts-ignore
		const res = yield call(getListOfDepartmentsRequest, action.payload);
		yield put(getListOfDepartmentsAction.success(res.data));
	} catch ({ message }: any) {
		yield put(getListOfDepartmentsAction.failed({ message }));
	}
}
function* authWatcher() {
	yield takeLatest(createDepartmentAction.type.REQUEST, createDepartment);
	yield takeLatest(getListOfDepartmentsAction.type.REQUEST, getListOfDepartments);
}

export default authWatcher;
