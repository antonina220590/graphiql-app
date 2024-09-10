import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import RestParams from './RestParams';

describe('RestParams', () => {
  const mockParams = [
    { keyParam: 'param1', valueParam: 'value1' },
    { keyParam: 'param2', valueParam: 'value2' },
  ];

  it('calls removeParam when delete button is clicked', () => {
    const removeParamMock = vi.fn();
    render(
      <RestParams
        params={mockParams}
        handleParamChange={vi.fn()}
        removeParam={removeParamMock}
        addParam={vi.fn()}
      />
    );

    const deleteButton = screen.getAllByRole('button')[0];
    fireEvent.click(deleteButton);

    expect(removeParamMock).toHaveBeenCalledWith(0);
  });

  it('calls addParam when Add Params button is clicked', () => {
    const addParamMock = vi.fn();
    render(
      <RestParams
        params={mockParams}
        handleParamChange={vi.fn()}
        removeParam={vi.fn()}
        addParam={addParamMock}
      />
    );

    const addButton = screen.getByRole('button', { name: /Add Params/i });
    fireEvent.click(addButton);

    expect(addParamMock).toHaveBeenCalled();
  });
});
