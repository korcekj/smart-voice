import { all, call } from 'redux-saga/effects';

// Sagas
import { userSagas } from './user/user.sagas';
import { moduleSagas } from './module/module.sagas';

export default function* rootSaga() {
  yield all([call(userSagas), call(moduleSagas)]);
}
