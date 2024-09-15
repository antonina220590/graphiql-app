import { render, screen } from '@testing-library/react';
import RestfullModule from './page';

vi.mock('../page', () => {
  return {
    __esModule: true,
    default: () => <div>Mocked RESTfullClient Component</div>,
  };
});

describe('RestfullModule', () => {
  it('should render RESTfullClient component', () => {
    render(<RestfullModule />);
    expect(
      screen.getByText('Mocked RESTfullClient Component')
    ).toBeInTheDocument();
  });
});
