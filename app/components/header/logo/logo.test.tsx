import React from 'react';
import { render } from '@testing-library/react';

import Logo from './logo';

describe('Logo Component', () => {
  it('should render the Link component with correct attributes', () => {
    const { getByRole } = render(<Logo />);

    const link = getByRole('link', { name: /pages/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
    expect(link).toHaveClass(
      'inline-block text-white bg-contain bg-center transition-opacity duration-300 w-[11.9rem] h-[9.5rem]'
    );
    expect(link).toHaveStyle({
      backgroundImage: "url('/logo.png')",
      textIndent: '-1234em',
      backgroundRepeat: 'no-repeat',
    });
  });
});
