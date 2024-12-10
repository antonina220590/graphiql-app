import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import OptionIcon from './option-icon';

describe('OptionIcon Component', () => {
  it('should render the text "OPTION" with the correct styles', () => {
    render(<OptionIcon />);

    const optionElement = screen.getByText('OPTION');

    expect(optionElement).toBeInTheDocument();
    expect(optionElement).toHaveClass('text-2.5xl');
    expect(optionElement).toHaveClass('text-fuchsia-700');
    expect(optionElement).toHaveClass('font-bold');
  });
});
