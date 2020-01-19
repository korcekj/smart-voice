import { moduleActionTypes } from './module.types';

export const fetchModulesStart = () => ({
  type: moduleActionTypes.FETCH_MODULES_START
});

export const fetchModulesSuccess = modules => ({
  type: moduleActionTypes.FETCH_MODULES_SUCCESS,
  payload: modules
});

export const fetchModulesFailure = errorMessage => ({
  type: moduleActionTypes.FETCH_MODULES_FAILURE,
  payload: errorMessage
});
