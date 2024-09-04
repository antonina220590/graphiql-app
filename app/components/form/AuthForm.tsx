'use client';

import React, { FormEvent, useState } from 'react';

import { AuthInput } from './AuthInput';
import { AuthButton } from './AuthButton';

interface AuthFormProps {
  title: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSignUp?: boolean;
}

export default function AuthForm({
  title,
  onSubmit,
  isSignUp = false,
}: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password: string) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);

  const handleValidation = () => {
    let valid = true;
    const validationErrors: {
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!validateEmail(email)) {
      validationErrors.email = 'Invalid email format';
      valid = false;
    }

    if (!validatePassword(password)) {
      validationErrors.password =
        'Password must be at least 8 characters long, include at least one letter, one digit, and one special character';
      valid = false;
    }

    if (isSignUp && password !== confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(validationErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (handleValidation()) {
      onSubmit(e);
    }
  };

  return (
    <main className="flex-grow p-4 bg-light flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">{title}</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <AuthInput
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          <AuthInput
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          {isSignUp && (
            <>
              <AuthInput
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </>
          )}

          <AuthButton title={title} />
        </form>
      </div>
    </main>
  );
}
