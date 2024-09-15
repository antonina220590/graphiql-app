import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SchemaState {
  urlSdl: string;
}

const initialState: SchemaState = {
  urlSdl: '',
};

const schemaSlice = createSlice({
  name: 'schema',
  initialState,
  reducers: {
    setUrlSdl(state, action: PayloadAction<string>) {
      state.urlSdl = action.payload;
    },
    clearUrlSdl(state) {
      state.urlSdl = '';
    },
  },
});

export const { setUrlSdl, clearUrlSdl } = schemaSlice.actions;
export default schemaSlice.reducer;
