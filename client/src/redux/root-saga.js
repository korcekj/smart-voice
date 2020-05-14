// Importovanie potrebnych packages
import { all, call } from 'redux-saga/effects';

// Importovanie sagas
import { userSagas } from './user/user.sagas';
import { moduleSagas } from './module/module.sagas';

// Exportovanie root saga funkcie
export default function* rootSaga() {
  yield all([call(userSagas), call(moduleSagas)]);
}
