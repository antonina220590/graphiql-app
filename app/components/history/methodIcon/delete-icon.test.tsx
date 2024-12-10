import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import DelIcon from './delete-icon';

describe('DelIcon component', () => {
  it('renders the DelIcon with correct text and styles', () => {
    render(<DelIcon />);
    const element = screen.getByText('DEL');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('DEL');
    expect(element).toHaveClass('text-2.5xl');
    expect(element).toHaveClass('text-red-700');
    expect(element).toHaveClass('font-bold');
  });
});
