import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Header {
  key: string;
  value: string;
}

const initialState: Header[] = [{ key: '', value: '' }];

const headersSlice = createSlice({
  name: 'headers',
  initialState,
  reducers: {
    addHeader(state) {
      state.push({ key: '', value: '' });
    },
    updateHeader(
      state,
      action: PayloadAction<{
        index: number;
        field: 'key' | 'value';
        value: string;
      }>
    ) {
      const { index, field, value } = action.payload;
      if (state[index]) {
        state[index][field] = value;
      }
    },
    deleteHeader(state, action: PayloadAction<number>) {
      state.splice(action.payload, 1);
    },
    setHeaders(_state, action: PayloadAction<Header[]>) {
      return action.payload;
    },
    clearHeaders() {
      return initialState;
    },
  },
});

export const {
  addHeader,
  updateHeader,
  deleteHeader,
  setHeaders,
  clearHeaders,
} = headersSlice.actions;

export default headersSlice.reducer;
