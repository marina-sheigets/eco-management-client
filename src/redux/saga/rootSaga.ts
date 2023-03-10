import { all } from 'redux-saga/effects';
import enterpriseSaga from './enterpriseSaga';
import departmentSaga from './departmentSaga';
import costsSaga from './costsSaga';
import volumesSaga from './volumesSaga';
import statisticsSaga from './statisticsSaga';

const sagasArray = [
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
