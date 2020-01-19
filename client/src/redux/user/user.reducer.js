import { userActionTypes } from './user.types';

const INITIAL_STATE = {
  currentUser: undefined,
  error: {
    message: null,
    type: null
  }
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: { message: null, type: null }
      };
    case userActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: { message: null, type: null }
      };
    case userActionTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        currentUser: null,
        error: {
          message: action.payload,
          type: userActionTypes.SIGN_IN_FAILURE
        }
      };
    case userActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        currentUser: null,
        error: {
          message: action.payload,
          type: userActionTypes.SIGN_UP_FAILURE
        }
      };
    case userActionTypes.SIGN_OUT_FAILURE:
      return {
        ...state,
        error: {
          message: action.payload,
          type: userActionTypes.SIGN_OUT_FAILURE
        }
      };
    default:
      return state;
  }
};

export default userReducer;
