import { createSelector } from 'reselect';

const selectModules = state => state.modules;

export const selectAvailableModules = createSelector(
  [selectModules],
  modules => modules.availableModules
);

export const selectError = createSelector([selectModules], ({ error }) =>
  error.type && error.message ? error : {}
);

export const selectModule = moduleId =>
  createSelector([selectAvailableModules], modules =>
    modules ? modules[moduleId] : null
  );

export const selectAreModulesFetched = createSelector(
  [selectModules],
  modules => !!modules.availableModules
);
