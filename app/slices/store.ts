import { configureStore } from '@reduxjs/toolkit';

import headersReducer from './headersSlice';
import variablesReducer from './variablesSlice';

export const store = configureStore({
  reducer: {
    headers: headersReducer,
    variables: variablesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
