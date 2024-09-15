'use client';

import React from 'react';

import Logo from './logo/logo';
import LanguageToggler from './langToggler/language';
import SignOutButton from '../buttons/SignOutButton';
import SignInButton from '../buttons/SignInButton';
import SignUpButton from '../buttons/SignUpButton';
import { useAuthStatus } from '../../hooks/useAuthStatus';

export default function Header() {
  const { isAuthenticated } = useAuthStatus();
  return (
    <header className="bg-dark w-full box-border mx-auto sticky top-0 z-10">
      <div
        className="h-[10vh] flex items-center box-border w-full p-0 px-5 justify-between"
        data-testid="logo"
      >
        <Logo />
        <LanguageToggler />
        <div className="flex gap-4">
          {isAuthenticated ? (
            <SignOutButton />
          ) : (
            <>
              <SignInButton />
              <SignUpButton />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
