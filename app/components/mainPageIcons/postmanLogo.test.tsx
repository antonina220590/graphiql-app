import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import PostmanIcon from './postmanLogo';

describe('PostmanIcon', () => {
  test('renders the SVG correctly', () => {
    render(<PostmanIcon />);
    const svgElement = screen.getByTestId('postman-icon');

    expect(svgElement).toHaveAttribute('width', '200px');
    expect(svgElement).toHaveAttribute('height', '200px');
    expect(svgElement).toHaveAttribute('viewBox', '0 0 256 256');
    expect(svgElement).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
    expect(svgElement).toHaveAttribute('preserveAspectRatio', 'xMidYMid');
  });
});
