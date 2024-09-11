import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import RestHeders from './RestHeaders';

describe('RestHeders Component', () => {
  const mockHeaders = [
    { keyHeader: 'Content-Type', valueHeader: 'application/json' },
  ];

  it('renders correctly with initial headers', () => {
    render(
      <RestHeders
        headers={mockHeaders}
        handleHeaderChange={vi.fn()}
        removeHeader={vi.fn()}
        addHeader={vi.fn()}
      />
    );

    expect(screen.getByText(/Headers:/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Content-Type/)).toHaveValue(
      'Content-Type'
    );
    expect(screen.getByPlaceholderText(/application\/json/)).toHaveValue(
      'application/json'
    );
  });

  it('calls handleHeaderChange when key header is changed', () => {
    const handleHeaderChangeMock = vi.fn();
    render(
      <RestHeders
        headers={mockHeaders}
        handleHeaderChange={handleHeaderChangeMock}
        removeHeader={vi.fn()}
        addHeader={vi.fn()}
      />
    );

    const keyInput = screen.getByPlaceholderText(/Content-Type/);
    fireEvent.change(keyInput, { target: { value: 'Accept' } });

    expect(handleHeaderChangeMock).toHaveBeenCalledTimes(1);
    expect(handleHeaderChangeMock).toHaveBeenCalledWith(
      0,
      'keyHeader',
      'Accept'
    );
  });

  it('calls handleHeaderChange when value header is changed', () => {
    const handleHeaderChangeMock = vi.fn();
    render(
      <RestHeders
        headers={mockHeaders}
        handleHeaderChange={handleHeaderChangeMock}
        removeHeader={vi.fn()}
        addHeader={vi.fn()}
      />
    );

    const valueInput = screen.getByPlaceholderText(/application\/json/);
    fireEvent.change(valueInput, { target: { value: 'text/plain' } });

    expect(handleHeaderChangeMock).toHaveBeenCalledTimes(1);
    expect(handleHeaderChangeMock).toHaveBeenCalledWith(
      0,
      'valueHeader',
      'text/plain'
    );
  });

  it('calls removeHeader when delete button is clicked', () => {
    const removeHeaderMock = vi.fn();
    render(
      <RestHeders
        headers={mockHeaders}
        handleHeaderChange={vi.fn()}
        removeHeader={removeHeaderMock}
        addHeader={vi.fn()}
      />
    );

    const deleteButton = screen.getByTestId('trash-button');
    fireEvent.click(deleteButton);

    expect(removeHeaderMock).toHaveBeenCalledTimes(1);
    expect(removeHeaderMock).toHaveBeenCalledWith(0);
  });

  it('calls addHeader when Add Header button is clicked', () => {
    const addHeaderMock = vi.fn();
    render(
      <RestHeders
        headers={mockHeaders}
        handleHeaderChange={vi.fn()}
        removeHeader={vi.fn()}
        addHeader={addHeaderMock}
      />
    );

    const addButton = screen.getByRole('button', { name: /Add Header/i });
    fireEvent.click(addButton);

    expect(addHeaderMock).toHaveBeenCalledTimes(1);
  });
});
