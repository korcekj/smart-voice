import { createSelector } from 'reselect';

const selectModules = state => state.modules;

export const selectAvailableModules = createSelector(
  [selectModules],
  modules => modules.availableModules
);

export const selectAreModulesFetched = createSelector(
  [selectModules],
  modules => !!modules.availableModules
);
