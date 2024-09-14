import headersReducer, {
  addHeader,
  updateHeader,
  deleteHeader,
  setHeaders,
} from './headersSlice';
import { Header } from './headersSlice';

describe('headersSlice reducers', () => {
  it('should return the initial state', () => {
    const initialState = [{ key: '', value: '' }];
    expect(headersReducer(undefined, { type: undefined })).toEqual(
      initialState
    );
  });

  it('should add a header', () => {
    const initialState: Header[] = [{ key: '', value: '' }];
    const newState = headersReducer(initialState, addHeader());

    expect(newState).toEqual([
      { key: '', value: '' },
      { key: '', value: '' },
    ]);
  });

  it('should update a header', () => {
    const initialState = [
      { key: '', value: '' },
      { key: 'oldKey', value: 'oldValue' },
    ];

    const updatedState = headersReducer(
      initialState,
      updateHeader({ index: 1, field: 'key', value: 'newKey' })
    );

    expect(updatedState[1].key).toBe('newKey');
    expect(updatedState[1].value).toBe('oldValue');
  });

  it('should delete a header', () => {
    const initialState = [
      { key: 'header1', value: 'value1' },
      { key: 'header2', value: 'value2' },
    ];

    const newState = headersReducer(initialState, deleteHeader(0));

    expect(newState).toEqual([{ key: 'header2', value: 'value2' }]);
  });

  it('should set headers', () => {
    const initialState = [{ key: '', value: '' }];
    const newHeaders: Header[] = [
      { key: 'header1', value: 'value1' },
      { key: 'header2', value: 'value2' },
    ];

    const newState = headersReducer(initialState, setHeaders(newHeaders));

    expect(newState).toEqual(newHeaders);
  });
});
