import { call, put, takeLatest } from 'redux-saga/effects';
import { createVolumesRequest } from '../api';
import { createVolumesAction } from '../api/ApiActions';

function* createVolumes(action: any) {
	try {
		// @ts-ignore
		const res = yield call(createVolumesRequest, action.payload);
		yield put(createVolumesAction.success(res.data));
	} catch ({ message }: any) {
		yield put(createVolumesAction.failed({ message }));
	}
}

function* volumesWatcher() {
	yield takeLatest(createVolumesAction.type.REQUEST, createVolumes);
}

export default volumesWatcher;
