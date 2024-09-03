import { render, screen, fireEvent, act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import configureStore, { MockStore } from 'redux-mock-store';
import { toast } from 'sonner';

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

  it('displays an error message if fetching schema fails', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: () => Promise.resolve({ errors: [{ message: 'Error fetching' }] }),
    });

    await act(async () => {
      render(
        <Provider store={store}>
          <SchemaPanel />
        </Provider>
      );
    });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(toast).toHaveBeenCalledWith(
      'Oooops! Something went wrong!',
      expect.any(Object)
    );
    expect(
      screen.getByText(/Cannot read properties of undefined/i)
    ).toBeInTheDocument();
  });

  it('the panel is resized when the handle is dragged', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <SchemaPanel />
        </Provider>
      );
    });

    const resizeHandle = screen.getByTestId('resize-handle');
    const schemaPanel = screen.getByTestId('schema-panel');
    expect(schemaPanel).toHaveStyle('width: 300px');
    fireEvent.mouseDown(resizeHandle);
    fireEvent.mouseMove(resizeHandle, { clientX: 250 });
    fireEvent.mouseUp(resizeHandle);
    expect(schemaPanel).toHaveStyle('width: 774px');
  });
});
