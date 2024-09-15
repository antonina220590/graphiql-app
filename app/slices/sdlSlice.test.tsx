import schemaReducer, { setUrlSdl } from './sdlSlice';

describe('schemaSlice reducers', () => {
  it('should return the initial state', () => {
    const initialState = {
      urlSdl: '',
    };
    expect(schemaReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should set the urlSdl state when setUrlSdl is dispatched', () => {
    const initialState = {
      urlSdl: '',
    };

    const newUrl = 'http://example.com/schema.sdl';
    const newState = schemaReducer(initialState, setUrlSdl(newUrl));

    expect(newState.urlSdl).toBe(newUrl);
  });

  it('should override the urlSdl state', () => {
    const initialState = {
      urlSdl: 'http://old-url.com/schema.sdl',
    };

    const newUrl = 'http://new-url.com/schema.sdl';
    const newState = schemaReducer(initialState, setUrlSdl(newUrl));

    expect(newState.urlSdl).toBe(newUrl);
  });
});
