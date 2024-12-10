import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import HeadIcon from './head-icon';

describe('HeadIcon Component', () => {
  it('should render the text "HEAD" with the correct styles', () => {
    render(<HeadIcon />);

    const headElement = screen.getByText('HEAD');
    expect(headElement).toBeInTheDocument();
    expect(headElement).toHaveClass('text-2.5xl');
    expect(headElement).toHaveClass('text-green-600');
    expect(headElement).toHaveClass('font-bold');
  });
});
