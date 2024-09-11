import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import configureStore, { MockStore } from 'redux-mock-store';
import { toast } from 'sonner';

import GraphiQLClient from './page';

interface EditorEventData {}

interface EditorInstance {}
type ChangeHandler = (
  editor: EditorInstance | null,
  data: EditorEventData | null,
  value: string
) => void;

interface ControlledProps {
  value?: string;
  onChange: ChangeHandler;
  'data-testid'?: string;
  placeholder?: string;
}

vi.mock('./HeadersPanel', () => {
  return function MockHeadersPanel() {
    return <div data-testid="mock-headers-panel">Mock Headers Panel</div>;
  };
});

vi.mock('@uiw/react-codemirror', () => {
  const Controlled = ({
    value = '',
    onChange,
    'data-testid': testId,
    placeholder,
  }: ControlledProps) => {
    return (
      <textarea
        value={value}
        data-testid={testId}
        placeholder={placeholder}
        onChange={(e) => onChange(null, null, e.target.value)}
        style={{
          height: '300px',
          width: '100%',
          border: '1px solid lightgray',
        }}
      />
    );
  };

  return {
    Controlled,
    default: Controlled,
  };
});

vi.mock('sonner', () => ({
  toast: vi.fn(),
}));

const mockStore = configureStore([]);

describe('GraphiQLClient', () => {
  let store: MockStore;

  const renderComponent = () => {
    render(
      <Provider store={store}>
        <GraphiQLClient />
      </Provider>
    );
  };

  beforeEach(() => {
    store = mockStore({
      schema: {
        urlSdl: '',
      },
      headers: [],
      variables: { value: '{"key": "value"}' },
    });

    store.dispatch = vi.fn();
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders GraphiQLClient without crashing and contains essential elements', () => {
    renderComponent();

    expect(screen.getByText(/GraphiQL Client/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Endpoint URL')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Endpoint URL SDL')).toBeInTheDocument();
    expect(screen.getByTestId('sendUrl')).toBeInTheDocument();
    expect(screen.getByTestId('sendSdl')).toBeInTheDocument();
  });

  it('shows error toast when Send is clicked without URL and query', async () => {
    renderComponent();

    fireEvent.click(screen.getByTestId('sendUrl'));

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(
        'Oooops! Something went wrong!',
        expect.objectContaining({
          description: 'Please provide URL and query',
        })
      );
    });
  });

  it('updates URL and query state when input values change', () => {
    renderComponent();

    const urlInput = screen.getByPlaceholderText('Endpoint URL');
    const queryInput = screen.getByPlaceholderText(
      '# Write your query or mutation here'
    );

    fireEvent.change(urlInput, {
      target: { value: 'https://example.com/graphql' },
    });
    fireEvent.change(queryInput, {
      target: { value: '{ user { id name } }' },
    });

    expect(urlInput).toHaveValue('https://example.com/graphql');
    expect(queryInput).toHaveValue('{ user { id name } }');
  });

  it('shows error toast when Send is clicked without URL and query', async () => {
    renderComponent();

    fireEvent.click(screen.getByTestId('sendUrl'));

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(
        'Oooops! Something went wrong!',
        expect.objectContaining({
          description: 'Please provide URL and query',
        })
      );
    });
  });

  it('renders components with initial state', () => {
    renderComponent();

    expect(screen.getByText(/GraphiQL Client/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Endpoint URL')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Endpoint URL SDL')).toBeInTheDocument();
    expect(screen.getByTestId('sendUrl')).toBeInTheDocument();
    expect(screen.getByTestId('sendSdl')).toBeInTheDocument();
  });

  it('renders the Schema Panel', () => {
    renderComponent();
    expect(screen.getByTestId('schema-panel')).toBeInTheDocument();
  });
});
