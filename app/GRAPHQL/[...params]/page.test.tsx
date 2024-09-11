import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import GraphiQLModule from './page';

const mockStore = configureStore([]);

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

describe('GraphiQLModule', () => {
  it('should render GraphiQLModule component', () => {
    const store = mockStore({
      schema: {
        urlSdl: '',
      },
      headers: [],
      variables: { value: '{"key": "value"}' },
    });

    render(
      <Provider store={store}>
        <GraphiQLModule />
      </Provider>
    );
    expect(screen.getByText('GraphiQL Client')).toBeInTheDocument();
  });
});
