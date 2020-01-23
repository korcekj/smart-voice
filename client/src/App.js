import React, { lazy, Suspense, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

import { GlobalStyles } from './global.styles';

import Header from './components/header/header.component';
import Spinner from './components/spinner/spinner.component';
import PublicRoute from './components/public-route/public-route.container';
import PrivateRoute from './components/private-route/private-route.container';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const DashboardPage = lazy(() =>
  import('./pages/dashboard/dashboard.component')
);
const SignInAndSignUpPage = lazy(() =>
  import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component')
);

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <GlobalStyles />
      <Header />
      {currentUser === undefined ? (
        <Spinner />
      ) : (
        <Switch>
          <Suspense fallback={<Spinner />}>
            <PublicRoute
              exact
              path='/'
              isAuth={!!currentUser}
              component={HomePage}
            />
            <PublicRoute
              path='/signin'
              isAuth={!!currentUser}
              component={SignInAndSignUpPage}
            />
            <PrivateRoute
              path='/user'
              isAuth={!!currentUser}
              component={DashboardPage}
            />
          </Suspense>
        </Switch>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
