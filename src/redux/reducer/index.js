import { NavigationActions } from 'react-navigation';
import { RootNavigator } from '../../navigation/';

const firstAction = RootNavigator.router.getActionForPathAndParams('Home');
const tempNavState = RootNavigator.router.getStateForAction(firstAction);
const initialNavState = RootNavigator.router.getStateForAction(
      tempNavState
);

const nav = (state = initialNavState, action) => {
  let nextState;
  switch (action) {
    case 'Login':
      nextState = RootNavigator.router.getStateForAction(
            NavigationActions.back(),
            state
      );
      break;
    case 'Logout':
      nextState = RootNavigator.router.getStateForAction(
            NavigationActions.navigate({ routeName: 'Upload' }),
            state
      );
      break;
    default:
      nextState = RootNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

const PHOTO_VIEWS_REDUCER = (state = '', action) => {
  switch (action.type) {
    case 'PHOTO_VIEWS':
      return action.item;
    default:
      return state;
  }
};

export { nav, PHOTO_VIEWS_REDUCER };