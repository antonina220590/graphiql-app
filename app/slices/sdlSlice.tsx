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
  },
});

export const { setUrlSdl } = schemaSlice.actions;
export default schemaSlice.reducer;
