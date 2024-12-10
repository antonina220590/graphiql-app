import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Spinner from './spinner';

describe('Spinner Component', () => {
  it('renders correctly with the CogIcon and correct styles', () => {
    render(<Spinner />);

    const cogIcon = screen.getByTestId('CogIcon');

    expect(cogIcon).toBeInTheDocument();
    expect(cogIcon).toHaveClass('w-8');
    expect(cogIcon).toHaveClass('h-8');
    expect(cogIcon).toHaveClass('text-orange-500');
    expect(cogIcon).toHaveClass('animate-spin');
  });
});
