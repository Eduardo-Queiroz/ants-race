import {
  call,
  fork,
  put,
  takeLatest,
  select,
  takeEvery,
  delay,
  all,
} from 'redux-saga/effects';
import {Actions, Types} from '../../reducers/ant';
import {fetchAntGroup} from '../../../api/index';
import {AntRanking} from '../../../interfaces/AntRanking';
import {navigate, navigationRef} from '../../../util/navigation/rootNavigation';
import {
  generateAntWinLikelihoodCalculator,
  likelihoodAsyncCalculator,
} from '../../../util/antWinningCalculation';

const {getAntsError, getAntsPending, getAntsSuccess, startAntRace, antsUpdate} =
  Actions;

function* getAnts() {
  try {
    yield put(getAntsPending());
    const {ants} = yield call(fetchAntGroup);
    yield put(getAntsSuccess(ants));
    navigate('Race', {});
  } catch ({message = 'Ocorreu um erro ao obter as formigas'}) {
    yield put(getAntsError(message as string));
  }
}

function* startRace() {
  const antsRankins: AntRanking[] = yield select(({ants}) => ants.ants);
  yield all(antsRankins.map(ant => put(startAntRace(ant.id))));
}

function* startSingleAntRace({id}: any) {
  const likelihoodOfAntWinning: number = yield call(likelihoodAsyncCalculator);
  yield put(antsUpdate(id, likelihoodOfAntWinning));
}

function* watchGetAnts() {
  yield takeLatest(Types.GET_ANTS, getAnts);
}

function* watchStartRace() {
  yield takeLatest(Types.START_RACE, startRace);
}

function* watchStartAntRace() {
  yield takeEvery(Types.START_ANT_RACE, startSingleAntRace);
}

export default function* root() {
  yield fork(watchGetAnts);
  yield fork(watchStartRace);
  yield fork(watchStartAntRace);
}
