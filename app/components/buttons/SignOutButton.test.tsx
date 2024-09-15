import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';

import { useAuthStatus } from '../../hooks/useAuthStatus';
import SignOutButton from './SignOutButton';

interface AuthStatus {
  isAuthenticated: boolean;
  checkingStatus: boolean;
  errorMessage: string;
  setHasJustLoggedIn: (value: boolean) => void;
  hasJustLoggedIn: boolean;
}

vi.mock('firebase/auth', () => ({
  signOut: vi.fn(),
  getAuth: vi.fn(() => ({})),
}));

vi.mock('../../hooks/useAuthStatus', () => ({
  useAuthStatus: vi.fn<() => AuthStatus>(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('SignOutButton', () => {
  const mockPush = vi.fn();
  const router = useRouter();

  beforeEach(() => {
    vi.clearAllMocks();
    router.push = mockPush;
  });

  it('renders the button when the user is authenticated', () => {
    (useAuthStatus as unknown as typeof vi.fn).mockReturnValue({
      isAuthenticated: true,
      checkingStatus: false,
      errorMessage: '',
      setHasJustLoggedIn: vi.fn(),
      hasJustLoggedIn: false,
    });

    render(<SignOutButton />);

    const button = screen.getByRole('button', { name: /sign out/i });
    expect(button).toBeInTheDocument();
  });

  it('does not render the button when the user is not authenticated', () => {
    (useAuthStatus as unknown as typeof vi.fn).mockReturnValue({
      isAuthenticated: false,
      checkingStatus: false,
      errorMessage: '',
      setHasJustLoggedIn: vi.fn(),
      hasJustLoggedIn: false,
    });

    render(<SignOutButton />);

    const button = screen.queryByRole('button', { name: /sign out/i });
    expect(button).not.toBeInTheDocument();
  });

  it('displays an error message when signOut fails', async () => {
    (useAuthStatus as unknown as typeof vi.fn).mockReturnValue({
      isAuthenticated: true,
      checkingStatus: false,
      errorMessage: '',
      setHasJustLoggedIn: vi.fn(),
      hasJustLoggedIn: false,
    });

    (signOut as unknown as typeof vi.fn).mockRejectedValueOnce(
      new Error('Sign out error')
    );

    render(<SignOutButton />);

    const button = screen.getByRole('button', { name: /sign out/i });
    await fireEvent.click(button);

    expect(
      await screen.findByText(/error signing out. please try again./i)
    ).toBeInTheDocument();
  });
});
