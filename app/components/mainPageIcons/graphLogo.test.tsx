import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import GraphQLIcon from './graphLogo';

describe('GraphQLIcon', () => {
  test('renders the SVG correctly', () => {
    render(<GraphQLIcon />);

    const svgElement = screen.getByTestId('graphql-icon');
    expect(svgElement).toHaveAttribute('width', '200px');
    expect(svgElement).toHaveAttribute('height', '200px');
    expect(svgElement).toHaveAttribute('viewBox', '-16 0 288 288');
  });

  test('matches snapshot', () => {
    const { asFragment } = render(<GraphQLIcon />);
    expect(asFragment()).toMatchSnapshot();
  });
});
