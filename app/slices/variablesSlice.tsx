import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VariablesState {
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
  },
});

export const { setVariables } = variablesSlice.actions;
export default variablesSlice.reducer;
