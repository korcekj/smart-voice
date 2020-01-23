import { moduleActionTypes } from './module.types';

const INITIAL_STATE = {
  availableModules: null,
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
        error: {
          message: null,
          type: null
        }
      };
    case moduleActionTypes.FETCH_MODULES_SUCCESS:
      return {
        ...state,
        availableModules: action.payload,
        error: {
          message: null,
          type: null
        }
      };
    case moduleActionTypes.ADD_MODULE_SUCCESS:
      return {
        ...state,
        availableModules: {
          ...state.availableModules,
          [action.payload.mac]: {
            ip: action.payload.ip
          }
        },
        error: {
          message: null,
          type: null
        }
      };
    case moduleActionTypes.FETCH_MODULES_FAILURE:
      return {
        ...state,
        error: {
          message: action.payload,
          type: moduleActionTypes.FETCH_MODULES_FAILURE
        }
      };
    case moduleActionTypes.ADD_MODULE_FAILURE:
      return {
        ...state,
        error: {
          message: action.payload,
          type: moduleActionTypes.ADD_MODULE_FAILURE
        }
      };
    default:
      return state;
  }
};

export default moduleReducer;
