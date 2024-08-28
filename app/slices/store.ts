import { configureStore } from '@reduxjs/toolkit';

import headersReducer from './headersSlice';

export const store = configureStore({
  reducer: {
    headers: headersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
