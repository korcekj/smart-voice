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
    case moduleActionTypes.ADD_MODULE_START:
    case moduleActionTypes.REMOVE_MODULE_START:
    case moduleActionTypes.ADD_HARDWARE_START:
    case moduleActionTypes.REMOVE_HARDWARE_START:
    case moduleActionTypes.UPDATE_HARDWARE_START:
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
    case moduleActionTypes.ADD_MODULE_SUCCESS:
      return {
        ...state,
        availableModules: {
          ...state.availableModules,
          [action.payload.id]: {
            ...action.payload.module
          }
        },
        isFetching: false,
        error: {
          message: null,
          type: null
        }
      };
    case moduleActionTypes.REMOVE_MODULE_SUCCESS:
      return {
        ...state,
        availableModules: {
          ...Object.keys(state.availableModules).reduce((memo, key) => {
            if (key !== action.payload) memo[key] = state.availableModules[key];
            return memo;
          }, {})
        },
        isFetching: false,
        error: {
          message: null,
          type: null
        }
      };
    case moduleActionTypes.ADD_HARDWARE_SUCCESS:
    case moduleActionTypes.UPDATE_HARDWARE_SUCCESS:
      return {
        ...state,
        availableModules: {
          ...state.availableModules,
          [action.payload.moduleId]: {
            ...state.availableModules[action.payload.moduleId],
            hardware: {
              ...state.availableModules[action.payload.moduleId].hardware,
              [action.payload.type]: {
                ...(state.availableModules[action.payload.moduleId]
                  .hardware && {
                  ...state.availableModules[action.payload.moduleId].hardware[
                    action.payload.type
                  ]
                }),
                [action.payload.id]: {
                  ...action.payload.hardware
                }
              }
            }
          }
        },
        isFetching: false,
        error: {
          message: null,
          type: null
        }
      };
    case moduleActionTypes.REMOVE_HARDWARE_SUCCESS:
      return {
        ...state,
        availableModules: {
          ...state.availableModules,
          [action.payload.moduleId]: {
            ...state.availableModules[action.payload.moduleId],
            hardware: {
              ...state.availableModules[action.payload.moduleId].hardware,
              [action.payload.type]: {
                ...(state.availableModules[action.payload.moduleId]
                  .hardware && {
                  ...Object.keys(
                    state.availableModules[action.payload.moduleId].hardware[
                      action.payload.type
                    ]
                  ).reduce((memo, key) => {
                    if (key !== action.payload.id)
                      memo[key] =
                        state.availableModules[
                          action.payload.moduleId
                        ].hardware[action.payload.type][key];
                    return memo;
                  }, {})
                })
              }
            }
          }
        },
        isFetching: false,
        error: {
          message: null,
          type: null
        }
      };
    case moduleActionTypes.FETCH_MODULES_FAILURE:
    case moduleActionTypes.ADD_MODULE_FAILURE:
    case moduleActionTypes.REMOVE_MODULE_FAILURE:
    case moduleActionTypes.ADD_HARDWARE_FAILURE:
    case moduleActionTypes.REMOVE_HARDWARE_FAILURE:
    case moduleActionTypes.UPDATE_HARDWARE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: {
          message: action.payload,
          type: action.type
        }
      };
    default:
      return state;
  }
};

export default moduleReducer;
