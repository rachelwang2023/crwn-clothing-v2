import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import { configureStore } from '@reduxjs/toolkit';
const middlewares = [logger];

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
  devTools: process.env.NODE_ENV !== 'production', // 仅在开发环境中启用 Redux DevTools
});

export default store;