import { createSelector } from 'reselect';

const selectModules = state => state.modules;

export const selectAvailableModules = createSelector(
  [selectModules],
  modules => modules.availableModules
);

export const selectError = createSelector([selectModules], ({ error }) =>
  error.type && error.message ? error : {}
);

export const selectIsFetching = createSelector(
  [selectModules],
  ({ isFetching }) => isFetching
);

export const selectModule = moduleId =>
  createSelector([selectAvailableModules], modules =>
    modules ? modules[moduleId] : null
  );

export const selectHardwareType = (moduleId, type) =>
  createSelector([state => selectModule(moduleId)(state)], module =>
    module ? (module.hardware ? module.hardware[type] : null) : null
  );

export const selectHardware = (moduleId, type, id) =>
  createSelector(
    [state => selectHardwareType(moduleId, type)(state)],
    hardware => (hardware ? hardware[id] : null)
  );

export const selectAreModulesFetched = createSelector(
  [selectModules],
  modules => !!modules.availableModules
);
