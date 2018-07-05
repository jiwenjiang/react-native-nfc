import React from 'react';
import { connect } from 'react-redux';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';

import RootNavigator from './route.js';

const middleware = createReactNavigationReduxMiddleware(
      'root',
      state => state.nav
);
const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

const mapStateToProps = state => ({
  state: state.nav,
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export { RootNavigator, AppNavigator, middleware };
