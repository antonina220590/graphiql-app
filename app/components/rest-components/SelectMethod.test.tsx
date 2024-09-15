import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import SelectMethod from './SelectMethod';

describe('SelectMethod Component', () => {
  it('renders correctly with the initial method', () => {
    const setMethod = vi.fn();
    render(<SelectMethod method="GET" setMethod={setMethod} />);

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveValue('GET');
  });

  it('calls setMethod function on selection change', () => {
    const setMethodMock = vi.fn();
    render(<SelectMethod method="GET" setMethod={setMethodMock} />);

    const selectElement = screen.getByRole('combobox');

    fireEvent.change(selectElement, { target: { value: 'POST' } });

    expect(setMethodMock).toHaveBeenCalledTimes(1);
    expect(setMethodMock).toHaveBeenCalledWith('POST');
  });
});
