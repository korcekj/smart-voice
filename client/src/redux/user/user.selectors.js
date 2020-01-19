import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);

export const selectError = createSelector([selectUser], ({ error }) =>
  error.type && error.message ? error : {}
);
