import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import InputUrl from './InputUrl';

describe('InputUrl Component', () => {
  it('renders correctly with initial props', () => {
    const setUrl = () => {};
    render(<InputUrl url="http://test.com" setUrl={setUrl} />);

    const inputElement = screen.getByPlaceholderText(/endpoint url/i);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('http://test.com');
  });

  it('calls setUrl function on input change', () => {
    const setUrlMock = vi.fn();
    render(<InputUrl url="" setUrl={setUrlMock} />);

    const inputElement = screen.getByPlaceholderText(/endpoint url/i);

    fireEvent.change(inputElement, { target: { value: 'http://test.com' } });

    expect(setUrlMock).toHaveBeenCalledTimes(1);
    expect(setUrlMock).toHaveBeenCalledWith('http://test.com');
  });
});
