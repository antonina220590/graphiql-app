import { render, screen } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';

import Header from './Header';
import { useAuthStatus } from '../../hooks/useAuthStatus';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock('../../hooks/useAuthStatus');

vi.mock('../logo/logo', () => {
  const Logo = () => <div data-testid="logo">Logo</div>;
  Logo.displayName = 'Logo';
  return Logo;
});
vi.mock('../langToggler/language', () => {
  const LanguageToggler = () => (
    <div data-testid="language-toggler">Language Toggler</div>
  );
  LanguageToggler.displayName = 'LanguageToggler';
  return LanguageToggler;
});
vi.mock('../../buttons/SignOutButton', () => {
  const SignOutButton = () => (
    <button data-testid="sign-out-button">Sign Out</button>
  );
  SignOutButton.displayName = 'SignOutButton';
  return SignOutButton;
});
vi.mock('../../buttons/SignInButton', () => {
  const SignInButton = () => (
    <button data-testid="sign-in-button">Sign In</button>
  );
  SignInButton.displayName = 'SignInButton';
  return SignInButton;
});
vi.mock('../../buttons/SignUpButton', () => {
  const SignUpButton = () => (
    <button data-testid="sign-up-button">Sign Up</button>
  );
  SignUpButton.displayName = 'SignUpButton';
  return SignUpButton;
});

describe('Header Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders logo, language toggler, and buttons when user is not authenticated', () => {
    (useAuthStatus as vi.Mock).mockReturnValue({ isAuthenticated: false });

    render(<Header />);

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('language-toggler')).toBeInTheDocument();
    expect(screen.getByTestId('sign-in-button')).toBeInTheDocument();
    expect(screen.getByTestId('sign-up-button')).toBeInTheDocument();
    expect(screen.queryByTestId('sign-out-button')).not.toBeInTheDocument();
  });

  it('renders logo, language toggler, and sign out button when user is authenticated', () => {
    (useAuthStatus as vi.Mock).mockReturnValue({ isAuthenticated: true });

    render(<Header />);

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('language-toggler')).toBeInTheDocument();
    expect(screen.getByTestId('sign-out-button')).toBeInTheDocument();
    expect(screen.queryByTestId('sign-in-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('sign-up-button')).not.toBeInTheDocument();
  });
});
