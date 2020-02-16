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

export const addModuleStart = mac => ({
  type: moduleActionTypes.ADD_MODULE_START,
  payload: mac
});

export const addModuleSuccess = (id, module) => ({
  type: moduleActionTypes.ADD_MODULE_SUCCESS,
  payload: { id, module }
});

export const addModuleFailure = errorMessage => ({
  type: moduleActionTypes.ADD_MODULE_FAILURE,
  payload: errorMessage
});

export const removeModuleStart = mac => ({
  type: moduleActionTypes.REMOVE_MODULE_START,
  payload: mac
});

export const removeModuleSuccess = mac => ({
  type: moduleActionTypes.REMOVE_MODULE_SUCCESS,
  payload: mac
});

export const removeModuleFailure = errorMessage => ({
  type: moduleActionTypes.REMOVE_MODULE_FAILURE,
  payload: errorMessage
});

export const addHardwareStart = (hardware, type, moduleId) => ({
  type: moduleActionTypes.ADD_HARDWARE_START,
  payload: {
    hardware,
    type,
    moduleId
  }
});

export const addHardwareSuccess = (id, hardware, type, moduleId) => ({
  type: moduleActionTypes.ADD_HARDWARE_SUCCESS,
  payload: {
    id,
    hardware,
    type,
    moduleId
  }
});

export const addHardwareFailure = errorMessage => ({
  type: moduleActionTypes.ADD_HARDWARE_FAILURE,
  payload: errorMessage
});

export const removeHardwareStart = (id, type, moduleId) => ({
  type: moduleActionTypes.REMOVE_HARDWARE_START,
  payload: {
    id,
    type,
    moduleId
  }
});

export const removeHardwareSuccess = (id, type, moduleId) => ({
  type: moduleActionTypes.REMOVE_HARDWARE_SUCCESS,
  payload: {
    id,
    type,
    moduleId
  }
});

export const removeHardwareFailure = errorMessage => ({
  type: moduleActionTypes.REMOVE_HARDWARE_FAILURE,
  payload: errorMessage
});

export const updateHardwareStart = (id, hardware, type, moduleId) => ({
  type: moduleActionTypes.UPDATE_HARDWARE_START,
  payload: {
    id,
    hardware,
    type,
    moduleId
  }
});

export const updateHardwareSuccess = (id, hardware, type, moduleId) => ({
  type: moduleActionTypes.UPDATE_HARDWARE_SUCCESS,
  payload: {
    id,
    hardware,
    type,
    moduleId
  }
});

export const updateHardwareFailure = errorMessage => ({
  type: moduleActionTypes.UPDATE_HARDWARE_FAILURE,
  payload: errorMessage
});
