import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface VariablesState {
  value: string;
}

const initialState: VariablesState = {
  value: '',
};

const variablesSlice = createSlice({
  name: 'variables',
  initialState,
  reducers: {
    setVariables(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
    clearVariables(state) {
      state.value = '';
    },
  },
});

export const { setVariables, clearVariables } = variablesSlice.actions;
export default variablesSlice.reducer;
