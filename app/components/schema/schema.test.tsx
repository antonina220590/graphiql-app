import { render, screen, fireEvent, act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import configureStore, { MockStore } from 'redux-mock-store';

import SchemaPanel from './schema';

vi.mock('graphql', () => ({
  buildClientSchema: vi.fn(),
  getIntrospectionQuery: vi.fn().mockReturnValue('mockQuery'),
  printSchema: vi.fn().mockReturnValue('mockSchema'),
}));

vi.mock('sonner', () => ({
  toast: vi.fn(),
}));

const mockStore = configureStore([]);

describe('SchemaPanel', () => {
  let store: MockStore;

  beforeEach(() => {
    store = mockStore({
      schema: {
        urlSdl: 'https://mock-graphql-url.com',
      },
    });
    store.dispatch = vi.fn();

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ data: { __schema: {} } }),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <SchemaPanel />
        </Provider>
      );
    });
    expect(screen.getByText(/GraphQL Schema/i)).toBeInTheDocument();
  });

  it('toggles panel open and closed', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <SchemaPanel />
        </Provider>
      );
    });

    const toggleButton = screen.getByRole('button', {
      name: /Schema/i,
    });

    const schemaPanel = screen.getByTestId('schema-panel');
    await act(async () => {
      fireEvent.click(toggleButton);
    });
    expect(schemaPanel).toHaveClass('translate-x-0');

    await act(async () => {
      fireEvent.click(toggleButton);
    });
    expect(schemaPanel).toHaveClass('translate-x-full');
  });
});
