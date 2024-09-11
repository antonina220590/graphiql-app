import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import PostIcon from './post-icon';

describe('PostIcon Component', () => {
  it('should render the text "POST" with the correct styles', () => {
    render(<PostIcon />);

    const postElement = screen.getByText('POST');

    expect(postElement).toBeInTheDocument();
    expect(postElement).toHaveClass('text-2.5xl');
    expect(postElement).toHaveClass('text-amber-500');
    expect(postElement).toHaveClass('font-bold');
  });
});
