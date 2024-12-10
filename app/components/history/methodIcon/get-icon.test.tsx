import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import GETIcon from './get-icon';

describe('GETIcon Component', () => {
  it('should render the text "GET" with the correct styles', () => {
    render(<GETIcon />);

    const getElement = screen.getByText('GET');

    expect(getElement).toBeInTheDocument();
    expect(getElement).toHaveClass('text-2.5xl');
    expect(getElement).toHaveClass('text-green-600');
    expect(getElement).toHaveClass('font-bold');
  });
});
