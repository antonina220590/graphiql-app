import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import HandShakeIcon from './handshake';

describe('HandShakeIcon', () => {
  test('renders the SVG correctly', () => {
    render(<HandShakeIcon />);
    const svgElement = screen.getByTestId('handshake-icon');

    expect(svgElement).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
    expect(svgElement).toHaveAttribute('width', '100');
    expect(svgElement).toHaveAttribute('height', '100');
  });
});
