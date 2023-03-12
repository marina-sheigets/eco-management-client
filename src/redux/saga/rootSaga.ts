import { all } from 'redux-saga/effects';
import enterpriseSaga from './enterpriseSaga';
import departmentSaga from './departmentSaga';
import costsSaga from './costsSaga';
import volumesSaga from './volumesSaga';
import statisticsSaga from './statisticsSaga';
import daysSaga from './daysSaga';
const sagasArray = [
	daysSaga(),
	enterpriseSaga(),
	departmentSaga(),
	costsSaga(),
	volumesSaga(),
	statisticsSaga(),
];
function* rootSaga() {
	yield all(sagasArray);
}

export default rootSaga;
