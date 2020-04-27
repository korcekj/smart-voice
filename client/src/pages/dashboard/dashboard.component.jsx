import React, { lazy, Suspense, useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchModulesStart } from '../../redux/module/module.actions';

import UserHeader from '../../components/user-header/user-header.component';
import Spinner from '../../components/spinner/spinner.component';
import PrivateRoute from '../../components/private-route/private-route.container';

import { DashboardOverlay } from './dashboard.styles';

const ModulesPage = lazy(() => import('../modules/modules.container'));
const ModulePage = lazy(() => import('../module/module.container'));
const HardwarePage = lazy(() => import('../hardware/hardware.container'));
const SettingsPage = lazy(() => import('../settings/settings.component'));

const DashboardPage = ({ match, fetchModulesStart }) => {
  useEffect(() => {
    fetchModulesStart();
  }, [fetchModulesStart]);

  return (
    <DashboardOverlay>
      <UserHeader />
      <Suspense fallback={<Spinner />}>
        <PrivateRoute path={match.path} exact component={ModulesPage} />
        <PrivateRoute
          exact
          path={`${match.path}/module/:moduleId`}
          component={ModulePage}
        />
        <PrivateRoute
          exact
          path={`${match.path}/module/:moduleId/:hardwareType/:hardwareId`}
          component={HardwarePage}
        />
        <PrivateRoute
          exact
          path={`${match.path}/settings`}
          component={SettingsPage}
        />
      </Suspense>
    </DashboardOverlay>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchModulesStart: () => dispatch(fetchModulesStart()),
});

export default connect(null, mapDispatchToProps)(DashboardPage);
