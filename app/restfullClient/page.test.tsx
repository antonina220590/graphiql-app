import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import RESTfullClient from './page';

interface ControlledProps {
  value: string;
  onBeforeChange: (
    editor: { getValue: () => string },
    data: { from: number; to: number },
    value: string
  ) => void;
  options?: {
    mode?: string;
    theme?: string;
  };
  className?: string;
}

vi.mock('react-codemirror2', () => ({
  Controlled: ({ value, onBeforeChange, className }: ControlledProps) => {
    return (
      <textarea
        value={value}
        onChange={(e) =>
          onBeforeChange(
            { getValue: () => e.target.value },
            { from: 0, to: e.target.value.length },
            e.target.value
          )
        }
        className={className}
      />
    );
  },
}));

vi.mock('sonner', () => ({
  toast: vi.fn(),
}));

vi.mock('./helpers/urlHelper', () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe('RESTfullClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window.history, 'pushState').mockImplementation(() => {});
  });

  it('should render the component with initial values', () => {
    render(<RESTfullClient />);
    expect(screen.getByPlaceholderText('Endpoint URL')).toBeInTheDocument();
  });

  it('should handle URL input change', () => {
    render(<RESTfullClient />);
    const urlInput = screen.getByPlaceholderText(
      'Endpoint URL'
    ) as HTMLInputElement;
    fireEvent.change(urlInput, {
      target: { value: 'https://api.example.com' },
    });
    expect(urlInput.value).toBe('https://api.example.com');
  });

  it('should handle method change', () => {
    render(<RESTfullClient />);
    const selectMethod = screen.getByRole('combobox') as HTMLSelectElement;
    fireEvent.change(selectMethod, { target: { value: 'POST' } });
    expect(selectMethod.value).toBe('POST');
  });
});
