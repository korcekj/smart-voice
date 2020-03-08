import { combineReducers } from 'redux';

// Reducers
import userReducer from './user/user.reducer';
import moduleReducer from './module/module.reducer';
import flashMessageReducer from './flash-message/flash-message.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  modules: moduleReducer,
  flashMessage: flashMessageReducer
});

export default rootReducer;
