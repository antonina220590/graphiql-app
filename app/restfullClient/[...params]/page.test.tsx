import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import RestfullModule from './page';

describe('RestfullModule', () => {
  it('should render RESTfullClient component', () => {
    render(<RestfullModule />);
    expect(screen.getByText('REST Client')).toBeInTheDocument();
  });
});
