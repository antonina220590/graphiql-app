'use client';

import React from 'react';

import Logo from './logo/logo';
import LanguageToggler from './langToggler/language';
import SignOutButton from './signOut/SignOutButton';

export default function Header() {
  return (
    <header className="bg-dark w-full box-border mx-auto sticky top-0 z-10">
      <div className="h-[10vh] flex items-center box-border w-full p-0 px-5 justify-between">
        <Logo />
        <LanguageToggler />
        <SignOutButton />
      </div>
    </header>
  );
}
