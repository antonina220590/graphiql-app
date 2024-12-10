import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';

import SignOutButton from './SignOutButton';
import { useAuthStatus } from '../../hooks/useAuthStatus';

const mockI18n = i18n.createInstance();
mockI18n.init({
  lng: 'en',
  resources: {
    en: {
      header: {
        signOut: 'Sign Out',
      },
    },
    ru: {
      header: {
        signOut: 'Выход',
      },
    },
  },
});

vi.mock('firebase/auth', () => ({
  signOut: vi.fn(),
  getAuth: vi.fn(() => ({})),
}));

vi.mock('../../hooks/useAuthStatus', () => ({
  useAuthStatus: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('SignOutButton', () => {
  const mockPush = vi.fn();
  const mockUseAuthStatus = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuthStatus.mockClear();
    useRouter().push = mockPush;
    vi.mocked(useAuthStatus).mockImplementation(mockUseAuthStatus);
  });

  it.skip('renders the button when the user is authenticated', () => {
    mockUseAuthStatus.mockReturnValue({
      isAuthenticated: true,
      checkingStatus: false,
      errorMessage: '',
      setHasJustLoggedIn: vi.fn(),
      hasJustLoggedIn: false,
    });

    render(
      <I18nextProvider i18n={mockI18n}>
        <SignOutButton />
      </I18nextProvider>
    );

    const button = screen.getByRole('button', { name: /sign out/i });
    expect(button).toBeInTheDocument();
  });

  it('does not render the button when the user is not authenticated', () => {
    mockUseAuthStatus.mockReturnValue({
      isAuthenticated: false,
      checkingStatus: false,
      errorMessage: '',
      setHasJustLoggedIn: vi.fn(),
      hasJustLoggedIn: false,
    });

    render(
      <I18nextProvider i18n={mockI18n}>
        <SignOutButton />
      </I18nextProvider>
    );

    const button = screen.queryByRole('button', { name: /sign out/i });
    expect(button).not.toBeInTheDocument();
  });

  it.skip('displays an error message when signOut fails', async () => {
    mockUseAuthStatus.mockReturnValue({
      isAuthenticated: true,
      checkingStatus: false,
      errorMessage: '',
      setHasJustLoggedIn: vi.fn(),
      hasJustLoggedIn: false,
    });

    vi.mocked(signOut).mockRejectedValueOnce(new Error('Sign out error'));

    render(
      <I18nextProvider i18n={mockI18n}>
        <SignOutButton />
      </I18nextProvider>
    );

    const button = screen.getByRole('button', { name: /sign out/i });
    await fireEvent.click(button);

    expect(
      await screen.findByText(/error signing out. please try again./i)
    ).toBeInTheDocument();
  });
});
