import { takeLatest, call, select, put, all } from 'redux-saga/effects';
import { moduleActionTypes } from './module.types';

import {
  getAvailableModules,
  createModule
} from '../../firebase/firebase.utils';

import {
  fetchModulesSuccess,
  fetchModulesFailure,
  addModuleSuccess,
  addModuleFailure
} from './module.actions';
import { selectCurrentUser } from '../user/user.selectors';

export function* fetchModulesAsync() {
  try {
    const { id } = yield select(selectCurrentUser);
    const modules = yield call(getAvailableModules, id);
    yield put(fetchModulesSuccess(modules));
  } catch ({ message }) {
    yield put(fetchModulesFailure(message));
  }
}

export function* addModuleAsync({ payload: device }) {
  try {
    const { id } = yield select(selectCurrentUser);
    const moduleRef = yield call(createModule, id, device);
    if (!moduleRef) yield put(addModuleFailure('Module is already in use'));
    else {
      const moduleSnapshot = yield moduleRef.once('value');
      yield put(
        addModuleSuccess({ mac: moduleSnapshot.key, ...moduleSnapshot.val() })
      );
    }
  } catch ({ message }) {
    yield put(addModuleFailure(message));
  }
}

export function* fetchModulesStart() {
  yield takeLatest(moduleActionTypes.FETCH_MODULES_START, fetchModulesAsync);
}

export function* addModuleStart() {
  yield takeLatest(moduleActionTypes.ADD_MODULE_START, addModuleAsync);
}

export function* moduleSagas() {
  yield all([call(fetchModulesStart), call(addModuleStart)]);
}
