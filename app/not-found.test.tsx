import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import NotFound from './not-found';

describe('NotFound Component', () => {
  it('renders the 404 error message', () => {
    render(<NotFound />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(
      screen.getByText('Ooops... We cannot find this page')
    ).toBeInTheDocument();
  });

  it('renders the "GO HOME" link', () => {
    render(<NotFound />);
    const linkElement = screen.getByText('GO HOME');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/');
  });
});
