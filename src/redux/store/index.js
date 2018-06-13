import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as reducer from '../reducer/';
import thunk from 'redux-thunk';
import AppNavigator from '../../config/route';
import { createNavigationReducer, createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers"; // 中间件，有了这个就可以支持异步action
//创建一个 Redux store 来以存放应用中所有的 state，应用中应有且仅有一个 store
const navReducer = createNavigationReducer(AppNavigator);
const middleware = createReactNavigationReduxMiddleware(
        "root",
        state => state.nav
);

const store = createStore(
        combineReducers({ ...reducer, nav: navReducer }),
        applyMiddleware(middleware)
);

export default store;