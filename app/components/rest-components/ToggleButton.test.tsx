import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import ToggleButton from './ToggleButton';

describe('ToggleButton', () => {
  it('should call onClick when button is clicked', () => {
    const onClick = vi.fn();
    render(
      <ToggleButton
        isOpen={false}
        onClick={onClick}
        openText="Hide Variables"
        closedText="Show Variables"
      />
    );

    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});
