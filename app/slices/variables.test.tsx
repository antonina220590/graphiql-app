import variablesReducer, {
  setVariables,
  clearVariables,
} from './variablesSlice';

describe('variablesSlice reducers', () => {
  it('should return the initial state', () => {
    const initialState = {
      value: '',
    };
    expect(variablesReducer(undefined, { type: undefined })).toEqual(
      initialState
    );
  });

  it('should set the value state when setVariables is dispatched', () => {
    const initialState = {
      value: '',
    };

    const newValue = 'some new variable';
    const newState = variablesReducer(initialState, setVariables(newValue));

    expect(newState.value).toBe(newValue);
  });

  it('should clear the value state when clearVariables is dispatched', () => {
    const initialState = {
      value: 'some existing variable',
    };

    const newState = variablesReducer(initialState, clearVariables());

    expect(newState.value).toBe('');
  });
});
