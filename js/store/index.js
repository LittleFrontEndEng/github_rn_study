import {legacy_createStore, createStore, applyMiddleware} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import reducers from '../renducer/index';
const logger = store => next => action => {
  if (typeof action === 'function') {
    console.log('dispatching a function');
  } else {
    // console.log('dispatching', action);
  }
  const result = next(action);
  console.log('nextState', store.getState());
  return result;
};
const middlewares = [logger, thunk];

export default legacy_createStore(reducers, applyMiddleware(...middlewares));
