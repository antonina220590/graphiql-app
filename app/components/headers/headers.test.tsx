import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import configureStore, { MockStore } from 'redux-mock-store';

import HeadersPanel from './headers';
import {
  addHeader,
  updateHeader,
  deleteHeader,
} from '../../slices/headersSlice';

vi.mock('@uiw/react-codemirror', () => {
  return {
    default: ({
      value = '',
      onChange,
      placeholder = '',
    }: {
      value: string;
      onChange: (value: string) => void;
      placeholder: string;
    }) => (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    ),
  };
});

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

  it('toggles open and close panel', () => {
    render(
      <Provider store={store}>
        <HeadersPanel />
      </Provider>
    );
    const toggleButton = screen.getByRole('button', {
      name: /▼/,
    });
    const panelDiv = screen.getByTestId('panel');
    expect(panelDiv).toHaveClass('translate-y-full');
    fireEvent.click(toggleButton);
    expect(panelDiv).toHaveClass('translate-y-0');
    fireEvent.click(toggleButton);
    expect(panelDiv).toHaveClass('translate-y-full');
  });
  it('dispatches addHeader action when Add Header button is clicked', () => {
    render(
      <Provider store={store}>
        <HeadersPanel />
      </Provider>
    );

    const addHeaderButton = screen.getByText('Add Header');
    fireEvent.click(addHeaderButton);

    expect(addHeader).toHaveBeenCalled();
  });

  it('dispatches updateHeader action when header value is changed', () => {
    render(
      <Provider store={store}>
        <HeadersPanel />
      </Provider>
    );

    const headerTextarea = screen.getAllByPlaceholderText('Content-Type')[0];
    fireEvent.change(headerTextarea, { target: { value: 'Accept' } });

    expect(updateHeader).toHaveBeenCalledWith({
      index: 0,
      field: 'key',
      value: 'Accept',
    });
  });

  it('dispatches updateHeader action when header value is changed', () => {
    render(
      <Provider store={store}>
        <HeadersPanel />
      </Provider>
    );

    const headerTextarea = screen.getAllByPlaceholderText('Content-Type')[0];
    fireEvent.change(headerTextarea, { target: { value: 'Accept' } });

    expect(updateHeader).toHaveBeenCalledWith({
      index: 0,
      field: 'key',
      value: 'Accept',
    });
  });
  it('dispatches deleteHeader action when delete button is clicked', () => {
    render(
      <Provider store={store}>
        <HeadersPanel />
      </Provider>
    );
    const deleteButton = screen.getByRole('button', {
      name: /delete header/i,
    });
    fireEvent.click(deleteButton);

    expect(deleteHeader).toHaveBeenCalledWith(0);
  });

  it('renders CodeMirror with default value', async () => {
    render(
      <Provider store={store}>
        <HeadersPanel />
      </Provider>
    );
    const variablesButton = screen.getByRole('button', { name: /Variables/i });
    fireEvent.click(variablesButton);
    const codeMirror = await screen.findByPlaceholderText(/{"key": "value"}/i);
    expect(codeMirror).toBeInTheDocument();
  });
});
