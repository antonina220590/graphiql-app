import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import PutIcon from './put-icon';

describe('PutIcon Component', () => {
  it('should render the text "PUT" with the correct styles', () => {
    render(<PutIcon />);

    const putElement = screen.getByText('PUT');

    expect(putElement).toBeInTheDocument();
    expect(putElement).toHaveClass('text-2.5xl');
    expect(putElement).toHaveClass('text-blue-800');
    expect(putElement).toHaveClass('font-bold');
  });
});
