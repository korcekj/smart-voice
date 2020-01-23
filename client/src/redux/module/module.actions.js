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

export const addModuleStart = device => ({
  type: moduleActionTypes.ADD_MODULE_START,
  payload: device
});

export const addModuleSuccess = device => ({
  type: moduleActionTypes.ADD_MODULE_SUCCESS,
  payload: device
});

export const addModuleFailure = errorMessage => ({
  type: moduleActionTypes.ADD_MODULE_FAILURE,
  payload: errorMessage
});
