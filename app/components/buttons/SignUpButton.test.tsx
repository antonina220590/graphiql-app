import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import SignUpButton from './SignUpButton';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('SignUpButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the button with correct text and styles', () => {
    render(<SignUpButton />);

    const button = screen.getByRole('button', { name: /sign up/i });
    expect(button).toBeInTheDocument();

    expect(button).toHaveClass('bg-green-900');
  });
});
