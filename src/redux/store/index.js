import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as reducer from '../reducer/';
import thunk from 'redux-thunk';
import { middleware } from '../../navigation';

const store = createStore(
      combineReducers({ ...reducer }),
      applyMiddleware(middleware)
);

export default store;