import { takeLatest, call, select, put, all } from 'redux-saga/effects';
import { moduleActionTypes } from './module.types';

import { getAvailableModules } from '../../firebase/firebase.utils';

import { fetchModulesSuccess, fetchModulesFailure } from './module.actions';
import { selectCurrentUser } from '../user/user.selectors';

export function* fetchModulesAsync() {
  try {
    const { id } = yield select(selectCurrentUser);
    const modules = yield call(getAvailableModules, id);
    yield put(fetchModulesSuccess(modules));
  } catch (error) {
    yield put(fetchModulesFailure(error.message));
  }
}

export function* fetchModulesStart() {
  yield takeLatest(moduleActionTypes.FETCH_MODULES_START, fetchModulesAsync);
}

export function* moduleSagas() {
  yield all([call(fetchModulesStart)]);
}
