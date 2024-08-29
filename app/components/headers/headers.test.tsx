import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import configureStore, { MockStore } from 'redux-mock-store';

import HeadersPanel from './headers';
// import {
//   addHeader,
//   updateHeader,
//   deleteHeader,
// } from '../../slices/headersSlice';
// import { setVariables } from '../../slices/variablesSlice';

const mockStore = configureStore([]);
const initialState = {
  headers: [{ key: 'Content-Type', value: 'application/json' }],
  variables: { value: '{"key":"value"}' },
};

vi.mock('../../slices/headersSlice', () => ({
  addHeader: vi.fn(() => ({ type: 'headers/addHeader' })),
  updateHeader: vi.fn(),
  deleteHeader: vi.fn(),
}));

vi.mock('../../slices/variablesSlice', () => ({
  setVariables: vi.fn(),
}));

describe('HeadersPanel', () => {
  let store: MockStore;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = vi.fn();
  });

  it('renders HeadersPanel component', () => {
    render(
      <Provider store={store}>
        <HeadersPanel />
      </Provider>
    );
    expect(screen.getByText('Headers:')).to.exist;
  });
});
