import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import { configureStore } from '@reduxjs/toolkit';

const loggerMiddleware = (store) => (next) => (action) => {
  if(!action.type){
    return next(action);
  }

  console.log('type', action.type);
  console.log('payload', action.payload);
  console.log('currentState: ', store.getState());

  next(action);
  console.log('next state: ', store.getState())
}
const middlewares = [logger, loggerMiddleware];

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
  devTools: process.env.NODE_ENV !== 'production', // 仅在开发环境中启用 Redux DevTools
});

export default store;