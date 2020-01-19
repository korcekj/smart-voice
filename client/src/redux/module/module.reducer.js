import { moduleActionTypes } from './module.types';

const INITIAL_STATE = {
  availableModules: null,
  isFetching: false,
  error: {
    message: null,
    type: null
  }
};

const moduleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case moduleActionTypes.FETCH_MODULES_START:
      return {
        ...state,
        isFetching: true,
        error: {
          message: null,
          type: null
        }
      };
    case moduleActionTypes.FETCH_MODULES_SUCCESS:
      return {
        ...state,
        availableModules: action.payload,
        isFetching: false,
        error: {
          message: null,
          type: null
        }
      };
    case moduleActionTypes.FETCH_MODULES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: {
          message: action.payload,
          type: moduleActionTypes.FETCH_MODULES_FAILURE
        }
      };
    default:
      return state;
  }
};

export default moduleReducer;
