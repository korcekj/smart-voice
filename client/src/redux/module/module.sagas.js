import { takeLatest, call, select, put, all } from 'redux-saga/effects';
import { moduleActionTypes } from './module.types';

import {
  getAvailableModules,
  createModule,
  deleteModule,
  getHardware
} from '../../firebase/firebase.utils';

import {
  addHardware,
  removeHardware,
  updateHardware
} from '../../hardware/hardware.utils';

import {
  fetchModulesSuccess,
  fetchModulesFailure,
  addModuleSuccess,
  addModuleFailure,
  removeModuleSuccess,
  removeModuleFailure,
  addHardwareSuccess,
  addHardwareFailure,
  removeHardwareSuccess,
  removeHardwareFailure,
  updateHardwareSuccess,
  updateHardwareFailure
} from './module.actions';
import { selectCurrentUser } from '../user/user.selectors';
import { selectModule } from '../module/module.selectors';

export function* fetchModulesAsync() {
  try {
    const { id } = yield select(selectCurrentUser);
    const modules = yield call(getAvailableModules, id);
    yield put(fetchModulesSuccess(modules));
  } catch ({ message }) {
    yield put(fetchModulesFailure(message));
  }
}

export function* addModuleAsync({ payload: mac }) {
  try {
    const { id } = yield select(selectCurrentUser);
    const moduleRef = yield call(createModule, id, mac);
    if (!moduleRef) yield put(addModuleFailure('Failed to add module'));
    else {
      const moduleSnapshot = yield moduleRef.once('value');
      yield put(
        addModuleSuccess(moduleSnapshot.key, { ...moduleSnapshot.val() })
      );
    }
  } catch ({ message }) {
    yield put(addModuleFailure(message));
  }
}

export function* removeModuleAsync({ payload: mac }) {
  try {
    const { id } = yield select(selectCurrentUser);
    const moduleRef = yield call(deleteModule, id, mac);
    if (!moduleRef) yield put(removeModuleFailure('Failed to delete module'));
    else yield put(removeModuleSuccess(mac));
  } catch ({ message }) {
    yield put(removeModuleFailure(message));
  }
}

export function* addHardwareAsync({ payload: { hardware, type, moduleId } }) {
  try {
    const { id: userId } = yield select(selectCurrentUser);
    const {
      data: { ip }
    } = yield select(state => selectModule(moduleId)(state));
    const {
      data: { returnValue: id }
    } = yield call(addHardware, userId, moduleId, hardware, type, ip);
    const data = yield call(getHardware, moduleId, type, id);
    if (!data) yield put(addHardwareFailure('Failed to add hardware'));
    else yield put(addHardwareSuccess(id, data, type, moduleId));
  } catch ({ message }) {
    yield put(addHardwareFailure(message));
  }
}

export function* removeHardwareAsync({ payload: { id, type, moduleId } }) {
  try {
    const { id: userId } = yield select(selectCurrentUser);
    const {
      data: { ip }
    } = yield select(state => selectModule(moduleId)(state));
    yield call(removeHardware, userId, moduleId, id, type, ip);
    yield put(removeHardwareSuccess(id, type, moduleId));
  } catch ({ message }) {
    yield put(removeHardwareFailure(message));
  }
}

export function* updateHardwareAsync({
  payload: { id, hardware, type, moduleId }
}) {
  try {
    const { id: userId } = yield select(selectCurrentUser);
    const {
      data: { ip }
    } = yield select(state => selectModule(moduleId)(state));
    yield call(updateHardware, userId, moduleId, hardware, id, type, ip);
    const data = yield call(getHardware, moduleId, type, id);
    console.log(data);
    if (!data) yield put(updateHardwareFailure('Failed to update hardware'));
    else yield put(updateHardwareSuccess(id, data, type, moduleId));
  } catch ({ message }) {
    yield put(updateHardwareFailure(message));
  }
}

export function* fetchModulesStart() {
  yield takeLatest(moduleActionTypes.FETCH_MODULES_START, fetchModulesAsync);
}

export function* addModuleStart() {
  yield takeLatest(moduleActionTypes.ADD_MODULE_START, addModuleAsync);
}

export function* removeModuleStart() {
  yield takeLatest(moduleActionTypes.REMOVE_MODULE_START, removeModuleAsync);
}

export function* addHardwareStart() {
  yield takeLatest(moduleActionTypes.ADD_HARDWARE_START, addHardwareAsync);
}

export function* removeHardwareStart() {
  yield takeLatest(
    moduleActionTypes.REMOVE_HARDWARE_START,
    removeHardwareAsync
  );
}

export function* updateHardwareStart() {
  yield takeLatest(
    moduleActionTypes.UPDATE_HARDWARE_START,
    updateHardwareAsync
  );
}

export function* moduleSagas() {
  yield all([
    call(fetchModulesStart),
    call(addModuleStart),
    call(removeModuleStart),
    call(addHardwareStart),
    call(removeHardwareStart),
    call(updateHardwareStart)
  ]);
}
