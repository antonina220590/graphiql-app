import { configureStore } from '@reduxjs/toolkit';

import headersReducer from './headersSlice';
import variablesReducer from './variablesSlice';
import schemaReducer from './sdlSlice';

export const store = configureStore({
  reducer: {
    headers: headersReducer,
    variables: variablesReducer,
    schema: schemaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
