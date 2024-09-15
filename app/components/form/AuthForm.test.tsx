import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';

import AuthForm from './AuthForm';

describe('AuthForm Component', () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders the form and title', () => {
    render(<AuthForm title="Login" onSubmit={mockOnSubmit} />);

    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    const buttonElement = screen.getByRole('button', { name: 'Login' });
    expect(buttonElement).toBeInTheDocument();
  });

  test('validates password input', async () => {
    render(<AuthForm title="Login" onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'weak' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    expect(
      screen.getByText(
        /Password must be at least 8 characters long, include at least one letter, one digit, and one special character/i
      )
    ).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('validates confirm password field on sign up', async () => {
    render(
      <AuthForm title="Sign Up" onSubmit={mockOnSubmit} isSignUp={true} />
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'Valid1!' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { value: 'Different1!' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
