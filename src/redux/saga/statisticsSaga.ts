import { call, put, takeLatest } from 'redux-saga/effects';
import { getAllEnterpriseStatisticsRequest } from '../api/statistics';
import { getAllEnterpriseStatisticsAction } from '../api/ApiActions';

function* getAllEnterpriseStatistics(action: any) {
	try {
		// @ts-ignore
		const res = yield call(getAllEnterpriseStatisticsRequest, action.payload);
		yield put(getAllEnterpriseStatisticsAction.success(res.data));
	} catch ({ message }: any) {
		yield put(getAllEnterpriseStatisticsAction.failed({ message }));
	}
}

function* statisticsWatcher() {
	yield takeLatest(getAllEnterpriseStatisticsAction.type.REQUEST, getAllEnterpriseStatistics);
}

export default statisticsWatcher;
