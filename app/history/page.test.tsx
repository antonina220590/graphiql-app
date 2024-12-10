import React from 'react';
import { render } from '@testing-library/react';

import History from './page';

vi.mock('../components/history/history', () => ({
  __esModule: true,
  default: () => (
    <div data-testid="mock-request-history">Mock Request History</div>
  ),
}));

describe('History Component', () => {
  it('should render RequestHistory', () => {
    const { getByTestId } = render(<History />);

    expect(getByTestId('mock-request-history')).toBeInTheDocument();
  });
});
