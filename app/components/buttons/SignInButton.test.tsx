import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import SignInButton from './SignInButton';

vi.mock('next/router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('SignInButton', () => {
  it('renders the button with correct text and styles', () => {
    render(<SignInButton />);

    const button = screen.getByRole('button', { name: /sign in/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Sign In');
    expect(button).toHaveClass('bg-orange-400');
  });

  it('navigates to /signIn when clicked', () => {
    render(<SignInButton />);

    const button = screen.getByRole('button', { name: /sign in/i });
    button.click();

    const link = screen.getByRole('link', { name: /sign in/i });
    expect(link).toHaveAttribute('href', '/signIn');
  });
});
