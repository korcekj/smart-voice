import { combineReducers } from 'redux';

// Reducers
import userReducer from './user/user.reducer';
import moduleReducer from './module/module.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  modules: moduleReducer
});

export default rootReducer;
