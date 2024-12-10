import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import PatchIcon from './patch-icon';

describe('PatchIcon Component', () => {
  it('should render the text "PATCH" with the correct styles', () => {
    render(<PatchIcon />);

    const patchElement = screen.getByText('PATCH');

    expect(patchElement).toBeInTheDocument();
    expect(patchElement).toHaveClass('text-2.5xl');
    expect(patchElement).toHaveClass('text-violet-900');
    expect(patchElement).toHaveClass('font-bold');
  });
});
